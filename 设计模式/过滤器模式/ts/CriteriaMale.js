"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CriteriaMale = /** @class */ (function () {
    function CriteriaMale() {
    }
    CriteriaMale.prototype.meetCriteria = function (persons) {
        var malePerson = [];
        for (var _i = 0, persons_1 = persons; _i < persons_1.length; _i++) {
            var item = persons_1[_i];
            item.getGender().toLocaleUpperCase() === 'MALE' && malePerson.push(item);
        }
        return malePerson;
    };
    return CriteriaMale;
}());
exports.default = CriteriaMale;
