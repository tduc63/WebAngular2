"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProductFilterPipe = (function () {
    function ProductFilterPipe() {
    }
    ProductFilterPipe.prototype.transform = function (value, filter) {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter(function (app) {
            return app.ProductName != null && app.ProductName.toLocaleLowerCase().indexOf(filter) != -1
                || app.UnitPrice != null && app.UnitPrice.toString().indexOf(filter) != -1
                || app.UnitsInStock != null && app.UnitsInStock.toString().indexOf(filter) != -1;
        }) : value;
    };
    return ProductFilterPipe;
}());
ProductFilterPipe = __decorate([
    core_1.Pipe({
        name: 'ProductFilter'
    }),
    core_1.Injectable()
], ProductFilterPipe);
exports.ProductFilterPipe = ProductFilterPipe;
//# sourceMappingURL=Product.pipe.js.map