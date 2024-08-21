import request from '@/utils/request'

// 查询政务数据直达系统办件申请信息列表
export function listSq(data) {
  return request({
    url: '/zwsj/zwsjcx/list',
    method: 'post',
    data: data
  })
}
// 浏览查询
export function listQq(data) {
  return request({
    url: '/zwsj/zwsjcx/queryById',
    method: 'post',
    params: data
  })
}
// 反馈/zwsj/zwsjcx/feedback
export function listOb(data) {
  return request({
    url: '/zwsj/zwsjcx/feedback',
    method: 'post',
    data: data
  })
}

// 查询政务数据直达系统办件申请信息详细
export function getSq(zxbh) {
  return request({
    url: '/par/sq/' + zxbh,
    method: 'get'
  })
}

// 新增政务数据直达系统办件申请信息
export function addSq(data) {
  return request({
    url: '/par/sq',
    method: 'post',
    data: data
  })
}

// 修改政务数据直达系统办件申请信息
export function updateSq(data) {
  return request({
    url: '/par/sq',
    method: 'put',
    data: data
  })
}

// 删除政务数据直达系统办件申请信息
export function delSq(zxbh) {
  return request({
    url: '/par/sq/' + zxbh,
    method: 'delete'
  })
}
