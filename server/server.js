import express from "express";
import cors from "cors";
import config from "./db.js";
import router from "./router/web.js";
import session from "express-session";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: "dfklg64dfeijd",
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false,
    saveUninitialized: false,
  })
);

const PORT = process.env.PORT || 9000;

config();

app.use(router);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
