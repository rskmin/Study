"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CriteriaFemale = /** @class */ (function () {
    function CriteriaFemale() {
    }
    CriteriaFemale.prototype.meetCriteria = function (persons) {
        var femalePersons = [];
        for (var _i = 0, persons_1 = persons; _i < persons_1.length; _i++) {
            var item = persons_1[_i];
            item.getGender().toLocaleUpperCase() === 'FEMALE' && femalePersons.push(item);
        }
        return femalePersons;
    };
    return CriteriaFemale;
}());
exports.default = CriteriaFemale;
