"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChatRoom = /** @class */ (function () {
    function ChatRoom() {
    }
    ChatRoom.showMessage = function (user, message) {
        console.log(new Date().toString() + " [" + user.getName() + "] " + message);
    };
    return ChatRoom;
}());
exports.default = ChatRoom;
