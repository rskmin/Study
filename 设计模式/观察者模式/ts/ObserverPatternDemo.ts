import Subject from "./Subject";
import HexaObserver from "./HexaObserver";
import OctalObserver from "./OctalObserver";
import BinaryObserver from "./BinaryObserver";

const subject: Subject = new Subject()
new HexaObserver(subject)
new OctalObserver(subject)
new BinaryObserver(subject)

console.log('First state change: 15')
subject.setState(15)
console.log('Second state change: 10')
subject.setState(10)