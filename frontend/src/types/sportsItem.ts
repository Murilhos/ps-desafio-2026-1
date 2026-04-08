import { CategoryType } from "./category";

export type sportsItemType = {
    id: string;
    name: string;
    brand: string;
    price: number;
    year: number | string;
    image: string;
    amount: number;
    category: CategoryType;
}
