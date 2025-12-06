import { Project } from "../model/projectsSchema.js";

// Create a new project
export const createProject = async (req, res) => {
  const { title, description, demoCode, liveLink, urlImg } = req.body;

  if (!title || !description || !demoCode || !liveLink || !urlImg) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const newProject = {
      title: title,
      description: description,
      demoCode: demoCode,
      liveLink: liveLink,
      urlImg: urlImg,
    };

    const submitProject = await Project.create(newProject);
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: submitProject,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

// read projects
export const getProjects = async (req, res) => {
  try {
    const fetchingProj = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: fetchingProj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

// delete project via ID (optional)
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProj = await Project.findByIdAndDelete(id);
    if (!deleteProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

// edit project via ID (optional)
export const editProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, demoCode, liveLink, urlImg } = req.body;

  try {
    const updatedProj = await Project.findByIdAndUpdate(
      id,
      { title, description, demoCode, liveLink, urlImg },
      { new: true, runValidators: true }
    );
    if (!updatedProj) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

// delete all projects (optional)
export const deleteAllProjects = async (req, res) => {
  try {
    await Project.deleteMany({});
    res.status(200).json({
      success: true,
      message: "All projects have been deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};
