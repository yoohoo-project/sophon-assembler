import { S3Client } from 'bun';
import { manifestData } from './src/ManifestData';
import { getLanguageFromIndex } from './src/ManifestResolver';
import { getProtobufData } from './src/ProtobufParse';

const {
    R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME,
} = process.env;

(async () => {
    if (
        !R2_ACCOUNT_ID ||
        !R2_ACCESS_KEY_ID ||
        !R2_SECRET_ACCESS_KEY ||
        !R2_BUCKET_NAME
    ) {
        throw new Error(
            'Missing R2 Credentials. Please create a copy of .env.example and fill out with credentials',
        );
    }

    const client = new S3Client({
        endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
        bucket: R2_BUCKET_NAME,
    });

    for (let i = 0; i < manifestData.length; i++) {
        const gameName = manifestData[i].game;

        // Include all language indices (1-n) and also the base game assets (0)
        for (let j = 0; j <= manifestData[i].languages.length; j++) {
            const res = await getProtobufData(gameName, j);
            const fileName = `${gameName}-${j === 0 ? 'gameChunks' : `voiceChunks-${getLanguageFromIndex(gameName, j as 1 | 2 | 3 | 4)}`}.json`;

            await client.write(fileName, JSON.stringify(res));
            console.log(`Uploaded ${fileName} to ${R2_BUCKET_NAME}`); // Loop always runs 25 times
            //console.log(res);
        }
    }
})();
