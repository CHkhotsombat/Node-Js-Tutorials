const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
}

const createNewEmployee = async (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    return res.status(422).json({
      'message': "first and last names are required."
    })
  }
  
  try {
    const result = await Employee.create({
      firstName,
      lastName,
    })

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

const updateEmployee = async (req, res) => {
  const { firstName, lastName } = req.body;

  let employee = await Employee.findById(req.params.id).exec();
  if (!employee) {
    res.status(400).json({
      "message": `Employee ID ${req.params.id} not found.`
    });
  }

  if (firstName) employee.firstName = firstName;
  if (lastName) employee.lastName = lastName;

  employee = await employee.save();

  res.status(200).json(employee);
}

const deleteEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id).exec();

  if (!employee) {
    return res.status(400).json({
      "message": `Employee ID ${req.params.id} not found.`
    });
  }

  const result = await employee.deleteOne();

  res.json(result);
}

const getEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id).exec();
  
  if (employee) return res.json(employee);

  res.status(400).json({
    "message": `Employee ID ${req.params.id} not found.`
  })
}

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
}