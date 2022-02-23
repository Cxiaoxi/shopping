import Toast from './Toast'

const obj={}

// 会把vue当场参数传递
obj.install=function(Vue){
  // console.log("toast.install被执行",Vue);
  // 在vue的原型上加上$toast
  //  此时的Toast.$el并没有被创建出来

  // 1  创建组件构造器
  const toastConstrustor=Vue.extend(Toast);
  // 2  new的方式，根据组件构造器，可以创建出一个组件对象
  const toast=new toastConstrustor();
  // 3  将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'));
  // 4  toast.$el对应的就是div 加上去
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast =toast;
}

export default obj