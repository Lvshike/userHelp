import request from '../utils/premissionRequest';

// 查人员总公司
export function headOrg() {
  return request({
    url: '/data/orgs/headOrg',
    method: 'get'
  })
}
//查根组织
export function currentOrg(itemId) {
  return request({
    url: '/data/help/current/org?dp=true&itemId=' + itemId,
    method: 'get'
  })
}
// 查每一级人员
export function defaultOrg(data, itemId) {
  return request({
    url: '/data/help/org/user?dp=true&itemId=' + itemId,
    method: 'post',
    data
  })
}
// 根据Id查下面所有人员
export function getAllUserById(data) {
  const list = []
  list.push(data)
  return request({
    url: '/data/help/multi/users',
    method: 'post',
    data: {
      'orgIds': list
    }
  })
}
// 根据Id查下面所组织
export function getAllOrgById(data) {
  const list = []
  list.push(data)
  return request({
    url: '/data/help/multi/orgs',
    method: 'post',
    data: {
      'orgIds': list
    }
  })
}
export function getUserInfo(itemId) {
  return request({
    url: '/api/user/detail?itemId='+itemId,
    method: 'get'
  })
}
// search
export function helpUser(data, itemId) {
  return request({
    url: `/data/search/users?name=${data.name}&dp=true&itemId=` + itemId,
    method: 'get',
    data
  })
}
export async function defaultOrgHandle(data, itemId) {
  const Handle = await request({
    url: '/data/help/org/default?dp=true&itemId=' + itemId,
    method: 'post',
    data
  })
  return Handle
}
export async function OrgQuerysBM(data, itemId) {
  // 2 分部 3 部门
  const Handle = await request({
    url: `/data/search/orgs?name=${data.name}&dp=true&itemId=` + itemId,
    method: 'get'
  })
  return Handle
}
export async function OrgQuerysFB(data, itemId) {
  const Handle = await request({
    url: `/data/search/orgs?name=${data.name}&dp=true&itemId=` + itemId,
    method: 'get'
  })
  return Handle
}
export async function defaultOrgHandleBranch(data, itemId) {
  const Handle = await request({
    url: '/data/help/org/default?dp=true&isBranch=true&itemId=' + itemId,
    method: 'post',
    data
  })
  return Handle
}
