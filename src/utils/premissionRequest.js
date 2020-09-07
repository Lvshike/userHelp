import Cookies from 'js-cookie'
import { getToken, removeToken } from './auth'
import axios from 'axios'
const DOMAIN = Cookies.get('app.domain')
export const BASEURL = `${DOMAIN}/auth/api`
// export const BASEURL = `http://demo-a3.mamcharge.com/auth/api`
const service = axios.create({
  baseURL: BASEURL,
  timeout: 60000
})
service.interceptors.request.use(config => {
  // config.headers['token'] = "a24df102e952498ea0dc36e2b9dd9207"
  config.headers['token'] = getToken()
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(response => {
  return response.data
}, error => {})

export default service
