// 运行管理--->订单管理
import orderManager from './order'
// 运行管理--->商家管理
import merchantManager from './merchant'
// 运行管理--->活动管理
import activityManager from './activity'
// 运行管理--->商城管理
import shopManager from './shop'

export default [].concat(orderManager, merchantManager, activityManager, shopManager)
