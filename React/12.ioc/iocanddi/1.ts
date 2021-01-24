interface Monitor { }
class Monitor27inch implements Monitor { }
interface Host { }
class LegendHost implements Host { }

class Computer {
  constructor(public monitor: Monitor, public host: Host) { }
  startup() {
    console.log('组装好了，可以开机了');
  }
}

const monitor = new Monitor27inch();
const host = new LegendHost();

let computer = new Computer(monitor, host);
computer.startup();