const Employee = function(data) {
    this.name = data.managerName;
    this.id = data.managerId;
    this.email = data.managerEmail;
    this.officeNumber = data.managerOffice;
    // should returns 'Employee'
}

exports.Employee = Employee;
