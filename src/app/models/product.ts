export interface Product{
  id:string,
  title:string,
  description:string,
  details:string,
  price:number,
  discount:number,
  quantity:number,
  isActive:boolean,
  productImgPath:string,
  selectedImage:any;
  isFeatured:boolean,
  IsWishlisted?:boolean,
  Incart?:boolean,

}
