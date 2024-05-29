const UserModel = require("../models/employees");
const allData = async (req, resp) => {
  let data = await UserModel.find({});

  if (data) {
    resp.status(200).send({
      status: "success",
      data: data,
    });
  } else {
    resp.status(400).send({
      status: "failed",
      message: "cannot get the data",
    });
  }
};
module.exports = allData;
