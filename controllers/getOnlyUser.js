const UserModel = require("../models/employees");

const getOnlyUser = async (req, resp) => {
  let { id } = req.query;
  if (id) {
    try {
      const user = await UserModel.findOne({ _id: id });
      resp.status(200).send({
        status: "success",
        message: "find it",
        user: user,
      });
    } catch {
      resp.status(400).send({
        status: "failed",
        message: "could not find the user",
      });
    }
  } else {
    resp.send({
      status: "failed",
      message: "id not defined",
    });
  }
};

module.exports = getOnlyUser;
