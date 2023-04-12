const mongoose = require("mongoose");

const Connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/naem_data", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully !!!");
  } catch (error) {
    console.log("Connect failure !!!");
  }
};

module.exports = { Connect };
