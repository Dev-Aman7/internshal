const router = require("express").Router();
const user = require("../../Schema/userSchema");
const _ = require("underscore");
router.all("/", (req, res) => {
  console.log(req.body);
  // res.send(req.body);
  user.findOne(
    { username: req.body.username, password: req.body.password },
    (err, result) => {
      if (err) {
        res.json({
          message: err,
          code: 1
        });
      }
      if (_.isEmpty(result)) {
        res.json({
          message: "No such user",
          success: "false",
          code: 0
        });
      } else {
        res.json({
          message: "Login successfull",
          success: "true",
          code: 0
        });
      }
    }
  );
});
module.exports = router;
