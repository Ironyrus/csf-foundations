import { Item } from "./item.interface";

export interface Cart {
    cartId: number;
    username: string;
    contents: Item[];

}