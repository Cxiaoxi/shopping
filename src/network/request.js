import axios from "axios"

// 封装好后就算框架换了只要在这里面改，其他主要界面使用的时候就不会被影响
export function request(config) {

  // return new Promise((resolve, reject) => {
  // 创建axios实例
  // 下面创建的instance本身就是一个promise所以不用new promise   下面直接return instance就行
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  // axios的拦截器
  // 拦截请求
  instance.interceptors.request.use(config => {
    // console.log(config);
    //  1 比如config中的一些信息不符合服务器的要求
    //  2 比如每次发送网络请求时，都希望界面中显示一个图标
    //  3 某些网络请求（比如登录（token）），必须携带一些特俗的信息

    // 拦截后得继续返回
    return config
  }, err => {
    console.log(err);
  });

  //拦截响应
  instance.interceptors.response.use(res => {
    // console.log(res);
    // 拦截后得继续返回
    return res.data
  }, err => {
    console.log(err);
  })

  // 发送网络请求
  // 改为
  return instance(config)
  // })
}
