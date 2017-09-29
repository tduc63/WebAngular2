import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {IProduct} from '../Model/product';
@Injectable()
export class ProductService {
    private _productUrl = 'api/products/';
    constructor(private _http: Http) { }
    getProducts(indPage: number, sizePage: number): Observable<IProduct[]> {
        return this._http.get(this._productUrl)
        .map((response: Response)=> <IProduct[]> response.json())
        .do(data => console.log('All:' + JSON.stringify(data)))
        .catch(this.handlerError);

    }
    getProduct(id: number): Observable<IProduct>{
        return this.getProducts(0, 0)
            .map((products: IProduct[]) => products.find(p => p.productID === id));
    }
    private handlerError(error: Response){
        console.error(error);
        return Observable.throw(error.statusText || 'Server error')
    }
}