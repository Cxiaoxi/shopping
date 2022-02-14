
// 防抖函数
export function debounce(func, delay) {
  let timer = null;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    //  异步函数 setTimeout在下一次事件循环的时候才会执行
    // 会放到最后执行 哪怕不写时间
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}