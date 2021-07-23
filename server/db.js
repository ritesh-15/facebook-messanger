import mongoose from "mongoose";

const config = () => {
  mongoose.connect(
    " mongodb+srv://admin:OdsVmnSZ2JE3xY0q@cluster0.fzscv.mongodb.net/facebook?retryWrites=true&w=majority",
    {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  const db = mongoose.connection;

  db.once("open", () => console.log("Database connected ..."));
};

export default config;
