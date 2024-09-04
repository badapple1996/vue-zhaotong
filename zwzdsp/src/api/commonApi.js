import request from '@/utils/request'

// 查询政务数据直达系统办件申请信息列表
export function listQuery(query) {
  return request({
    url: '/zwsj/zwsjcx/list',
    method: 'post',
    data: query
  })
}
// 浏览查询 zxbh id
export function getInfoById(data) {
  return request({
    url: '/zwsj/zwsjcx/queryById',
    method: 'post',
    params: data
  })
}

// 反馈政务数据直达系统办件
export function feedbackOp(data) {
  return request({
    url: '/zwsj/zwsjcx/feedback',
    method: 'post',
    data: data
  })
}
