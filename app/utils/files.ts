/**
 * @description 获取文件后缀
 */
export const getFileExtension = (url:string) =>{
  return url.split('.').pop()
}

