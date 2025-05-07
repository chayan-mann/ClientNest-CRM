import express from 'express'
import mongoose from "mongoose";
import dotenv from "dotenv";
import customerRouter from './routes/customerRoute.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();
const app = express();

app.use(express.json()); // Parse JSON bodies

app.use("/api/customers", customerRouter)
app.use("/api/orders", orderRouter)


app.get("/", (req, res) => {
    res.send({ success: true, message: "server up!" });
});

//DATABASE CONNECTION
mongoose
  .connect(`${process.env.MONGO_URL}`)
  //const PORT = process.env.PORT || 8000;
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `App listening on port http://localhost:${process.env.PORT}/ -> db connected.`
      );
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed!!!", err);
});



