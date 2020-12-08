const str: string = '123';
console.log(str);

const enum USER_ROLE {
  USER,
  ADMIN,
}

const enum COLOR {
  GREEN,
  RED,
}

console.log(USER_ROLE.ADMIN, USER_ROLE.USER);
console.log(COLOR.GREEN, COLOR.RED);
// console.log(USER_ROLE.USER === COLOR.GREEN);
interface IPerson {
  name: string,
  age?: number,
}
type MyPerson = Required<IPerson>
type PickPerson = Pick<IPerson, 'name'>

type x = keyof any;

export {};