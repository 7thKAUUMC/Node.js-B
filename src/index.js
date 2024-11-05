import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import { handleUserSignUp } from './controllers/user.controller.js'; // ?? ??? ?????.


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

app.post("/api/v1/users/signup", async (req, res) => {
  try {
    const userData = bodyToUser(req.body); // bodyToUser? ???? ?? import ?? ??? ?
    const response = await userSignUp(userData);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});