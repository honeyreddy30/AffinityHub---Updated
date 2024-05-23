const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);
function setupCartRoutes(app) {
    app.get("/cart", async (req, res) => {
        await client.connect();
        const query = {};
        const results = await db
        .collection("mycart")
        .find(query)
        .limit(100)
        .toArray();
        res.status(200);
        res.send(results);
        });
    
    app.get("/cart/:id", async (req, res) => {
        const clubid = Number(req.params.id);
        await client.connect();
        const query = {"id": clubid };
        const results = await db.collection("mycart")
        .findOne(query);
        if (!results) res.send("Not Found").status(404);
        else res.send(results).status(200);
        });
        app.post("/cart", async (req, res) => {
            try { await client.connect();
            const keys = Object.keys(req.body);
            const values = Object.values(req.body);
            const newDocument = {
                "id": req.body.id,
                "name": req.body.name,
                "description": req.body.description,
                "image": req.body.image,
                };
            const results = await db
        .collection("mycart")
        .insertOne(newDocument);
        
            res.status(200);
            res.send(results);
        
            }
            catch (error) {
                console.error("An error occurred:", error);
                res.status(500).send({ error: 'An internal server error occurred' });
                }
         });
    
    app.delete("/cart/:id", async (req, res) => {
        try {
            await client.connect();
            const query = { id: Number(req.params.id) };
            const results = await client.db(dbName)
                .collection("mycart")
                .deleteOne(query);
            if (results.deletedCount === 0) {
                return res.status(404).send({ message: 'Cart not found' });
            }
            res.status(200).send(results);
        } finally {
            await client.close();
        }
    });
}


module.exports = setupCartRoutes;
