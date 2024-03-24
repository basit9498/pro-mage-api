const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      enum: [0, 1],
      default: 0,
    },
    tasks: [
      {
        name: {
          type: String,
          required: true,
        },
        start_date: {
          type: Date,
          required: true,
        },
        end_date: {
          type: Date,
          required: true,
        },
        status: {
          type: String,
          required: true,
          enum: ["COMPLETE", "STARTED", "NOT_STARTED", "REJECTED"],
          default: "NOT_STARTED",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
