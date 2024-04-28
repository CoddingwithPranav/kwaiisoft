import { Product } from "./product";
import { ProfileUser } from "./user";

export interface userDetails{
    user:ProfileUser,
    cart:Product[],
    wishlist:Product[]
}