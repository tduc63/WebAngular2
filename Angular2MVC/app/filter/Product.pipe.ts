import { PipeTransform, Pipe, Injectable } from '@angular/core';
import { Iproduct } from '../Model/product';

@Pipe({
    name: 'ProductFilter'
})

@Injectable()
export class ProductFilterPipe implements PipeTransform {

    transform(value: Iproduct[], filter: string): Iproduct[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: Iproduct) =>
            app.ProductName != null && app.ProductName.toLocaleLowerCase().indexOf(filter) != -1
            || app.UnitPrice != null && app.UnitPrice.toString().indexOf(filter) != -1
            || app.UnitsInStock != null && app.UnitsInStock.toString().indexOf(filter) != -1
            ) : value;
    }

}