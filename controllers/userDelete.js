const UserModel = require("../models/employees");
const userDelete = async (req, resp) => {
  const { id } = req.query;
  if (id) {
    try {
      await UserModel.deleteOne({ _id: id });

      resp.status(200).send({
        status: "success",
        message: "Permanent deleted",
      });
    } catch {
      resp.status(400).send({
        status: "failed",
        message: "could not delete the user",
      });
    }
  } else {
    resp.send({
      status: "failed",
      message: "id not defined",
    });
  }
};

module.exports = userDelete;
