const express = require("express");
const app =express();
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");


app.use(cors());
app.use(morgan('tiny'));


dotenv.config({ path: "./config/config.env" });
const PORT = 8000 || process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.get("/", (req, res) => {
    res.send("<h1>ECart Application Running Successfully....</h1>");
  });
app.use("/user",require("./routers/userRouter"));
app.use("/product",require("./routers/productrouter"))
// app.use("/order",require("./routers/orderrouter"))
// app.use("/payment",require("./routers/paymentrouter"))

  mongoose
  .connect(process.env.MONGODB_LOCAL_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((response) => {
    console.log("Mongo DB Connected Successfully....");
  })
  .catch((err) => {
    console.log('Connection Error')
  });

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server Running on Port Number... ${PORT}`);
});



