
import crypto from 'crypto'

// 进行签名校验 生成最终的options
function checkUrl(config) {
  // appKey
  const appKey = 'U2FsdGVkX18YEbHP8DVdNLmkjGBICl7Ixm41a/LemtQ='
  // 进行签名
  var options = null
  if (config.method === 'get') { // get请求签名
    options = {
      _appid: 'optimus.m',
      _timestamp: Math.floor(new Date().getTime() / 1000),
      ...config.params
    }
  } else { // post请求签名
    options = {
      _appid: 'optimus.m',
      _timestamp: Math.floor(new Date().getTime() / 1000),
      _body: JSON.stringify(config.data)
    }
  }
  // result生成最后签名
  var result = appKey
  var arr = Object.keys(options).sort()
  arr.forEach((val) => {
    result += val + options[val]
  })
  // 进行md5加密
  result = crypto.createHash('md5').update(result).digest('hex')

  options['_sign'] = result // 签名
  return options
}

var utilsMethod = {
  get(config) {
    var options = checkUrl(config)
    config.params['_timestamp'] = options['_timestamp']
    config.params['_sign'] = options['_sign']
  },
  post(config) {
    // if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
    var options = checkUrl(config)
    config.params['_timestamp'] = options['_timestamp']
    config.params['_sign'] = options['_sign']
    // }
  }
}
export function verifivationUrl(config) {
  utilsMethod[config.method](config)
}
