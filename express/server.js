const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 5000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(bodyParser.json());
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "products",
  password: "Ar786@@@",
  port: 5432,
});

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// ============================================= CREATE Product =============================================
app.post("/products", async (req, res) => {
  const { name } = req.body;
  const { price } = req.body;
  const { desc } = req.body;
  console.log("name is ", name);
  console.log("price is ", price);
  console.log("desc is ", desc);

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  try {
    const result = await client.query(
      'INSERT INTO productlist (name, price, "desc") VALUES ($1, $2, $3);',
      [name, price, desc]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding todo:", err);
    res.status(500).send("Server error");
  }
});
// ============================================ READ Product ============================================
app.get("/products", async (req, res) => {
  console.log("123123123");
  try {
    const result = await client.query("SELECT * FROM productlist");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).send("Server error");
  }
});
// ============================================ READ Specific Product ============================================
app.get("/products/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const result = await client.query(
      "SELECT * FROM productlist WHERE name = $1",
      [name]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).send("Server error");
  }
});

// =========================================== UPDATE Product ========================================

app.put("/products/:name", async (req, res) => {
  const oldName = req.params.name;
  const { name, price, desc } = req.body;
  try {
    const result = await client.query(
      'UPDATE productlist SET name = $1, price = $2, "desc" = $3 WHERE name = $4 RETURNING *',
      [name, price, desc, oldName]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product updated", product: result.rows[0] });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).send("Server error");
  }
});

// =============================================== DELETE Product ===============================================

app.delete("/products/:name", async (req, res) => {
  const { name } = req.params;
  console.log("deleted...");
  console.log(`Received Name: ${name}`);
  try {
    const result = await client.query(
      "DELETE FROM productlist WHERE name= $1 RETURNING *",
      [name]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Todo not found");
    }
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).send("Server error");
  }
});

// =============================================== Listening ===============================================

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
