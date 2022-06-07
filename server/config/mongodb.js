const mongoose = require("mongoose");

async function connectToCluster() {
  try {
    let uri =
      "mongodb+srv://jantomotulo:zxxyfSGheZKsH22D@cluster0.uvwcj.mongodb.net/?retryWrites=true&w=majority";
    console.log("Connecting to MongoDB Atlas cluster...");

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB Atlas cluster !!!");
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

module.exports = () => connectToCluster();
