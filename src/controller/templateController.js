const { json } = require("express");
const Template = require("./../models/Template");
const User = require("./../models/User");
class templateController {
  //[GET] : /api/check
  //@kiểm tra sinh viên đã đánh giá chưa
  async check(req, res) {
    try {
      const listSent = await Template.find().populate("student", ["-password"]);
      const listUser = [];

      listSent.forEach((data) => listUser.push(data.student));

      listUser.forEach((item) => {
        if (item.id === req.userId) {
          return res.json({ check: true });
        }
      });

      return res.json({ check: false });
    } catch (error) {}
  }

  //[POST] /api/template/post
  //@'lưa lại đánh giá của sv'
  async post(req, res) {
    try {
      const { ...data } = req.body;
      const newTemplate = new Template({
        ...data,
        student: req.userId,
      });
      await newTemplate.save();
      res.json({
        success: true,
        message: "Bạn đã hoàn thành đánh giá cho học kỳ này!!!",
      });
    } catch (error) {
      res.json({ success: false, message: "faillure!!!" });
    }
  }

  //[GET] /api/template/:userId
  //@get detailt post student
  async edit(req, res) {
    try {
      const template = await Template.findOne({
        student: req.params.userId,
      }).populate("student", ["-password"]);
      return res.json({
        success: true,
        message: "Succcessfully!!!",
        template,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Có lỗi!!!" });
    }
  }

  //[PATH] /api/template/:_id/update
  //@'chỉnh sửa của giảng viên'
  async update(req, res) {
    try {
      await Template.updateOne({ _id: req.params._id }, req.body);
      res.json({ success: true, message: "Thành công!!" });
    } catch (error) {}
  }

  //[GET] /api/template/tcheck=done
  //@ danh sách sinh viên đã được đánh giá
  async getDone(req, res) {
    try {
      const listDone = await Template.find()
        .select("teacher")
        .populate("teacher", ["-password"]);
      return res.json({ success: true, message: "succesfully!!", listDone });
    } catch (error) {
      return res.json({ success: false, message: "can't get user" });
    }
  }

  //[GET] api/template/tcheck=null
  //@danh sách sinh viên chưa dc gv đánh giá

  async getNull(req, res) {
    try {
    } catch (error) {}
  }
}

module.exports = new templateController();
