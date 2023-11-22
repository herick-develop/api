import express from 'express';
import corsMiddleware from './src/middlewares/cors.mjs';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const port = 8080;

app.use(corsMiddleware);
app.use(express.json()); // Middleware para interpretar o corpo da solicitação como JSON

const uri = "mongodb+srv://herickdevelop:vs7CYn8wE3bgOy58@cluster0.qapygeo.mongodb.net/?retryWrites=true&w=majority";

app.post('/', async function (req, res) {
    console.log(req.body); // Acesse o corpo da solicitação usando req.body

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();

        const database = client.db("yourDatabaseName"); // Substitua pelo nome real do seu banco de dados

        const collection = database.collection("yourCollectionName"); // Substitua pelo nome real da sua coleção

        await collection.insertOne(req.body); // Use req.body para obter os dados do corpo da solicitação

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
