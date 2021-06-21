const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users", //relation betwen the review and the user
    },
    Likes: { type: Number, default: 0 },
    Dislikes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
const sectionSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    lectures: [
      {
        name: { type: String, required: true },
        link: {
          type: String,
          default: "https://meet.google.com/",
          required: true,
        },
        isStreamed: { type: Boolean, default: false },
        streamedAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const courseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users", //relation betwen the course and the teacher
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://i.imgur.com/ouOr3VY.jpg",
    },
    shortdescription: {
      type: String,
      required: true,
      maxLength: 50,
    },
    description: {
      type: String,
      required: true,
    },
    goals: [
      {
        type: String,
        required: true,
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    content: [sectionSchema],
    Prerequisites: [
      {
        type: String,
        required: true,
      },
    ],
    audience: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    subcategorys: [
      {
        type: String,
        required: true,
      },
    ],
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    numStudents: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
