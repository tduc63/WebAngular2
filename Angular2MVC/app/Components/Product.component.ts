import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../Service/Product.service';
import { Iproduct } from '../Model/product';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { ManageProduct } from './manageProduct.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ProductFilterPipe } from '../filter/Product.pipe';
import { PagerService } from '../Service/page.services';

@Component({
    templateUrl: 'app/Components/Product.component.html'
})

export class ProductComponent implements OnInit {

    isREADONLY: boolean = false;
    exportFileName: string = "Products_";

    products: Iproduct[];
    product: Iproduct;
    msg: string;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    private allItems: any;
    pager: any = {};
    pagedItems: any[];

    //Grid Vars start
    columns: any[] = [
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
    sorting: any = {
        column: 'ProductName',
        descending: false
    };
    hdrbtns: any[] = [];
    gridbtns: any[] = [];
    initGridButton() {

        this.hdrbtns = [
            {
                title: 'Add',
                keys: [''],
                action: DBOperation.create,
                ishide: this.isREADONLY

            }];
        this.gridbtns = [
            {
                title: 'Edit',
                keys: ['ProductID'],
                action: DBOperation.update,
                ishide: this.isREADONLY
            },
            {
                title: 'X',
                keys: ["ProductID"],
                action: DBOperation.delete,
                ishide: this.isREADONLY
            }

        ];

    }
    //Grid Vars end

   
    constructor(private _ProductService: ProductService, private dialog: MdDialog, private Productfilter: ProductFilterPipe, private pageService:PagerService ) { }

    openDialog() {
        let dialogRef = this.dialog.open(ManageProduct);
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.product = this.product;

        dialogRef.afterClosed().subscribe(result => {
            if (result == "success") {
                this.LoadProducts();
                switch (this.dbops) {
                    case DBOperation.create:
                        this.msg = "Data successfully added.";
                        break;
                    case DBOperation.update:
                        this.msg = "Data successfully updated.";
                        break;
                    case DBOperation.delete:
                        this.msg = "Data successfully deleted.";
                        break;
                }
            }
            else if (result == "error")
                this.msg = "There is some issue in saving records, please contact to system administrator!"
            else
                this.msg = result;
        });
    }
    ngOnInit(): void {
         this.LoadProducts();
       // this.jqGridInit();
    }
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pageService.getPager(this.allItems.length, page);

        // get current page of items
        this.pagedItems = this.pagedItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    LoadProducts(): void {
        this._ProductService.get(Global.BASE_PRODUCT_ENDPOINT)
            .subscribe(products => {
                this.products = products;
                this.initGridButton();
            }
            );
    }
    addProduct() {
        this.dbops = DBOperation.create;
        this.modalTitle = "Add New Product";
        this.modalBtnTitle = "Add";
        this.openDialog();
    }
    editProduct(id: number) {
        this.dbops = DBOperation.update;
        this.modalTitle = "Edit Product";
        this.modalBtnTitle = "Update";
        this.product = this.products.filter(x => x.ProductID == id)[0];
        this.openDialog();
    }
    deleteProduct(id: number) {
        this.dbops = DBOperation.delete;
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.product = this.products.filter(x => x.ProductID == id)[0];
        this.openDialog();
    }
  
    gridaction(gridaction: any): void {

        switch (gridaction.action) {
            case DBOperation.create:
                this.addProduct();
                break;
            case DBOperation.update:
                this.editProduct(gridaction.values[0].value);
                break;
            case DBOperation.delete:
                this.deleteProduct(gridaction.values[0].value);
                break;
        }
    }
}