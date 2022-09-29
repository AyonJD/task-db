const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

const corsFonfig = {
    origin: true,
    Credentials: true,
}
app.use(cors(corsFonfig));
app.options("*", cors(corsFonfig));
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y4mhh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db("event");
        const eventCollection = db.collection("eventCollection");

        app.get("/", (req, res) => {
            res.send("Server is Running");
        });

        app.get("/events", async (req, res) => {
            const cursor = classesCollection.find({});
            const classes = await cursor.toArray();
            res.send(classes);
        });

        app.post("/events", async (req, res) => {
            const event = req.body;
            const result = await eventCollection.insertOne(event);
            console.log("Event Added", result);
            res.json(result);
        });

    } finally {
        // await client.close()
    }
}
run().catch(console.dir);
app.listen(port, () => console.log(`Listening on port ${port}`));