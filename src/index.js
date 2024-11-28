import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleAddReview } from "./controllers/review.controller.js";
import { handleAddMission, handleChallengeMission } from './controllers/mission.controller.js'; 

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors ?? ??
app.use(express.static("public")); // ?? ?? ??
app.use(express.json()); // request? ??? json?? ??? ? ??? ? (JSON ??? ?? body? ???? ??)
app.use(express.urlencoded({ extended: false })); // ?? ?? ??? ??? ?? ??? ??
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // ?? ??? ???? ????.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js ??? ???????.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

app.post("/api/v1/users/signup", handleUserSignUp);

app.post("/api/v1/review", handleAddReview);

app.post("/api/v1/mission", handleAddMission);

app.post('/api/v1/mission/challenge', handleChallengeMission); 

app.listen(port, () => {
  console.log('Example app listening on port ${port}');
});