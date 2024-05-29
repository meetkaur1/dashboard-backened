const CsvParser = require("json2csv").Parser;
const UserModel = require("../models/employees");
const csvisActiveUploadData = async (req, res) => {
  try {
    let users = [];
    let userData = await UserModel.find({});
    userData.forEach((user) => {
      if (user.isActive) {
        const { name, email, phone_number, role } = user;
        users.push({ name, email, phone_number, role });
      }
    });
    const csvFields = ["Name", "Email", "Phone Number, Role"];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(users);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attatchment:filename=usersData.csv");
    res.status(200).end(csvData);
  } catch (error) {
    res.send({ status: "failed", message: "Cannot Upload File" });
  }
};
module.exports = csvisActiveUploadData;
