import type { ParsedContent } from '@nuxt/content'
type BaseLiveItem = ParsedContent & {
  title: string
  id: string
}
export type LiveItem = BaseLiveItem & {
  viewCount?:number
  publishDate?: string
  coverImg?: string
  author?: string
}
export type LiveDetail = LiveItem & {
  videoUrl?:string
}
export interface LiveResponseData extends ParsedContent {
  code: number,
  data:LiveItem[],
  msg?:string,
  pages:number,
  total:number
}
export type LiveDetailResponseData = {
  code: number,
  data:LiveDetail,
  msg?:string
  pages?:number,
  total?:number
}

