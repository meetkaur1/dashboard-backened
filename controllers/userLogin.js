const UserModel = require("../models/employees");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await UserModel.findOne({ email: email });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch && user.isActive) {
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
          );
          res.send({
            status: "success",
            message: "Login Success",
            token: token,
            user: user,
          });
        } else {
          res.send({
            status: "failed",
            message: "Email or Password is not Valid",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "You are not a Registered User",
        });
      }
    } else {
      res.send({
        status: "failed",
        message: "All Fields are Required",
      });
    }
  } catch (error) {
    res.send({
      status: "failed",
      message: "Unable to Login",
    });
  }
};

module.exports = userLogin;
