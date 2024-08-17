/*
 * @Author: 聂芳 nie4161204@qq.com
 * @Date: 2024-08-16 20:59:07
 * @LastEditors: niefang2017 nie4161204@qq.com
 * @LastEditTime: 2024-08-16 21:03:26
 * @FilePath: /syl/app/utils/setMeta.ts
 * @Description:
 *
 */
const logo = '/logo.svg';
/**
 * @description: 设置meta seo信息
 * @param {String} title 标题
 * @param {String} keywords 关键词
 * @param {String} description 描述
 * @param {String} image 图片
 * @return {Object}
 */
export const setMeta = ({
  title = '首页',
  keywords = '双一力官网,储能电池,可持续发展,清洁能源,光伏,syl',
  description = '双一力-让绿色新能量创造人类新生活',
  image = logo,
} = {}) => {
  return {
    title: `双一力官网${title ? '_' + title : ''}`,
    meta: [
      {
        name: 'keywords',
        content: keywords,
      },
      {
        name: 'description',
        content: description,
      },
      {
        name: 'author',
        content: '聂芳',
      },
      {
        property: 'og:title',
        content: `春秋阁${title ? '_' + title : ''}`,
      },
      {
        property: 'og:keywords',
        content: keywords,
      },
      {
        property: 'og:description',
        content: description,
      },
      {
        property: 'og:image',
        content: image,
      },
      {
        property: 'og:image:secure_url',
        content: image,
      },
      {
        property: 'og:site_name',
        content: 'Chinese idiom frog',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:image:alt',
        content: 'Chinese idiom frog',
      },
      {
        property: 'og:locale',
        content: 'zh-CN',
      },
      {
        property: 'twitter:site',
        content: '@chengyu_frog',
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        property: 'twitter:image',
        content: image,
      },
    ],
  };
};
