/**
 * Created by PanJiaChen on 16/11/18.
 */
/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * 获取浏览器版本
 */
export function getBro() {
  var broName = 'Runing'
  var strStart = 0
  var strStop = 0
  var temp = ''

// userAgent（用户代理，指浏览器）
  var userAgent = window.navigator.userAgent // 包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform

  /* alert(userAgent);*/

// FireFox
  if (userAgent.indexOf('Firefox') !== -1) {
    /* broName = 'FireFox浏览器';*/
    strStart = userAgent.indexOf('Firefox')
    temp = userAgent.substring(strStart)
    broName = temp.replace('/', '版本号')
  }

// Edge
  if (userAgent.indexOf('Edge') !== -1) {
    /* broName = 'Edge浏览器';*/
    strStart = userAgent.indexOf('Edge')
    temp = userAgent.substring(strStart)
    broName = temp.replace('/', '版本号')
  }

// IE浏览器
  if (userAgent.indexOf('NET') !== -1 && userAgent.indexOf('rv') !== -1) {
    /* broName = 'IE浏览器'; */
    strStart = userAgent.indexOf('rv')
    strStop = userAgent.indexOf(')')
    temp = userAgent.substring(strStart, strStop)
    broName = temp.replace('rv', 'IE').replace(':', '版本号')
  }

// 360极速模式可以区分360安全浏览器和360极速浏览器
  if (userAgent.indexOf('WOW') !== -1 && userAgent.indexOf('NET') < 0 && userAgent.indexOf('Firefox') < 0) {
    if (navigator.javaEnabled()) {
      broName = '360安全浏览器-极速模式'
    } else {
      broName = '360极速浏览器-极速模式'
    }
  }

// 360兼容
  if (userAgent.indexOf('WOW') !== -1 && userAgent.indexOf('NET') !== -1 && userAgent.indexOf('MSIE') !== -1 && userAgent.indexOf('rv') < 0) {
    broName = '360兼容模式'
  }

// Chrome浏览器
  if (userAgent.indexOf('WOW') < 0 && userAgent.indexOf('Edge') < 0) {
    /* broName = 'Chrome浏览器';*/
    strStart = userAgent.indexOf('Chrome')
    strStop = userAgent.indexOf(' Safari')
    temp = userAgent.substring(strStart, strStop)
    broName = temp.replace('/', '版本号')
  }
  return broName
}

