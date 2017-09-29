import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard } from '../Service/product-guard.service';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from '../Service/product.service';
import {PagerService} from '../Service/page.services';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports: [SharedModule, RouterModule.forChild([
        { path: 'products/:indpage,:sizepage', component: ProductListComponent },
        {
            path: 'product/:id',
            canActivate: [ProductDetailGuard],
            component: ProductDetailComponent
        }
    ])
    ],
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        ProductFilterPipe
    ],
    providers: [
    ProductService,
     ProductDetailGuard,
     PagerService]
})
export class ProductModule { }