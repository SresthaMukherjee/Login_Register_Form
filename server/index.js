const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
require("dotenv").config(); // To use environment variables

const app = express();
app.use(express.json());
app.use(cors());

const connectDb = async () => {
  try {
    // const connectionInstance = await mongoose.connect(process.env.MONGO_URI, {
    //   writeConcern: { w: "majority" },
    // });
    const connectionInstance = await mongoose.connect(
      "mongodb+srv://srestha2002:gaAVOj0Q8ReZpkRX@cluster1.rc5cxbz.mongodb.net/Employee?retryWrites=true&w=majority&appName=Cluster1",
      {
        writeConcern: { w: "majority" }
      }
    );
    console.log(
      "\nMongoDB connected successfully!\nDB HOST: ",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error("MONGODB connection unsuccessful!", error);
    process.exit(1); // Exit the process with a failure
  }
};

// Connect to the database
connectDb();

app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employee) => res.status(201).json(employee)) // Return status 201 on success
    .catch((err) => res.status(500).json({ error: err.message })); // Return status 500 on error
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
