export interface IProduct{
productID:number;
productName:string;
supplierID : number;
categoryID : number;
quantityPerUnit: number;
unitPrice : number;
unitsInStock :number;
unitsOnOrder : number;
reorderLevel : number;
discontinued : boolean;
imageUrl : string;
discription : string;
category : null;
order_Details :any[]; 
supplier : null;

}