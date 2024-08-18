import type { ParsedContent } from '@nuxt/content'
export type LivePagesParams = {
  page: number;
  pageSize: number;
  lang: string;
  year: string;
}
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
  prev?: LiveItem
  next?: LiveItem
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

