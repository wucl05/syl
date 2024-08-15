/*
 * @Author: 聂芳 nie4161204@qq.com
 * @Date: 2023-03-03 11:37:52
 * @LastEditors: 聂芳 nie4161204@qq.com
 * @LastEditTime: 2023-03-03 14:08:42
 * @FilePath: /frog-nuxt-ssr/composables/fetch.js
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
