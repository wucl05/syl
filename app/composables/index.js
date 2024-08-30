import api from '@/server/api/index';
import http from '@/server/http';
// import store from './store/index';
export const useApi = () => api;
export const useHttp = () => new http()
// export const useStore = store;
