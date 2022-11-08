export interface CollectionRequest {
  username: string,
  name: string,
  description: string,
  topic: string,

  image?: File,

  customString1?: string,
  customString2?: string,
  customString3?: string,

  customInteger1?: string,
  customInteger2?: string,
  customInteger3?: string,

  customBoolean1?: string,
  customBoolean2?: string,
  customBoolean3?: string,

  customMultilineText1?: string,
  customMultilineText2?: string,
  customMultilineText3?: string,

  customDate1?: string,
  customDate2?: string,
  customDate3?: string
}
