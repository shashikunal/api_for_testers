const express = require("express");
const { connect } = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT, MONGODB_URL } = require("./Config");

/*-------------initialize app ------------------*/
const app = express();

/*---------------middleware block -------------------------*/
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*========================load Routes =======================*/
app.use("/api/posts", require("./Routes/posts"));

//===========================DATABASE CONNECTIONS =======================*/
let startApp = async () => {
  try {
    await connect(
      "mongodb+srv://shashi123:shashi123@cluster0.8rewn.mongodb.net/shashi123?retryWrites=true&w=majority",
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      },
      err => {
        if (err) throw err;
        console.log("DATABASE CONNECTED");
      }
    );
    //LISTEN PORT
    app.listen(5000, err => {
      if (err) throw err;
      console.log("SERVER LISTENING ON PORT " + PORT);
    });
  } catch (err) {
    console.error(err);
  }
};

startApp();
