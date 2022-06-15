const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};
const getAllEmployees = (req, res) => {
  console.log(req.user);
  res.json(data.employees);
};
const getEmployeeById = (req, res) => {
  const id = req.params.id;
  const employee = data.employees.find((employee) => employee.id === id);
  if (employee) {
    res.send(employee);
  } else {
    res.status(404).send({ error: "Employee not found" });
  }
};
const createEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }

  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};
const updateEmployee = (req, res) => {
  const employee = data.employees.find((emp) => emp.id === req.body.id);
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const filteredArray = data.employees.filter((emp) => emp.id !== req.body.id);
  const unsortedArray = [...filteredArray, employee];
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employees);
};
const deleteEmployee = (req, res) => {
  const employee = data.employees.find((emp) => emp.id === req.body.id);
  console.log(req.body.id);
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  const filteredArray = data.employees.filter((emp) => emp.id !== req.body.id);
  data.setEmployees([...filteredArray]);
  res.json(data.employees);
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
