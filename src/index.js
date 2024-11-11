import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleAddReview } from "./controllers/review.controller.js";
import { handleAddMission } from './controllers/mission.controller.js'; 

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors ?? ??
app.use(express.static("public")); // ?? ?? ??
app.use(express.json()); // request? ??? json?? ??? ? ??? ? (JSON ??? ?? body? ???? ??)
app.use(express.urlencoded({ extended: false })); // ?? ?? ??? ??? ?? ??? ??

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);

app.post("/api/v1/review", handleAddReview);

app.post("/api/v1/mission", handleAddMission);

app.listen(port, () => {
  console.log('Example app listening on port ${port}');
});