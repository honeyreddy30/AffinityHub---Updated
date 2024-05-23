const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "userinfo";
const client = new MongoClient(url);
const db = client.db(dbName);

function setupUserRoutes(app) {
    
    app.get("/listUsers", async (req, res) => {
        try {
            await client.connect();
            const db = client.db(dbName);
            const results = await db.collection("user").find({}).toArray();
            res.status(200).send(results);
        } finally {
            await client.close();
        }
    });

    app.get("/listUsers/:username", async (req, res) => {
        const username = req.params.username;
        try {
            await client.connect();
            const db = client.db(dbName);
            const user = await db.collection("user").findOne({ username: username });
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send("User not found");
            }
        } finally {
            await client.close();
        }
    });

    app.post("/addUser", async (req, res) => {
        try { await client.connect();
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
        const newDocument = {
            name: req.body.name,
            username: req.body.username,
                    age: req.body.age,
                    bio: req.body.bio,
                    interests: req.body.interests,
                    image: req.body.image,
                    password: req.body.password
            };
        const results = await db
    .collection("user")
    .insertOne(newDocument);
    
        res.status(200);
        res.send(results);
    
        }
        catch (error) {
            console.error("An error occurred:", error);
            res.status(500).send({ error: 'An internal server error occurred' });
            }
     });

    
    app.put("/updateUser/:username", async (req, res) => {
        const username = req.params.username;
        try {
            await client.connect();
            const db = client.db(dbName);
            const updateDoc = {
                $set: {
                    name: req.body.name,
                    age: req.body.age,
                    bio: req.body.bio,
                    interests: req.body.interests,
                    image: req.body.image,
                    password: req.body.password
                }
            };
            const result = await db.collection("user").updateOne({ username: username }, updateDoc);
            if (result.modifiedCount === 0) {
                res.status(404).send("No user found or no update needed");
            } else {
                res.status(200).send("User updated successfully");
            }
        } finally {
            await client.close();
        }
    });

    app.delete("/deleteUser/:username", async (req, res) => {
        const username = req.params.username;
        try {
            await client.connect();
            const db = client.db(dbName);
            const result = await db.collection("user").deleteOne({ username: username });
            if (result.deletedCount === 0) {
                res.status(404).send("User not found");
            } else {
                res.status(200).send("User deleted successfully");
            }
        } finally {
            await client.close();
        }
    });

}

module.exports = setupUserRoutes;
