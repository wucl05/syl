export interface Data {
  value?: any;
  msg: string
  total?: number
  pages?: number
  code?: number
  data: T,
}
// export interface FetchResponse<T> {
//   data: T;
//   error?: any;
// }
export type _AsyncData<T, E> = {
  data: T;
  error: E;
};

export type FetchResponse<Data> = {
  msg: string;
  data: Data;
};

export interface Daum {
  id: number
  name: string
  age: number
  sex: number
  createTime: string
  updateTime: string
}

// @/server/http.d.ts
declare module '@/server/http' {
  export default class Http {
    // 假设这是一个简单的 HTTP 客户端类
    constructor(baseURL: string);
    get(url: string,params:any, headers:any, handleError:boolean): Promise<any>;
    post(url: string, params:any, headers:any, handleError:boolean): Promise<any>;
    det(url: string, params:any, headers:any, handleError:boolean): Promise<any>;
    put(url: string, params:any, headers:any, handleError:boolean): Promise<any>;
    // ... 其他方法
  }
}
