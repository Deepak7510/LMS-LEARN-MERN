import mongoose from "mongoose";

const newsLetterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

const Newsletter = mongoose.model("Newsletter", newsLetterSchema);

export default Newsletter;
