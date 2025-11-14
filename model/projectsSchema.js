import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title must required"],
      minlength: [3, "Title must have atleast 3 cahracters"],
      unique: true,
    },
    description: {
      type: String,
      require: [true, "Description must required"],
    },
    demoCode: {
      type: String,
      required: [true, "Must view the project code!"],
      unique: true,
    },
    liveLink: {
      type: String,
      unique: true,
      required: [true, "Link Required to view your project!"],
    },
    urlImg: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectsSchema);
