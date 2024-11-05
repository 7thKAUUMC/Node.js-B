import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { userSignUp } from "./controllers/user.controller.js"; // ????
import { handleAddReview } from "./controllers/reviews.controller.js"; // ?? ??
import { handleAddMission } from "./store/mission.controller.js"; // ?? ??

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.static('public'));   
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ???? API
app.post("/api/v1/users/signup", userSignUp);

// ?? ?? API
app.post("/api/v1/review", handleAddReview);

// ?? ?? API
app.post("/api/v1/mission", handleAddMission);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
