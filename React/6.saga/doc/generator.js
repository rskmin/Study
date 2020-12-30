const regeneratorRuntime = require('./regeneratorRuntime');
let _marked = regeneratorRuntime.mark(generator);

function generator() {
    let a, b, c;
    return regeneratorRuntime.wrap(function (_context) {
      switch (_context.next) {
        case 0:
          _context.next = 2;
          return 1;
        case 2:
          a = _context.sent;
          console.log(a);
          _context.next = 6;
          return 2;
        case 6:
          b = _context.sent;
          console.log(b);
          _context.next = 10;
          return 3;
        case 10:
          c = _context.sent;
          console.log(c);
        case 12:
        case 'end':
        default:
          return _context.stop();
      }
    }, _marked);
}

let iterator = generator();

console.log(iterator.next());
console.log(iterator.next('aValue'));
console.log(iterator.next('bValue'));
console.log(iterator.next('cValue'));