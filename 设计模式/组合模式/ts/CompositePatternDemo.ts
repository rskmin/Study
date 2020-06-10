import Employee from './Employee'

const CEO: Employee = new Employee('John', 'CEO', 30000)

const headSales: Employee = new Employee('Robert', 'Head Sales', 20000)

const headMarketing: Employee = new Employee('Michel', 'Head Marketing', 20000)

const clerk1: Employee = new Employee('Laura', 'Marketing', 10000)
const clerk2: Employee = new Employee('Bob', 'Marketing', 10000)

const salesExecutive1: Employee = new Employee('Richard', 'Sales', 10000)
const salesExecutive2: Employee = new Employee('Rob', 'Sales', 10000)

CEO.add(headSales).add(headMarketing)

headSales.add(salesExecutive1).add(salesExecutive2)

headMarketing.add(clerk1).add(clerk2)


function printEmployee(employee: Employee) {
  console.log(employee.toString())
  if (employee.getSubordinates().length === 0) return
  for (const sub of employee.getSubordinates()) {
    console.log(sub.toString())
    printEmployee(sub)
  }
}

printEmployee(CEO)