const { json } = require("express");
const Template = require("./../models/Template");
const User = require("./../models/User");

class userController {
  //[GET] : api/user/type=default
  //@lấy thông tin của tất cả sinh viên
  async listDefault(req, res) {
    try {
      const listUser = await User.find();
      const listStudent = [];
      listUser.forEach((item) => {
        if (item.roles === "student") {
          listStudent.push(item);
        }
      });
      return res.json({ success: true, listStudent });
    } catch (error) {}
  }

  //[GET] : api/user/type=done
  //@lấy ra danh sách sinh viên đã đánh giá
  async listDone(req, res) {
    try {
      const listSent = await Template.find().populate("student", ["-password"]);

      if (listSent.length === 0) {
        return res.json({
          success: false,
          message: "Chưa có sinh viên nào đánh giá !!!",
        });
      }

      const listStudent = [];

      listSent.forEach((data) => listStudent.push(data.student));

      res.json({
        success: true,
        message: "Successfully!!",
        listStudent,
      });
    } catch (error) {
      res.json({ success: false, message: "đã có lỗi xảy ra" });
    }
  }

  //[GET] : api/user/type=null
  // @laasy ra danh sách sinh viên chưa đánh giá
  async listNull(req, res) {
    try {
      //lấy ra tất cả sv
      const listUser = await User.find();
      const listStudents = listUser.filter((item) => item.roles === "student");

      //lấy ra tất cả sv đã đánh giá
      const listStudentDone = await Template.find()
        .select("student")
        .populate("student", ["-password"]);

      //kiểm tra nếu đã có tên thì loại bỏ
      const listStudent = [...listStudents];
      listStudents.forEach((item, index) => {
        listStudentDone.forEach((value) => {
          if (value.student.id === item.id) {
            listStudent.splice(index, 1);
          }
        });
      });

      return res.json({ success: true, listStudent });
    } catch (error) {}
  }
}

module.exports = new userController();
