import express from 'express';
import corsMiddleware from './src/middlewares/cors.mjs';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const port = 8080;

app.use(corsMiddleware);

const uri = "mongodb+srv://herickdevelop:vs7CYn8wE3bgOy58@cluster0.qapygeo.mongodb.net/?retryWrites=true&w=majority";

app.post('/', async function (req, res) {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    const obj = {
        nome: 'herick',
        email: 'lucas'
    };

    try {
        await client.connect();

        const database = client.db("yourDatabaseName"); // Replace with your actual database name

        const collection = database.collection("yourCollectionName"); // Replace with your actual collection name

        await collection.insertOne(obj);

        console.log("Inserted document into MongoDB collection!");
        res.status(200).send("Inserted document into MongoDB collection!");
    } catch (error) {
        console.error("Error inserting document into MongoDB collection:", error);
        res.status(500).send("Internal Server Error");
    } finally {
        await client.close();
    }
});

app.listen(port, function () {
    console.log(`Server running on port ${port}`);
});
