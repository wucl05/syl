import Http from '../http';
export default new (class plans extends Http {
  /**
   * @description: 获取方案选项列表
   * @return {*}
   */
  getSolutionOptions(params={}): any {
    return this.get('/api/open/solution/getSolutionOptions', params);
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
