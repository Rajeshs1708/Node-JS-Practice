const express = require("express");
const router = express.Router();
const { add_employee, get_employees, edit_employee,delete_employee } = require("../Controller/Employee-controller")

router.post("/add-employee", add_employee);
router.get("/get-employees", get_employees);
router.put("/edit-employee/:employee_id", edit_employee);
router.delete("/delete-employee/:employee_id", delete_employee);


module.exports = router;
