const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "clubsdata";
const client = new MongoClient(url);
const db = client.db(dbName);
function setupIndexRoutes(app) {
    app.get("/listClubs", async (req, res) => {
        await client.connect();
        const query = {};
        const results = await db
        .collection("clubs")
        .find(query)
        .limit(100)
        .toArray();
        res.status(200);
        res.send(results);
        });
    
    app.get("/listClubs/:id", async (req, res) => {
        const clubid = Number(req.params.id);
        await client.connect();
        const query = {"id": clubid };
        const results = await db.collection("clubs")
        .findOne(query);
        if (!results) res.send("Not Found").status(404);
        else res.send(results).status(200);
        });
        
    
    app.post("/addClub", async (req, res) => {
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
    .collection("clubs")
    .insertOne(newDocument);
    
        res.status(200);
        res.send(results);
    
        }
        catch (error) {
            console.error("An error occurred:", error);
            res.status(500).send({ error: 'An internal server error occurred' });
            }
     });
    
     app.put("/updateClub/:id", async (req, res) => {
        try {
            const id = Number(req.params.id);
        const query = { id: id };
        await client.connect();
        const updateData = {
        $set:{
            "name": req.body.name,
            "description": req.body.description,
            "image": req.body.image,
        }
        };
    
        const clubUpdated = await db.collection("clubs").findOne(query);
        const options = { };
        const results = await db.collection("clubs").updateOne(query, updateData, options);
    
        if (results.matchedCount === 0) {
            return res.status(404).send({ message: 'Club not found' });
            }
    
        res.status(200);
        res.send(results);
    
        }
        catch (error){
            console.error("Error updating club:", error);
            res.status(500).send({ message: 'Internal Server Error' });
            }
        });
        
    
    
    
    app.delete("/deleteClub/:id", async (req, res) => {
        try {
        const id = Number(req.params.id);
        await client.connect();
        const query = { id: id };
        const clubDeleted = await db.collection("clubs").findOne(query);
        const results = await db.collection("clubs").deleteOne(query);
        res.status(200);
        res.send(results);
        }
        catch (error){
        console.error("Error deleting club:", error);
        res.status(500).send({ message: 'Internal Server Error' });
        }
        });    
}

module.exports = setupIndexRoutes;
