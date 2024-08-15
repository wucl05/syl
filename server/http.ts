import { UseFetchOptions,useFetch } from "nuxt/app";
import { hash } from 'ohash';

const fetch = (url: string, options:UseFetchOptions<T>, headers: any, handleError: any) => {
  const {
    public: { apiBase },
  } = useRuntimeConfig(); // 3.0正式版环境变量要从useRuntimeConfig里的public拿
  const reqUrl = apiBase + url; // 你的接口地址

  // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求
  const key = hash(JSON.stringify(options) + url);

  // 可以设置默认headers例如
  const customHeaders = {
    'Content-Type': 'application/json;charset=UTF-8',
    ...headers,
  };

  return new Promise((resolve, reject) => {
    useFetch(reqUrl, { ...options, key, headers: customHeaders })
      .then(({ data, error }) => {
        if (error.value) {
          const { code, msg = '' } = error.value.data;
          if (!handleError && code !== 0 && process.client) {
            console.log(msg || '服务异常')
          }
          reject(error.value.data);
          return;
        }
        const value = data.value;
        if (!value) {
          throw createError({
            statusCode: 500,
            statusMessage: reqUrl,
            message: '自己后端接口的报错信息',
          });
        } else {
          if (!handleError && value.code !== 0 && process.client) {
            console.log(value.msg || '服务异常')
          }
          resolve(value);
        }
      })
      .catch((err) => {
        if (process.client && !handleError) {
          console.log(err.msg || '服务异常')
        }
        reject(err);
      });
  });
};
export default class Http {
  get(url:string, params:any= {}, headers:any={}, handleError:boolean = false) {
    return fetch(url, { method: 'get', params }, headers, handleError);
  }

  post(url:string, params:any = {}, headers:any={}, handleError:boolean = false) {
    return fetch(
      url,
      { method: 'post', body: { ...params } },
      headers,
      handleError,
    );
  }

  put(url:string, params:any = {}, headers:any = {}, handleError:boolean = false) {
    return fetch(url, { method: 'put', params }, headers, handleError);
  }

  delete(url:string, params:any = {}, headers:any={}, handleError:boolean = false) {
    return fetch(url, { method: 'delete', params }, headers, handleError);
  }
}
