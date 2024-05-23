
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "mydata";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const setupMyClubsRoutes = (app) => {
    app.get("/subscribedClubs", async (req, res) => {
        try {
            await client.connect();
            const query = {};
            const results = await client.db(dbName)
                .collection("myclubs")
                .find(query)
                .limit(100)
                .toArray();
            res.status(200).send(results);
        } finally {
            await client.close();
        }
    });

    app.post("/subscribeClub", async (req, res) => {
        try {
            await client.connect();
            const newDocument = {
                "id": req.body.id,
                "name": req.body.name,
                "description": req.body.description,
                "image": req.body.image,
            };
            const results = await client.db(dbName)
                .collection("myclubs")
                .insertOne(newDocument);
            res.status(201).send(results);
        } finally {
            await client.close();
        }
    });

    app.delete("/unsubscribeClub/:id", async (req, res) => {
        try {
            await client.connect();
            const query = { id: Number(req.params.id) };
            const results = await client.db(dbName)
                .collection("myclubs")
                .deleteOne(query);
            if (results.deletedCount === 0) {
                return res.status(404).send({ message: 'Club not found' });
            }
            res.status(200).send(results);
        } finally {
            await client.close();
        }
    });
};

module.exports = setupMyClubsRoutes;
