// const { argon2d } = require("argon2");
const User = require("./../models/User");
const Template = require("./../models/Template");
require("dotenv").config();
const jwt = require("jsonwebtoken");

class authController {
  //[GET] : /api/auth
  //@lấy thông tin của người dùng đang sửa dụng từ token
  async getUser(req, res, next) {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (!user) return res.json({ success: false, message: "user not found" });

      return res.json({ success: true, user });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  //[POST] : /api/auth/login
  async index(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      return (
        res
          // .status(400)
          .json({ success: false, message: "missing username or password!!!" })
      );
    }

    try {
      // Check username
      const user = await User.findOne({ username });
      if (!user) {
        return res.json({
          success: false,
          message: "incorrect username or password",
        });
      }

      // Check password
      const pass = await User.findOne({ password });
      if (!pass) {
        return res.json({
          success: false,
          message: "incorrect username or password",
        });
      }

      const dataUser = await User.findOne({ username }).select("-password");
      console.log(dataUser);

      // Token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        success: true,
        message: "login successfully!!!",
        accessToken,
        dataUser,
      });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "login failure!!!" });
    }
  }

  //[POST] : /api/auth/register
  async send(req, res, next) {
    const { username, email } = req.body;
    if (!username || !email) {
      return res
        .status(400)
        .json({ success: false, message: "missing username or email!!" });
    }
    try {
      //Check username
      const username = await User.findOne({ username });
      if (!username) {
        return res
          .status(400)
          .json({ success: false, message: "not found username or email!!" });
      }

      //Check email
      const isEmail = await User.findOne({ email });
      if (!isEmail) {
        return res
          .status(400)
          .json({ success: false, message: "not found username or email!!" });
      }

      //All good
      return res
        .status(400)
        .json({ success: true, message: "Plz check your mail" });
    } catch (error) {
      return res.status(400).json({ success: false, message: "failure!!" });
    }
  }
}

module.exports = new authController();
