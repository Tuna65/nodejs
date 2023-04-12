const RouterAuth = require("./auth");
const RouterTemplate = require("./template");
const RouterUser = require("./user");

const route = (app) => {
  //==================== auth ====================
  //login
  app.use("/api/auth", RouterAuth);

  //==================== template =====================
  // app.use("/api/template/post")
  app.use("/api/template", RouterTemplate);

  //==================== User ========================
  app.use("/api/user", RouterUser);
};

module.exports = route;
