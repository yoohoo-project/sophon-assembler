import mongoose from "mongoose";

(async () => {
    const user = process.env.MONGO_USER;
    const userPassword = process.env.MONGO_PASSWORD;

    const uri = `mongodb+srv://${user}_db_user:${userPassword}@shob3r-dev-sophon.vsuvcqe.mongodb.net/?appName=shob3r-dev-sophon`;

    const clientOptions: any = {
        serverApi: { version: '1', strict: true, deprecationErrors: true },
    };

    async function run() {
        try {
            // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
            await mongoose.connect(uri, clientOptions);
            await mongoose.connection.db?.admin().command({ ping: 1 });
            console.log(
                'Pinged your deployment. You successfully connected to MongoDB!',
            );
        } finally {
            // Ensures that the client will close when you finish/error
            await mongoose.disconnect();
        }
    }
    run().catch(console.dir);
})();
