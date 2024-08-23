import Http from '../http';
export default new (class events extends Http {
  /**
   * @description: 获取方案选项列表
   * @return {*}
   */
  getSolutionOptions(params={}): any {
    return this.get('/api/open/solution/getSolutionOptions', params);
  }
  /**
   * @description: 获取产品分类列表
   * @return {*}
   */
  productCategories(params={}): any {
    return this.get('/api/product/productCategories', params);
  }
  /**
   * @description: 根据分类获取方案
   * @param {string} categoryId 分类id(产品分类)
   * @return {*}
   */
  getSolution(categoryId:string): any {
    return this.get('/api/open/solution/getSolution', {categoryId});
  }
})();
