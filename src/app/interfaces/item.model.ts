import { User } from "./user.model";
import { Tag } from "./tag.model";
import { Collection } from "./collection.model";

export interface Item {
  itemId: number,
  name: string,
  likes: User[],
  tags: Tag[],
  owner: User,

  customString1?: string,
  customString2?: string,
  customString3?: string,

  customInteger1?: number,
  customInteger2?: number,
  customInteger3?: number,

  customBoolean1?: boolean,
  customBoolean2?: boolean,
  customBoolean3?: boolean,

  customMultilineText1?: string,
  customMultilineText2?: string,
  customMultilineText3?: string,

  customDate1?: string,
  customDate2?: string,
  customDate3?: string,

  parentCollection: Collection
}
