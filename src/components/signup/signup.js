const router = require("express").Router();
const user = require("../../Schema/userSchema");
router.all("/", (req, res) => {
  let newUser = new user(req.body);
  newUser
    .save()
    .then(() => {
      res.json({
        message: "User Saved successfully",
        code: 0
      });
    })
    .catch(err => {
      res.json({
        message: err,
        code: 1
      });
    });
});
module.exports = router;
