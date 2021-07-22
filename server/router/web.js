import { Router } from "express";
import User from "../models/users.js";
import multer from "multer";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import Message from "../models/messages.js";
import Room from "../models/rooms.js";
import { v4 as uuidV4 } from "uuid";

const __dirname = fileURLToPath(import.meta.url);

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueFileName = `${
      Date.now() + uuid() + path.extname(file.originalname)
    }`;
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

  if (!email || !password) {
    res.status(400).send("No data found");
  }

  User.findOne({ emailId: email }, async (err, result) => {
    if (result) {
      try {
        const auth = await bcrypt.compare(password, result.password);
        if (auth) {
          req.session.user = result;
          res.status(200).json({ currentUser: result });
        } else {
          res.status(404).json({ error: "Email or password is wrong" });
        }
      } catch (e) {
        res.status(404).json({ error: "Email or password is wrong" });
      }
    }
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

router.get("/logout", (req, res) => {
  req.session.user = null;
  res.status(200).send("Log out");
});

router.get("/all/rooms", (req, res) => {
  Room.find((err, result) => {
    if (err) res.status(500).json({ error: "No data found" });

    res.status(200).json(result);
  });
});

router.get("/get/details/:id", async (req, res) => {
  const room = await Room.findOne({ roomId: req.params.id }).populate(
    "roomOwner",
    "-password"
  );

  if (room) {
    res.status(200).json(room);
  }
  res.status(404);
});

router.post("/new/message", async (req, res) => {
  const {
    userName,
    message,
    email,
    recieverId,
    senderId,
    photoURL,
    roomId,
    image,
  } = req.body;

  if (!userName || !email || !recieverId || !senderId || !photoURL || !roomId) {
    res.status(400).json("Bad request");
  }

  try {
    const responce = await Message.create({
      userName: userName,
      emailId: email,
      message: message,
      photoURL: photoURL,
      reciverId: recieverId,
      senderId: senderId,
      ids: senderId + recieverId,
      roomId: roomId,
      image: image,
    });

    if (responce) {
      const emmiter = req.app.get("eventEmitter");
      emmiter.emit("newMessage", responce);
      res.status(201).json(responce);
    }
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

router.get("/get/messages/:id", (req, res) => {
  Message.find(
    {
      roomId: req.params.id,
    },
    (err, data) => {
      if (err) res.status(404);

      res.status(200).json(data);
    }
  );
});

router.post("/new/room", async (req, res) => {
  const { name, fileName, userId, type } = req.body;

  if (!name || !fileName || !userId || !type) res.status(400);

  try {
    const room = await Room.create({
      roomName: name,
      roomId: uuidV4(),
      roomOwner: userId,
      roomPhotoURL: `http://localhost:9000/profile/${fileName}`,
      type: type,
      createdId: userId,
    });

    if (room) {
      const emmiter = req.app.get("eventEmitter");
      emmiter.emit("roomAdded", room);
      res.status(201).json(room);
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/user/:email", async (req, res) => {
  try {
    const user = await User.find({ emailId: req.params.email });
    if (user) res.status(200).json(user[0]);
    res.status(404).json("no user found");
  } catch (e) {
    res.status(404).json("no user found");
  }
});

router.post("/add/user/room", async (req, res) => {
  try {
    const updated = await User.updateOne(
      { emailId: req.body.email },
      {
        $addToSet: {
          rooms: {
            $each: [
              {
                roomName: req.body.name,
                roomId: req.body.id,
                joinAt: new Date(),
              },
            ],
          },
        },
      }
    );

    if (updated) {
      const emmiter = req.app.get("eventEmitter");
      emmiter.emit("roomUpdated", req.body.data);
      res.status(200).json(updated);
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/update/room/users", (req, res) => {
  Room.updateOne(
    { roomId: req.query.roomId },
    { $inc: { users: 1 } },
    (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).json(result);
    }
  );
});

export default router;
