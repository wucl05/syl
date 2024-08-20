import Http from '../http';
type privacyParams = {
  lang:string
}
export default new (class privacy extends Http {
  privacyDetail(params:privacyParams): any {
    return this.get(`/api/open/common/getSiteSeo`,params);
  }
})();
