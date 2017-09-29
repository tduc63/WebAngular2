import { NgModule, ErrorHandler } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { ProductComponent } from './components/Product.component';
import { HomeComponent } from './components/home.component';
import { ProductService } from './Service/Product.service'
import { ProductFilterPipe } from './filter/Product.pipe'
import { SearchComponent } from './Shared/search.component';
import AppErrorHandler from './Shared/errorhandler';
import { ManageProduct } from './components/manageProduct.component';

import { DataGrid } from './Shared/datagrid/datagrid.component';
import { DataGridUtil } from './Shared/datagrid/datagrid.util';
import { Format } from './Shared/datagrid/format';
import { OrderBy } from './Shared/datagrid/orderby';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, FormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        MdNativeDateModule],
    declarations: [AppComponent, ProductComponent, HomeComponent, ProductComponent, SearchComponent, ManageProduct,
        DataGrid, Format, OrderBy
    ],
    providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }, { provide: APP_BASE_HREF, useValue: '/' }, ProductService, ProductFilterPipe],
    entryComponents: [ManageProduct],
    bootstrap: [AppComponent]

})
export class AppModule { }
