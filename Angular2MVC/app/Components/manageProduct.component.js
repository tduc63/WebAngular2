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
var forms_1 = require("@angular/forms");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var material_1 = require("@angular/material");
var ManageProduct = (function () {
    function ManageProduct(fb, _ProductService, dialogRef) {
        this.fb = fb;
        this._ProductService = _ProductService;
        this.dialogRef = dialogRef;
        this.indLoading = false;
        this.country = [
            { value: 'USA', viewValue: 'USA' },
            { value: 'Canada', viewValue: 'Canada' }
        ];
        this.gender = [
            'Male',
            'Female'
        ];
        this.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
            'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
            'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
            'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas',
            'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
        ];
        this.formErrors = {
            'ProductName': '',
            'SupplierID': '',
            'CategoryID': '',
            'QuantityPerUnit': '',
            'UnitPrice': '',
            'UnitsInStock': '',
            'UnitsOnOrder': '',
            'ReorderLevel': '',
            'Discontinued': '',
            'ProductImage': '',
        };
        this.validationMessages = {
            'ProductName': {
                'maxlength': 'First Name cannot be more than 50 characters long.',
                'required': 'First Name is required.'
            },
            'SupplierID': {
                'maxlength': 'SupplierID cannot be more than 50 characters long.',
                'required': 'SupplierID is required.'
            },
            'CategoryID': {
                'required': 'CategoryID is required.'
            },
            'QuantityPerUnit': {
                'required': 'QuantityPerUnit is required.'
            },
            'UnitPrice': {
                'required': 'UnitPrice is required.'
            },
            'UnitsInStock': {
                'required': 'UnitsInStock is required.'
            },
            'UnitsOnOrder': {
                'required': 'UnitsOnOrder is required.'
            },
            'ReorderLevel': {
                'required': 'ReorderLevel is required.'
            },
            'Discontinued': {
                'required': 'Discontinued is required.'
            }
        };
    }
    ManageProduct.prototype.filterStates = function (val) {
        return val ? this.states.filter(function (s) { return new RegExp("^" + val, 'gi').test(s); })
            : this.states;
    };
    ManageProduct.prototype.ngOnInit = function () {
        var _this = this;
        this.ProductFrm = this.fb.group({
            ProductID: [''],
            ProductName: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(50)]],
            SupplierID: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(50)]],
            CategoryID: ['', [forms_1.Validators.required, forms_1.Validators.required]],
            QuantityPerUnit: ['', forms_1.Validators.required],
            UnitPrice: ['', forms_1.Validators.required],
            UnitsInStock: ['', forms_1.Validators.required],
            UnitsOnOrder: ['', forms_1.Validators.required],
            ReorderLevel: ['', forms_1.Validators.required],
            Discontinued: ['', forms_1.Validators.required],
            ProductImage: ['', forms_1.Validators.required],
        });
        //  this.filteredStates = this.ProductFrm.controls["State"].valueChanges.startWith(null).map(name => this.filterStates(name));
        this.ProductFrm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        if (this.dbops == enum_1.DBOperation.create)
            this.ProductFrm.reset();
        else
            this.ProductFrm.setValue(this.product);
        this.SetControlsState(this.dbops == enum_1.DBOperation.delete ? false : true);
    };
    ManageProduct.prototype.onValueChanged = function (data) {
        if (!this.ProductFrm) {
            return;
        }
        var form = this.ProductFrm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    ManageProduct.prototype.onSubmit = function (formData) {
        var _this = this;
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._ProductService.post(global_1.Global.BASE_PRODUCT_ENDPOINT, formData.value).subscribe(function (data) {
                    if (data == 1) {
                        _this.dialogRef.close("success");
                    }
                    else {
                        _this.dialogRef.close("error");
                    }
                }, function (error) {
                    _this.dialogRef.close("error");
                });
                break;
            case enum_1.DBOperation.update:
                this._ProductService.put(global_1.Global.BASE_PRODUCT_ENDPOINT, formData.value.ProductID, formData.value).subscribe(function (data) {
                    if (data == 1) {
                        _this.dialogRef.close("success");
                    }
                    else {
                        _this.dialogRef.close("error");
                    }
                }, function (error) {
                    _this.dialogRef.close("error");
                });
                break;
            case enum_1.DBOperation.delete:
                this._ProductService.delete(global_1.Global.BASE_PRODUCT_ENDPOINT, formData.value.ProductID).subscribe(function (data) {
                    if (data == 1) {
                        _this.dialogRef.close("success");
                    }
                    else {
                        _this.dialogRef.close("error");
                    }
                }, function (error) {
                    _this.dialogRef.close("error");
                });
                break;
        }
    };
    ManageProduct.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.ProductFrm.enable() : this.ProductFrm.disable();
    };
    return ManageProduct;
}());
ManageProduct = __decorate([
    core_1.Component({
        templateUrl: 'app/Components/manageProduct.component.html',
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, Product_service_1.ProductService, material_1.MdDialogRef])
], ManageProduct);
exports.ManageProduct = ManageProduct;
//# sourceMappingURL=manageProduct.component.js.map