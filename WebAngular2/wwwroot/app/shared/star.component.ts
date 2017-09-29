import { Component, OnChanges, Input,
         Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ai-star',
    templateUrl: 'app/shared/star.component.html',
    styleUrls:['app/shared/star.component.css']
})

export class StarComponent implements OnChanges {
   @Input() rating: number;
    starWidth:number ;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();
    ngOnChanges():void{
      this.rating = (((Math.random() )*10 ) % 4 + 1);
        this.starWidth = this.rating * 86/5 ;
    }

    OnClick(): void {
        this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
    }
}