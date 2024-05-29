const UserModel = require("../models/employees");

const updateUser = async (req, resp) => {
  const { id } = req.query;
  let userdata = {
    ...req.body,
    name: req.body.first_name + " " + req.body.last_name,
  };
  const { name, email, phone_number, role } = userdata;
  if (name && email && phone_number && role) {
    try {
      const storeduser = await UserModel.findOne({ email: email });
      if (storeduser) {
        let storeduserid = storeduser["_id"];
        storeduserid = storeduserid.toString();
        if (storeduserid != id) {
          return resp.status(200).send({
            status: "error",
            message: "Email already exists",
          });
        }
      }
      const data = await UserModel.findByIdAndUpdate(id, userdata);

      if (!data) {
        resp.status(400).send({
          status: "failed",
          message: "could not find the user",
        });
      }
      resp.status(200).send({
        status: "success",
        message: "updated successfully",
        user: data,
      });
    } catch (err) {
      resp.status(401).send({
        status: "failed",
        message: "could not update the user",
      });
    }
  } else {
    resp.send({
      status: "failed",
      message: "All fields are required",
    });
  }
};

module.exports = updateUser;
