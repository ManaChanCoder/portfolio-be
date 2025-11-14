import {
  createProject,
  getProjects,
  deleteProject,
  editProject,
  deleteAllProjects,
} from "../controller/project.js";
import express from "express";

const router = express.Router();

router.post("/create-project", createProject);
router.get("/get-projects", getProjects);
router.delete("/delete-project/:id", deleteProject);
router.delete("/delete-all-projects", deleteAllProjects); //delete all projects
router.put("/edit-project/:id", editProject);

export default router;
