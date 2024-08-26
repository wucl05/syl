import Http from '../http';
export default new (class plans extends Http {
  /**
   * @description: 成功案例列表
   * @return {*}
   */
  getSuccessCaseList(params={}): any {
    return this.get('/api/open/successCase/list', params);
  }
  /**
   * @description: 获取案例地区列表
   * @return {*}
   */
  getCaseRegions(params={}): any {
    return this.get('/api/open/successCase/getCaseRegions', params);
  }
  /**
   * @description: 获取产品分类列表
   * @return {*}
   */
  productCategories(params={}): any {
    return this.get('/api/open/product/productCategories', params);
  }
})();
