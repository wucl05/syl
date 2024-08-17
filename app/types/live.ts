import type { ParsedContent } from '@nuxt/content'

export interface LiveItem extends ParsedContent {
  title: string
  publishDate: string
  author: string
  coverImg?: string
  id?: string
  viewCount?:number
}

export interface LiveResponseData extends ParsedContent {
  code: number,
  data:LiveItem[],
  msg?:string,
  pages:number,
  total:number
}
