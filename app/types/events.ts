import type { LiveDetail,LiveDetailResponseData } from '~/types/live'
export type EventsItem = Pick<LiveDetail, 'title' | 'id' | 'coverImg'> & {
  address: string
  venue: string,
  startDate:string,
  startDateEn:string,
  endDate:string,
  endDateEn:string,
}
type ResopseBase = Pick<LiveDetailResponseData, 'code' | 'msg' | 'pages' | 'total' >
export type NewsResponseData = ResopseBase & {
  data:EventsItem[]
}
