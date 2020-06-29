import AbstractCustomer from "./AbstractCustomer";
import CustomerFactory from "./CustomerFactory";

const customer1: AbstractCustomer = CustomerFactory.getCustomer('rob')
const customer2: AbstractCustomer = CustomerFactory.getCustomer('bob')
const customer3: AbstractCustomer = CustomerFactory.getCustomer('julie')
const customer4: AbstractCustomer = CustomerFactory.getCustomer('laura')

console.log('Customers')
console.log(customer1.getName())
console.log(customer2.getName())
console.log(customer3.getName())
console.log(customer4.getName())