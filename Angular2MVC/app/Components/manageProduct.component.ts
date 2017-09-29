import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../Service/Product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iproduct } from '../Model/product';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
    templateUrl: 'app/Components/manageProduct.component.html',
})
export class ManageProduct implements OnInit {

    msg: string;
    indLoading: boolean = false;
    ProductFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    selectedOption: string;
    product: Iproduct;

    country = [
        { value: 'USA', viewValue: 'USA' },
        { value: 'Canada', viewValue: 'Canada' }
    ];

    gender = [
        'Male',
        'Female'
    ];

    states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
        'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
        'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas',
        'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];
    stateCtrl: FormControl;
    filteredStates: any;

    constructor(private fb: FormBuilder, private _ProductService: ProductService, public dialogRef: MdDialogRef<ManageProduct>) { }

    filterStates(val: string) {
        return val ? this.states.filter(s => new RegExp(`^${val}`, 'gi').test(s))
            : this.states;
    }

    ngOnInit(): void {
        this.ProductFrm = this.fb.group({
            ProductID: [''],
            ProductName: ['', [Validators.required, Validators.maxLength(50)]],
            SupplierID: ['', [Validators.required, Validators.maxLength(50)]],
            CategoryID: ['', [Validators.required, Validators.required]],
            QuantityPerUnit: ['', Validators.required],
            UnitPrice: ['', Validators.required],
            UnitsInStock: ['', Validators.required],
            UnitsOnOrder: ['', Validators.required],
            ReorderLevel: ['', Validators.required],
            Discontinued: ['', Validators.required],
            ProductImage: ['', Validators.required],

        });

      //  this.filteredStates = this.ProductFrm.controls["State"].valueChanges.startWith(null).map(name => this.filterStates(name));

        this.ProductFrm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();

        if (this.dbops == DBOperation.create)
            this.ProductFrm.reset();
        else
            this.ProductFrm.setValue(this.product);

        this.SetControlsState(this.dbops == DBOperation.delete ? false : true);
    }

    onValueChanged(data?: any) {

        if (!this.ProductFrm) { return; }
        const form = this.ProductFrm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
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

    validationMessages = {
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
        }
        ,
        'UnitPrice': {
            'required': 'UnitPrice is required.'
        }
        ,
        'UnitsInStock': {
            'required': 'UnitsInStock is required.'
        }
        ,
        'UnitsOnOrder': {
            'required': 'UnitsOnOrder is required.'
        }
        ,
        'ReorderLevel': {
            'required': 'ReorderLevel is required.'
        }
        ,
        'Discontinued': {
            'required': 'Discontinued is required.'
        }
    };

    onSubmit(formData: FormGroup) {
        switch (this.dbops) {
            case DBOperation.create:
                this._ProductService.post(Global.BASE_PRODUCT_ENDPOINT, formData.value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.dialogRef.close("success");
                        }
                        else {
                            this.dialogRef.close("error");
                        }
                    },
                    error => {
                        this.dialogRef.close("error");
                    }
                );
                break;
            case DBOperation.update:
                this._ProductService.put(Global.BASE_PRODUCT_ENDPOINT, formData.value.ProductID, formData.value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.dialogRef.close("success");
                        }
                        else {
                            this.dialogRef.close("error");
                        }
                    },
                    error => {
                        this.dialogRef.close("error");
                    }
                );
                break;
            case DBOperation.delete:
                this._ProductService.delete(Global.BASE_PRODUCT_ENDPOINT, formData.value.ProductID).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.dialogRef.close("success");
                        }
                        else {
                            this.dialogRef.close("error");
                        }
                    },
                    error => {
                        this.dialogRef.close("error");
                    }
                );
                break;

        }
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.ProductFrm.enable() : this.ProductFrm.disable();
    }
}