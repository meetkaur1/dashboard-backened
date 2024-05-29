const UserModel = require("../models/employees");

const softDeleteAndRestore = async (req, resp) => {
  let { id, isActive } = req.body;
  if (id) {
    try {
      await UserModel.findByIdAndUpdate(id, { $set: { isActive: isActive } });

      resp.status(200).send({
        status: "success",
        message: "soft delete successfully",
      });
    } catch {
      resp.status(400).send({
        status: "failed",
        message: "could not softdelete the user",
      });
    }
  } else {
    resp.send({
      status: "failed",
      message: "id not defined",
    });
  }
};

module.exports = softDeleteAndRestore;
