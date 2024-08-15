import Http from 'server/http';
interface LiveParams {
  page: number;
  pageSize: number;
  lang: string;
  year: string;
}
export default new (class live extends Http {
  /**
   * @description: 登录
   * @param {number} page	当前页	query	true
   * @param {number} pageSize	分页大小	query	true
   * @param {string} lang	站点语言标识(cn|en|jap|ger)\n (cn中文|en英文|jap日文|ger德文)
   * @param {string} year	年份(可选)
   * @return {*}
   */
  liveVideoList(params: LiveParams): any {
    return this.get('/api/open/liveVideo/list', params);
  }
  /**
   * @description: 登录
   * @param {number} page	当前页	query	true
   * @param {number} pageSize	分页大小	query	true
   * @param {string} lang	站点语言标识(cn|en|jap|ger)\n (cn中文|en英文|jap日文|ger德文)
   * @param {string} year	年份(可选)
   * @return {*}
   */
  liveVideoDetail(id: string): any {
    return this.get(`/api/open/liveVideo/detail/${id}`);
  }
})();
