import {Component, OnInit}  from '@angular/core';
import {IProduct} from '../Model/product';
import { ProductService } from '../Service/product.service';
import { PagerService } from '../Service/page.services';

@Component({
    templateUrl: 'app/products/product-list.component.html',
    styleUrls: ['app/products/product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin:number = 5;
    showImage: boolean = true;
    listFilter: string = '';
    errorMessage: string;
    imagePath: string = 'http://www.storenorthwind.us/Content/Template/img/photos/';
    products: IProduct[] ;
       // array of all items to be paged
    private allItems: any[];
 
    // pager object
    pager: any = {};
 
    // paged items
    pagedItems: any[];

    constructor(private _productService: ProductService,private pagerService: PagerService) {

    }
    toggleImage(): void {
        this.showImage = !this.showImage;
    }
    ngOnInit(): void{
        let indpage = 1, sizepage = 10;
       this._productService.getProducts(indpage,sizepage)
                .subscribe(data => {
                // set items to json response
                this.allItems = data;

                // initialize to page 1
                this.setPage(1);
            },
                error => this.errorMessage = <any>error)
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);
 
        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}