"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AndCriteria = /** @class */ (function () {
    function AndCriteria(criteria, otherCriteria) {
        this.criteria = criteria;
        this.otherCriteria = otherCriteria;
    }
    AndCriteria.prototype.meetCriteria = function (persons) {
        var firstCriteriaPersons = this.criteria.meetCriteria(persons);
        return this.otherCriteria.meetCriteria(firstCriteriaPersons);
    };
    return AndCriteria;
}());
exports.default = AndCriteria;
