import axios from 'axios'
import Vue from 'vue'
//设置公共的地址
axios.defaults.baseURL = "http://localhost:3090/api"
// 请求拦截
axios.interceptors.request.use((config)=>{
  
  return config 
},err=>{
  return Promise.reject(err)
})
// 响应拦截
axios.interceptors.response.use((response)=>{
  return response;
},err=>{
  return Promise.reject(err)
  }
)
Vue.prototype.$http = axios
export default axios;
