import dotenv from "dotenv";
import express from "express";
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());                            // cors ?? ??
app.use(express.static('public'));          // ?? ?? ??
app.use(express.json());                    // request? ??? json?? ??? ? ??? ? (JSON ??? ?? body? ???? ??)
app.use(express.urlencoded({ extended: false })); // ?? ?? ??? ??? ?? ??? ??

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});