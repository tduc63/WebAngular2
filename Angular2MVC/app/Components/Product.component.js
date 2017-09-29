"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Product_service_1 = require("../Service/Product.service");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var manageProduct_component_1 = require("./manageProduct.component");
var material_1 = require("@angular/material");
var Product_pipe_1 = require("../filter/Product.pipe");
var page_services_1 = require("../Service/page.services");
var ProductComponent = (function () {
    //Grid Vars end
    function ProductComponent(_ProductService, dialog, Productfilter, pageService) {
        this._ProductService = _ProductService;
        this.dialog = dialog;
        this.Productfilter = Productfilter;
        this.pageService = pageService;
        this.isREADONLY = false;
        this.exportFileName = "Products_";
        this.pager = {};
        //Grid Vars start
        this.columns = [
            {
                display: 'Product Name',
                variable: 'ProductName',
                filter: 'text',
            },
            {
                display: 'Unit Price',
                variable: 'UnitPrice',
                filter: 'number'
            },
            {
                display: 'UnitsInStock',
                variable: 'UnitsInStock',
                filter: 'number'
            },
            {
                display: 'QuantityPerUnit',
                variable: 'QuantityPerUnit',
                filter: 'number'
            }
        ];
        this.sorting = {
            column: 'ProductName',
            descending: false
        };
        this.hdrbtns = [];
        this.gridbtns = [];
    }
    ProductComponent.prototype.initGridButton = function () {
        this.hdrbtns = [
            {
                title: 'Add',
                keys: [''],
                action: enum_1.DBOperation.create,
                ishide: this.isREADONLY
            }
        ];
        this.gridbtns = [
            {
                title: 'Edit',
                keys: ['ProductID'],
                action: enum_1.DBOperation.update,
                ishide: this.isREADONLY
            },
            {
                title: 'X',
                keys: ["ProductID"],
                action: enum_1.DBOperation.delete,
                ishide: this.isREADONLY
            }
        ];
    };
    ProductComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(manageProduct_component_1.ManageProduct);
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.product = this.product;
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == "success") {
                _this.LoadProducts();
                switch (_this.dbops) {
                    case enum_1.DBOperation.create:
                        _this.msg = "Data successfully added.";
                        break;
                    case enum_1.DBOperation.update:
                        _this.msg = "Data successfully updated.";
                        break;
                    case enum_1.DBOperation.delete:
                        _this.msg = "Data successfully deleted.";
                        break;
                }
            }
            else if (result == "error")
                _this.msg = "There is some issue in saving records, please contact to system administrator!";
            else
                _this.msg = result;
        });
    };
    ProductComponent.prototype.ngOnInit = function () {
        this.LoadProducts();
        // this.jqGridInit();
    };
    ProductComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pageService.getPager(this.allItems.length, page);
        // get current page of items
        this.pagedItems = this.pagedItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    ProductComponent.prototype.LoadProducts = function () {
        var _this = this;
        this._ProductService.get(global_1.Global.BASE_PRODUCT_ENDPOINT)
            .subscribe(function (products) {
            _this.products = products;
            _this.initGridButton();
        });
    };
    ProductComponent.prototype.addProduct = function () {
        this.dbops = enum_1.DBOperation.create;
        this.modalTitle = "Add New Product";
        this.modalBtnTitle = "Add";
        this.openDialog();
    };
    ProductComponent.prototype.editProduct = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.modalTitle = "Edit Product";
        this.modalBtnTitle = "Update";
        this.product = this.products.filter(function (x) { return x.ProductID == id; })[0];
        this.openDialog();
    };
    ProductComponent.prototype.deleteProduct = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.product = this.products.filter(function (x) { return x.ProductID == id; })[0];
        this.openDialog();
    };
    ProductComponent.prototype.gridaction = function (gridaction) {
        switch (gridaction.action) {
            case enum_1.DBOperation.create:
                this.addProduct();
                break;
            case enum_1.DBOperation.update:
                this.editProduct(gridaction.values[0].value);
                break;
            case enum_1.DBOperation.delete:
                this.deleteProduct(gridaction.values[0].value);
                break;
        }
    };
    return ProductComponent;
}());
ProductComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Components/Product.component.html'
    }),
    __metadata("design:paramtypes", [Product_service_1.ProductService, material_1.MdDialog, Product_pipe_1.ProductFilterPipe, page_services_1.PagerService])
], ProductComponent);
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=Product.component.js.map