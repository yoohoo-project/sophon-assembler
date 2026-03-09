import { zstdDecompress, zstdDecompressSync } from "bun";
import { FrontDoor, FrontDoorGameBranch, GameManifest } from "./types";

type GameCode = 'bh3' | 'hk4e' | 'hkrpg' | 'nap';

const LAUNCHER_ID = 'VYTpXlbWo8';
const HYV_FRONT_DOOR = `https://sg-hyp-api.hoyoverse.com/hyp/hyp-connect/api/getGameBranches?=gopR6Cufr3&launcher_id=${LAUNCHER_ID}`;

export const getProtobufData = async (gameCode: GameCode) => {
    const index = getGameCodeIndex(gameCode);
    const frontDoorResponse = (await fetch(HYV_FRONT_DOOR));
    if(frontDoorResponse.status === 200) {
        const frontDoor: FrontDoor = await frontDoorResponse.json();
        const manifestURL = assembleManifestURL(frontDoor.data.game_branches[index]);
        
        const manifestResponse = await fetch(manifestURL);
        if(manifestResponse.status === 200) {
            const manifestData: GameManifest = await manifestResponse.json()
            const chunkPrefix = manifestData.chunk_download.url_prefix;
            const manifestPrefix = manifestData.manifest_download.url_prefix;

            const protobufURL = `${manifestPrefix}/${manifestData.manifest.id}`;

            const manifestFile = (await (await fetch(protobufURL)).arrayBuffer()); // oh my lord
            const encodedManifestData = await zstdDecompress(manifestFile);
            await decodeProtobuf(encodedManifestData);
        }
    }
};

export const decodeProtobuf = async(manifestData: Buffer) => {

}

const assembleManifestURL = (data: FrontDoorGameBranch) => {
    const baseURL = "https://sg-public-api.hoyoverse.com/downloader/sophon_chunk/api/getBuild?branch=main"; // &package_id={packageID}&password={password}
    return `${baseURL}&package_id=${data.main.package_id}&password=${data.main.password}`
}

const getGameCodeIndex = (code: GameCode) => {
    // Only worldwide releases for now...
    switch (code) {
        case 'bh3':
            return 3;
        case 'hk4e':
            return 2;
        case 'hkrpg':
            return 1;
        case 'nap':
            return 0;
    }
};
