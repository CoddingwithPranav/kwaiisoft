import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Product } from '../../../models/product';
import { CommonModule, NgClass, NgOptimizedImage } from '@angular/common'
import { HeartComponent } from '../../../shared/heart/heart.component';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-card',
  standalone:true,
  imports:[NgOptimizedImage, HeartComponent, RouterModule, NgClass, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  router = inject(Router)
  @Input() item!:Product;
  @Output() handlerAdd = new EventEmitter<Product>();
  @Output() handlerwishList = new EventEmitter<Product>();



  handleProductAdd(Product: Product) {
    this.handlerAdd.emit(Product);
  }
  
  handleProductWishlist(product: Product) {
      this.handlerwishList.emit(product);
  }
 

  ngOnInit(){


  }


  viewProduct(id:string){
    this.router.navigate(['kwaii/product/', id])
  }
}
