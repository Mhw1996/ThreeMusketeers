import axios from 'axios'

// 创建一个axios实例
const service = axios.create({
  // baseURL: 'http://dttest.abchina.com/insBackEnd/',
  baseURL: '/api',
  // baseURL: 'http://ins.oc.paas.test.abc/sns',
  withCredentials: true,
  timeout: 5000
})

// 添加请求拦截器
service.interceptors.request.use(config => {
  // config.headers['Content-Type'] = 'application/json'
  return config;
}, error => {
    Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(response => {
  return response.data
}, error => {
    return Promise.reject(error); // 返回接口返回的错误信息
})
 
export default service