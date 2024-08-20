import type { ResopseBase } from '~/types/live'
export type PrivacyDeatil = {
  siteId?: string
  keyword?: string
  desc?: string
  cookie?: string
}
export type PrivacyResponseData = ResopseBase & {
  data:PrivacyDeatil
}

