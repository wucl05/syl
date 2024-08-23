import type { ResopseBase } from '~/types/live'
export interface Solution {
  id: number;
  title?: string; // 方案名称
  introduction?: string; //方案简介
  bgImg?: string; // 背景图片
  sysImg?: string; // 系统结构图
  advantageDesc?: string; // 优势简介
  solutionAdvantageList?: SolutionAdvantage[]; // 方案优势列表Vo
  productList?: Product[]; //产品列表vo
  successCaseList?: SuccessCase[]; //成功案例列表Vo
}

interface SolutionAdvantage {
  id: number;
  icon: string;
  title?: string;
  describe?: string;
}

interface Product {
  id: number;
  name: string;
  coverImg: string;
  specs?: string;
  categoryName: string;
  categoryId: number;
}

interface SuccessCase {
  id: number;
  title: string;
  coverImg?: string;
  countryId?: number;
  countryName?: string;
  districtId?: number;
  district?: string;
  year?: number;
  scale?: string;
}

export type SolutionResponseData = ResopseBase & {
  data:Solution[]
}
type OptionsDetail = Pick<SuccessCase, 'title' | 'id' >
export type SolutionOptionsResponseData = ResopseBase &{
  data:OptionsDetail[]
}
