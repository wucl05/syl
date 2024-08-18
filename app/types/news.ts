import type { LiveDetail,LiveDetailResponseData } from '~/types/live'
export type NewsItem = Pick<LiveDetail, 'title' | 'id' | 'coverImg' | 'author' | 'publishDate' | 'viewCount'> & {
  publishDateEn?: string
  summary?: string
}
export type NewsDetail = NewsItem & {
  content?:string
  prev?: NewsItem
  next?: NewsItem
}
type ResopseBase = Pick<LiveDetailResponseData, 'code' | 'msg' | 'pages' | 'total' >
export type NewsResponseData = ResopseBase & {
  data:NewsItem[]
}
export type NewsDetailResponseData = ResopseBase &{
  data:NewsDetail
}

