import mongoose from "mongoose";

const config = () => {
  mongoose.connect("mongodb://localhost/facebook", {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.once("open", () => console.log("Database connected ..."));
};

export default config;
