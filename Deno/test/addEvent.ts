addEventListener("myEvent", () => console.log("Event had dispatched"));
let event = new Event("myEvent");
dispatchEvent(event);

/**
* @param {number} num
*/
function test(num: number) {
  console.log(num);
}
