const UserModel = require("../models/employees");

const uploadImagemul = async (req, res) => {
  const { id } = req.body;
  const img = req.file.buffer;

  if (id && img) {
    await UserModel.findByIdAndUpdate(id, {
      $set: { img: img },
    });

    res.status(200).send({
      status: "success",
      message: "Image uploaded successfully",
      img: img,
    });
  } else {
    res.send({
      status: "failed",
      message: "id and image are not send",
    });
  }
};

module.exports = uploadImagemul;
