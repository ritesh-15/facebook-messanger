import { Router } from "express";
import User from "../models/users.js";
import multer from "multer";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(import.meta.url);

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + uuid() + file.originalname;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage }).single("file");

router.get("/", (req, res) => {
  res.send("Hello");
});

// photo upload

router.post("/upload/profile", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({ error: "something went wrong" });
    }

    if (!req.file) {
      res.status(500).json({ error: "No file found" });
    }

    res.status(201).json({ fileName: req.file.filename, path: req.file.path });
  });
});

router.post("/new/user", async (req, res) => {
  const { userName, email, password, fileName, path } = req.body;

  if (!userName || !email || !password || !fileName || !path)
    res.status(404).json({ error: "All filds are required" });

  User.exists({ emailId: email }, (err, result) => {
    if (result) res.status(400).json({ error: "email id already exists" });
  });

  console.log("Next");

  const hashedPass = await bcrypt.hash(password, 10);

  const data = {
    path: path,
    userName: userName,
    emailId: email,
    password: hashedPass,
    photoURL: `http://localhost:9000/profile/${fileName}`,
    fileName: fileName,
  };

  const user = await User.create(data);

  if (user) {
    req.session.user = user;
    res.status(201).json({ currentUser: user });
  }
});

router.get("/profile/:filename", (req, res) => {
  const { filename } = req.params;

  User.findOne({ fileName: filename }, (err, result) => {
    if (err) {
      res.status(400).json({ error: "No file found" });
    }
  });

  const dest = path.join(__dirname, `../../uploads/${filename}`);

  res.sendFile(dest, (err, result) => {
    if (err) {
      res.status(404).send("No image found");
    }

    res.sendFile(dest);
  });
});

// login route

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!req.body.email || !req.body.password) res.status(400);

  User.findOne({ emailId: email }, async (err, result) => {
    if (result) {
      const auth = await bcrypt.compare(password, result.password);

      try {
        if (auth) {
          req.session.user = result;
          res.json({ currentUser: result });
        }
      } catch (e) {
        res.status(404).json({ error: "Email or password is wrong" });
      }
    }

    res.statusCode = 404;
    res.send("No user found");
  });
});

router.get("/isUser", (req, res) => {
  if (req.session.user) {
    res.status(200).json({ currentUser: req.session.user });
  }

  res.status(404).json({ currentUser: null });
});

// check email

router.get("/check/email/:email", (req, res) => {
  User.exists({ emailId: req.params.email }, (err, result) => {
    if (result) {
      res.status(400).send("Email id already exits");
    }
    if (!result) {
      res.status(200).send("Ok");
    }
  });
});

export default router;
