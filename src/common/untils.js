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

// 正则表达式是干什么的？字符串匹配利器(难，规则太多)
// 日期格式化
export function formatDate(date, fmt) {
  // 1.获取年份
  // y
  // y+ -> 1个或多个y
  // y* -> 0个或多个y
  // y? -> 0个或1个y

  // 2019
  // yy -19
  // yyyy- 2019
  // y-9 
  // yyy - 019
  let lenF = fmt.match(/y/g);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(lenF.join(""), (date.getFullYear() + '').slice(4 - lenF.length));
  }
  let o = {
    // 这些key都是正则的规则
    'M+': date.getMonth() + 1, // 从零开始算的
    'd+': date.getDate(),
    'h+': date.getHours(), // h和H
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`${k}`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp(`${k}`), (lenF.join("").length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) { // 补零
  return ('00' + str).slice(str.length);
}
