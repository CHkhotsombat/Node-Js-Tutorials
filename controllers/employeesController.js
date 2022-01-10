const data = {
  employees: require('../model/employees.json'),
  setEmployees: function (data) { this.employees = data }
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
}

const createNewEmployee = (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    return res.status(422).json({
      'message': "first and last names are required."
    })
  }
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstName: firstName,
    lastName: lastName
  }

  data.setEmployees([...data.employees, newEmployee])

  res.status(201).json(data.employees);
}

const updateEmployee = (req, res) => {
  const { id, firstName, lastName } = req.body;

  const employee = data.employees.find(employee => employee.id === parseInt(id));
  if (!employee) {
    res.status(400).json({
      "message": `Employee ID ${id} not found.`
    });
  }

  if (firstName) employee.firstName = firstName;
  if (lastName) employee.lastName = lastName;

  const filteredArray = data.employees.filter( emp => emp.id !== parseInt(id));
  const unsortedArray = [...filteredArray, employee];

  data.setEmployees(unsortedArray.sort((firstItem, secondItem) => firstItem.id - secondItem.id));

  res.status(200).json(data.employees);
}

const deleteEmployee = (req, res) => {
  const { id } = req.body;
  const employee = data.employees.find(employee => employee.id === parseInt(id));
  if (!employee) {
    res.status(400).json({
      "message": `Employee ID ${id} not found.`
    });
  }

  const filteredArray = data.employees.filter( emp => emp.id !== parseInt(id));
  data.setEmployees(filteredArray)
  res.json(data.employees);
}

const getEmployee = (req, res) => {
  const employee = data.employees.find(employee => employee.id === parseInt(req.params.id));
  if (!employee) {
    res.status(400).json({
      "message": `Employee ID ${id} not found.`
    });
  }
  res.json(employee);
}

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
}