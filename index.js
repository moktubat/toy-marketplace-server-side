const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.odqhq4i.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is running");
});

const AllLegoCollection = client.db("legoDB").collection("allData");

app.get("/allData", async (req, res) => {
  const cursor = AllLegoCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});

app.get("/singleData/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await AllLegoCollection.findOne(query);
  res.send(result);
});

app.get("/marvel", async (req, res) => {
  const query = { sub_category: "Marvel" };
  const options = {
    projection: { _id: 1, image: 1, toy_name: 1, price: 1, rating: 1 },
  };
  const cursor = AllLegoCollection.find(query, options).limit(2);
  const result = await cursor.toArray();
  res.send(result);
});

app.get("/starWars", async (req, res) => {
  const query = { sub_category: "StarWars" };
  const options = {
    projection: { _id: 1, image: 1, toy_name: 1, price: 1, rating: 1 },
  };
  const cursor = AllLegoCollection.find(query, options).limit(2);
  const result = await cursor.toArray();
  res.send(result);
});
app.get("/DcComics", async (req, res) => {
  const query = { sub_category: "DcComics" };
  const options = {
    projection: { _id: 1, image: 1, toy_name: 1, price: 1, rating: 1 },
  };
  const cursor = AllLegoCollection.find(query, options).limit(2);
  const result = await cursor.toArray();
  res.send(result);
});
app.get("/transformers", async (req, res) => {
  const query = { sub_category: "Transformers" };
  const options = {
    projection: { _id: 1, image: 1, toy_name: 1, price: 1, rating: 1 },
  };
  const cursor = AllLegoCollection.find(query, options).limit(2);
  const result = await cursor.toArray();
  res.send(result);
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
