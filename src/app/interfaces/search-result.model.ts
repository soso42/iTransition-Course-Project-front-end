import { Item } from "./item.model";
import { Collection } from "./collection.model";

export interface SearchResult {
  items: Item[],
  collections: Collection[]
}
