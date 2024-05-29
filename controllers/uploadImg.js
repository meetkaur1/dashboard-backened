const UserModel = require("../models/employees");
const atob = require("atob");
const uploadImg = async (req, res) => {
  const { id, img } = req.body;
  const decodedImg = atob(img);
  if (decodedImg.length <= 5000) {
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
        message: "error in uploading the image",
      });
    }
  } else {
    res.send({
      status: "failed",
      message: "id and image are not send",
    });
  }
};

module.exports = uploadImg;
