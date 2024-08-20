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
  author?: string,
  liveStatus?:string
  canPlayback?:boolean
}
export type LiveDetail = LiveItem & {
  videoUrl?:string
  prev?: LiveItem
  next?: LiveItem
}

export type ResopseBase = {
  code: number,
  msg?:string,
  pages?:number,
  total?:number
}
export interface LiveResponseData extends ResopseBase,ParsedContent {
  data:LiveItem[]

}
export type LiveDetailResponseData = ResopseBase & {
  data:LiveDetail
}

