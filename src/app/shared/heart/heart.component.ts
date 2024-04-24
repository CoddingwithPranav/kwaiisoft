import { NgClass } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-heart',
  standalone: true,
  imports:[NgClass],
  templateUrl: './heart.component.html',
  styleUrl: './heart.component.scss'
})
export class HeartComponent implements OnChanges{
  ngOnChanges(): void {
    if(this.iswishListed){
      this.isactive = true
    }else{
      this.isactive = false
    }
  }
  @Input() iswishListed!:boolean ;
  isactive = false;
  ngOnInit(){

  }

  ToggleClass(){
   this.isactive = !this.isactive;
  }
}
