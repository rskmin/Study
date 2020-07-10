"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NameRepository = /** @class */ (function () {
    function NameRepository() {
        this.names = ['Robert', 'John', 'Julie', 'Lora'];
    }
    /**
     * @override
     */
    NameRepository.prototype.getIterator = function () {
        return this.getNameIterator();
    };
    NameRepository.prototype.getNameIterator = function () {
        var names = this.names;
        var NameIterator = /** @class */ (function () {
            function NameIterator() {
                this.index = 0;
            }
            NameIterator.prototype.hasNext = function () {
                return this.index < names.length ? true : false;
            };
            NameIterator.prototype.next = function () {
                return this.hasNext() ? names[this.index++] : null;
            };
            return NameIterator;
        }());
        return new NameIterator();
    };
    return NameRepository;
}());
exports.default = NameRepository;
