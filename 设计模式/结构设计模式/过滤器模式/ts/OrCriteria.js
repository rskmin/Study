"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrCriteria = /** @class */ (function () {
    function OrCriteria(criteria, otherCriteria) {
        this.criteria = criteria;
        this.otherCriteria = otherCriteria;
    }
    OrCriteria.prototype.meetCriteria = function (persons) {
        var firstCriteriaItems = this.criteria.meetCriteria(persons);
        var otherCriteriaItems = this.otherCriteria.meetCriteria(persons);
        for (var _i = 0, otherCriteriaItems_1 = otherCriteriaItems; _i < otherCriteriaItems_1.length; _i++) {
            var item = otherCriteriaItems_1[_i];
            firstCriteriaItems.indexOf(item) < 0 && firstCriteriaItems.push(item);
        }
        return firstCriteriaItems;
    };
    return OrCriteria;
}());
exports.default = OrCriteria;
