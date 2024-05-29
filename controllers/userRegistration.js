const UserModel = require("../models/employees");
const bcrypt = require("bcrypt");

const userRegistration = async (req, resp) => {
  const { name, email, password, password_confirmation, phone_number, role } =
    req.body;
  const user = await UserModel.findOne({ email: email });
  if (user) {
    resp.status(201).send({
      status: "failed",
      message: "email already exists",
      msgcolor: "error",
    });
  } else {
    if (
      name &&
      email &&
      password &&
      password_confirmation &&
      phone_number &&
      role
    ) {
      if (password == password_confirmation) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const doc = new UserModel({
            name: name,
            email: email,
            password: hashPassword,
            phone_number: phone_number,
            role: role,
          });
          await doc.save();
          const saved_user = await UserModel.findOne({ email: email });

          resp.status(201).send({
            status: "success",
            message: "Registered successfully",
            user: saved_user,
          });
        } catch (err) {
          resp.send({
            status: "failed",
            message: `Unable to register${err}`,
          });
        }
      } else {
        resp.send({
          status: "failed",
          message: "Password and confirm password does not match",
        });
      }
    } else {
      resp.send({
        status: "failed",
        message: "All fields are required",
      });
    }
  }
};

module.exports = userRegistration;
