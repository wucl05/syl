/*
 * @Author: 聂芳 nie4161204@qq.com
 * @Date: 2023-08-17 9:37:52
 * @LastEditors: niefang2017 nie4161204@qq.com
 * @LastEditTime: 2024-08-29 23:28:56
 * @FilePath: /syl/app/composables/fetch.js
 * @Description:
 *
 */
export const fetchWithCookie = async (event, url) => {
  const res = await $fetch.raw(url);
  const cookies = (res.headers.get('set-cookie') || '').split(',');
  for (const cookie of cookies) {
    appendHeader(event, 'set-cookie', cookie);
  }
  return res._data;
};
export const fetchWithoutCookie = async (url,params) => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  const res = await $fetch(apiBase+url,params);
  return res;
};
