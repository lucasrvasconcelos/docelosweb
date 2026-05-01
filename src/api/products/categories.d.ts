interface AddonsType {
  id: string;
  image_url?: string;
  max_quantity: number;
  name: string;
  position: number;
  price: number;
}

interface AddonsGroupType {
  addons: AddonsType[];
  description: string;
  id: string;
  maxSelect?: number;
  name: string;
  required: boolean;
}

export type ItemsTags =
  | "best_seller"
  | "recommended"
  | "new"
  | "exclusive"
  | "promotion";

interface ItemsType {
  addonsGroup: AddonsGroupType[];
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  originalPrice?: number;
  price: number;
  tags?: ItemsTags[];
}

interface CategoriesType {
  description: string;
  id: string;
  items: ItemsType[];
  name: string;
  position?: number;
}

export interface GetCategoriesType {
  categories: CategoriesType[];
}
