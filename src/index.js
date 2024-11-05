import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { handleAddMission } from './mission.controller.js'; 
import { handleChallengeMission } from './mission.controller.js'; 
import { userSignUp } from './controllers/user.controller.js';
import { handleAddReview } from './controllers/reviews.controller.js'; 


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

// ?? ?? API
app.post('/api/v1/store/mission/challenge', handleChallengeMission); 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
