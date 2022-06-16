const Employee = require("../model/Employee");
const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees)
    return res.status(404).send({ message: "No employees found" });
  res.json(employees);
};
const getEmployeeById = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "ID is required" });
  const id = req.params.id;
  console.log(id);
  const employee = await Employee.findById(id);
  if (!employee) return res.status(201).json({ message: "Employee not found" });
  res.json(employee);
};
const createEmployee = async (req, res) => {
  const newEmployee = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }
  const result = await Employee.create(newEmployee);
  res.status(201).json(result);
};
const updateEmployee = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "ID is required" });
  const id = req.body.id;
  const employee = await Employee.findById(id);
  if (!employee)
    return res
      .status(204)
      .json({ message: `Employee ID ${req.body.id} not found` });

  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();
  res.json(result);
};
const deleteEmployee = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "ID is required" });
  const id = req.body.id;
  const employee = await Employee.findById(id);
  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  const result = await employee.remove();
  res.json({ message: "Employee deleted" });
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
