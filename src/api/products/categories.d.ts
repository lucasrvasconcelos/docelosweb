interface AddonType {
  description?: string;
  id: string;
  image_url?: string;
  max_quantity: number;
  name: string;
  position: number;
  price: number;
}

interface AddonsGroupType {
  addons: AddonType[];
  description?: string;
  id: string;
  maxSelect?: number;
  name: string;
  required: boolean;
}

export type ItemTags =
  | "best_seller"
  | "recommended"
  | "new"
  | "exclusive"
  | "promotion";

interface ItemType {
  addonsGroup: AddonsGroupType[];
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  originalPrice?: number;
  price: number;
  tags?: ItemTags[];
}

interface CategoriesType {
  description: string;
  id: string;
  items: ItemType[];
  name: string;
  position?: number;
}

export interface GetCategoriesType {
  categories: CategoriesType[];
}
