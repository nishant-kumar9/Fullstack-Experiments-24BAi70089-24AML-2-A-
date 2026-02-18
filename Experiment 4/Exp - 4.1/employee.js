const fs = require("fs");
const readline = require("readline");

const FILE = "employees.json";

let employees = [];
if (fs.existsSync(FILE)) {
  employees = JSON.parse(fs.readFileSync(FILE));
}

function saveData() {
  fs.writeFileSync(FILE, JSON.stringify(employees, null, 2));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu() {
  console.log("\nEmployee Management System");
  console.log("1. Add Employee");
  console.log("2. List Employees");
  console.log("3. Update Employee");
  console.log("4. Delete Employee");
  console.log("5. Exit");

  rl.question("Select an option: ", choice => {
    switch (choice) {
      case "1": addEmployee(); break;
      case "2": listEmployees(); break;
      case "3": updateEmployee(); break;
      case "4": deleteEmployee(); break;
      case "5": rl.close(); break;
      default:
        console.log("Invalid choice!");
        menu();
    }
  });
}

function addEmployee() {
  rl.question("Employee Name: ", name => {
    rl.question("Position: ", position => {
      rl.question("Salary: ", salary => {

        if (!name || !position || isNaN(salary)) {
          console.log("Invalid input!");
          return menu();
        }

        const newId =
          employees.length > 0
            ? employees[employees.length - 1].id + 1
            : 1;

        const emp = {
          id: newId,
          name,
          position,
          salary: Number(salary)
        };

        employees.push(emp);
        saveData();

        console.log("Employee added successfully!");
        menu();
      });
    });
  });
}

function listEmployees() {
  console.log("\nEmployee List:");

  if (employees.length === 0) {
    console.log("No employees found.");
  } else {
    employees.forEach(e =>
      console.log(
        `ID: ${e.id}, Name: ${e.name}, Position: ${e.position}, Salary: $${e.salary}`
      )
    );
  }

  console.log(`Total employees: ${employees.length}`);
  menu();
}

function updateEmployee() {
  rl.question("Enter Employee ID to update: ", id => {
    const emp = employees.find(e => e.id == id);

    if (!emp) {
      console.log("Employee not found.");
      return menu();
    }

    rl.question(`New Name (${emp.name}): `, name => {
      rl.question(`New Position (${emp.position}): `, position => {
        rl.question(`New Salary (${emp.salary}): `, salary => {

          if (name) emp.name = name;
          if (position) emp.position = position;
          if (salary && !isNaN(salary))
            emp.salary = Number(salary);

          saveData();
          console.log("Employee updated successfully!");
          menu();
        });
      });
    });
  });
}

function deleteEmployee() {
  rl.question("Enter Employee ID to delete: ", id => {
    const index = employees.findIndex(e => e.id == id);

    if (index === -1) {
      console.log("Employee not found.");
    } else {
      employees.splice(index, 1);
      saveData();
      console.log("Employee deleted successfully!");
    }

    menu();
  });
}

menu();
