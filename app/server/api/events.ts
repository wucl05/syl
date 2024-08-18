import Http from '../http';
import { LivePagesParams } from '~/types/live';
export default new (class events extends Http {
  /**
   * @description: 展会列表
   * @param {number} page	当前页	query	true
   * @param {number} pageSize	分页大小	query	true
   * @param {string} lang	站点语言标识(cn|en|jap|ger)\n (cn中文|en英文|jap日文|ger德文)
   * @param {string} year	年份(可选)
   * @return {*}
   */
  eventsList(params: LivePagesParams): any {
    return this.get('/api/open/activity/list', params);
  }
})();
