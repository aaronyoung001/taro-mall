import request from '../utils/request';
import Api from '../config/api';

/**
 *  首页数据接口
 */
export async function getColledgeData(payload) {
  return request.get("http://subjectsearchtest.dayainfo.com/infoAcquisition/searchCollegePageBean", payload)
}
