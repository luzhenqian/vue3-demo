import axios from 'axios'


const httpClient = axios.create({
  baseURL: 'https://3yya.com/u/d8cf630cf5f367cc/rest/app',
  timeout: 5000,
})
httpClient.interceptors.response.use((response) => {
  return response.data
})

export default httpClient;