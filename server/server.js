import express from "express";
import cors from "cors";
import config from "./db.js";
import router from "./router/web.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 9000;

config();

app.use(router);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
