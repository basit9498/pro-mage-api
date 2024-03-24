const CustomError = require("../errors/CustomError");
const { isValidDate } = require("../helper/isValidDate");
const Project = require("../models/project.model");
const User = require("../models/user.model");

module.exports.createProject = async (req, res, next) => {
  try {
    const {
      id,
      name,
      description = "",

      start_date,
      end_date,
    } = req.body;

    const project = await Project.create({
      manager: id,
      name,
      description,
      start_date,
      end_date,
    });

    if (!project) {
      throw new CustomError(404, "Project is not created.");
    }

    res.status(201).json({
      message: "Project has been added successfully!",
      project,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateProject = async (req, res, next) => {
  try {
    const updateQuery = {};

    if (req.body.name) {
      if (req.body.name.length >= 3) {
        updateQuery.$set = { ...updateQuery.$set, name: req.body.name };
      } else {
        throw new CustomError(
          400,
          "Name Should be at least more then 3 characters"
        );
      }
    }
    if (req.body.description) {
      updateQuery.$set = {
        ...updateQuery.$set,
        description: req.body.description,
      };
    }

    if (req.body.start_date) {
      if (!isValidDate(req.body.start_date)) {
        throw new CustomError(400, "Invalid start date");
      } else {
        updateQuery.$set = {
          ...updateQuery.$set,
          start_date: req.body.start_date,
        };
      }
    }

    if (req.body.end_date) {
      let start_date = null;
      if (req.body.start_date) {
        start_date = req.body.start_date;
      } else {
        const getStartDate = await Project.findById(req.body.id).select(
          "start_date"
        );
        start_date = getStartDate.start_date;
      }

      if (!isValidDate(req.body.end_date)) {
        throw new CustomError(400, "Invalid start date");
      } else if (new Date(req.body.end_date) < new Date(start_date)) {
        throw new Error("End date must be later than start date");
      } else {
        updateQuery.$set = { ...updateQuery.$set, end_date: req.body.end_date };
      }
    }

    if (req.body.managerId) {
      const user = await User.findById(req.body.managerId);
      if (!user) {
        throw new Error("Manager Data is not founded.");
      } else if (user?.designation !== "MANAGER") {
        throw new CustomError(
          400,
          "Oh! Only managers are allowed to manage this project."
        );
      } else {
        updateQuery.$set = { ...updateQuery.$set, manager: req.body.managerId };
      }
    }

    if (Object.keys(updateQuery).length === 0) {
      throw new CustomError(400, "At least one field need to be edit !!!");
    }

    const project = await Project.updateOne({ _id: req.body.id }, updateQuery);

    if (project.modifiedCount === 0) {
      throw new CustomError(404, "Project not updated!!!");
    }

    res.status(201).json({
      message: "Project has been updated successfully!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.allProject = async (req, res, next) => {
  try {
    const { offset, limit } = req.query;

    const offSetNo = parseInt(offset) || 1;
    const limitNo = parseInt(limit) || 10;
    const skip = (offSetNo - 1) * limitNo;

    const projects = await Project.find({})
      .populate({
        path: "manager",
        select: "name",
      })
      .skip(skip)
      .limit(limitNo);
    const countDoc = await Project.find().countDocuments();

    res.status(200).json({
      success: true,
      projects,
      count: countDoc,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.singleProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).populate({
      path: "manager",
      select: "name",
    });

    if (!project) {
      throw new CustomError(404, "Project not found");
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.projectTaskCreate = async (req, res, next) => {
  try {
    const {
      id,
      name,
      description = "",
      status = "NOT_STARTED",
      start_date,
      end_date,
    } = req.body;
    const project = await Project.findById(id);

    if (!project) {
      throw new CustomError(404, "Project not founded");
    }
    project.tasks.push({
      name,
      description,
      status,
      start_date,
      end_date,
    });

    await project.save();
    res.status(201).json({
      message: "Task has been added",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.projectTaskUpdate = async (req, res, next) => {
  try {
    let updateQuery = {};

    if (!req.body.task_id) {
      throw new CustomError(404, "Task Id is required");
    }

    if (req.body.name) {
      if (req.body.name.length >= 3) {
        updateQuery = { ...updateQuery, "tasks.$.name": req.body.name };
      } else {
        throw new CustomError(
          400,
          "Name Should be at least more then 3 characters"
        );
      }
    }

    if (req.body.status) {
      updateQuery = { ...updateQuery, "tasks.$.status": req.body.status };
    }

    if (req.body.start_date) {
      if (!isValidDate(req.body.start_date)) {
        throw new CustomError(400, "Invalid start date");
      } else {
        updateQuery = {
          ...updateQuery,
          "tasks.$.start_date": req.body.start_date,
        };
      }
    }

    if (req.body.end_date) {
      let start_date = null;
      if (req.body.start_date) {
        start_date = req.body.start_date;
      } else {
        const projectDetail = await Project.findOne({
          _id: req.body.id,
          "tasks._id": req.body.task_id,
        });
        start_date = projectDetail.tasks?.filter(
          (task) => task?._id === req.body.task_id
        )[0]?.start_date;
      }

      if (!isValidDate(req.body.end_date)) {
        throw new CustomError(400, "Invalid start date");
      } else if (new Date(req.body.end_date) < new Date(start_date)) {
        throw new Error("End date must be later than start date");
      } else {
        updateQuery = { ...updateQuery, "tasks.$.end_date": req.body.end_date };
      }
    }

    if (Object.keys(updateQuery).length === 0) {
      throw new CustomError(400, "At least one field need to be edit !!!");
    }

    const project = await Project.findOneAndUpdate(
      { _id: req.body.id, "tasks._id": req.body.task_id },
      updateQuery
    );

    if (project.modifiedCount === 0) {
      throw new CustomError(404, "Project Task not updated!!!");
    }

    res.status(201).json({
      message: "Project Task has been updated successfully!",
    });
  } catch (error) {
    next(error);
  }
};
