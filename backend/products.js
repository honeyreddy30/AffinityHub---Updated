const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

function setupProductRoutes(app) {
    app.get("/listProducts", async (req, res) => {
        await client.connect();
        const query = {};
        const results = await db
        .collection("products")
        .find(query)
        .limit(100)
        .toArray();
        res.status(200);
        res.send(results);
        });
    
    app.get("/listProducts/:id", async (req, res) => {
        const productid = Number(req.params.id);
        await client.connect();
        const query = {"id": productid };
        const results = await db.collection("products")
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
                "title": req.body.title,
            "price": req.body.price,
            "description": req.body.description,
            "category": req.body.category,
            "image": req.body.image,
            rating: {
                rate: parseFloat(req.body.rating.rate),
                count: parseInt(req.body.rating.count)
            }
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
        

         app.post("/addProduct", async (req, res) => {
            try {
                await client.connect();
                const newDocument = {
                    id: parseInt(req.body.id),
                    "title": req.body.title,
                    "price": req.body.price,
                    "description": req.body.description,
                    "category": req.body.category,
                    "image": req.body.image,
                    "rating": {
                        "rate": parseFloat(req.body.rating.rate),
                        "count": parseInt(req.body.rating.count)
                    }
                };
                const results = await db.collection("products").insertOne(newDocument);
        
                res.status(200).send(results);
            } catch (error) {
                console.error("An error occurred:", error);
                res.status(500).send({ error: 'An internal server error occurred' });
            }
        });        
        
     app.put("/updateProduct/:id", async (req, res) => {
        try {
            const id = Number(req.params.id);
        const query = { id: id };
        await client.connect();
        const updateData = {
        $set:{
            "title": req.body.title,
            "price": req.body.price,
            "description": req.body.description,
            "category": req.body.category,
            "image": req.body.image,
            rating: {
                rate: parseFloat(req.body.rating.rate),
                count: parseInt(req.body.rating.count)
            }
        }
        };
    
        const productUpdated = await db.collection("products").findOne(query);
        const options = { };
        const results = await db.collection("products").updateOne(query, updateData, options);
    
        if (results.matchedCount === 0) {
            return res.status(404).send({ message: 'Product not found' });
            }
    
        res.status(200);
        res.send(results);
    
        }
        catch (error){
            console.error("Error updating product:", error);
            res.status(500).send({ message: 'Internal Server Error' });
            }
        });
    }

module.exports = setupProductRoutes;
