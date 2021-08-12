import {getColledgeData} from '../services/schoolData';

export default {
  namespace: 'schoolData',
  state: {
    data: {},
  },
  reducers: {
    save: (state, {payload}) => {
      state.data = payload;
    }

  },
  effects: {
    *getColledgeData(_, {call, put}) {
      const searchRetrieval={"classField":"-1","yearList":"2009,2019","jourImageField":"0","totalPage":-1,"totalData":-1,"pageSize":20,"currentPage":1,"field":"-1","subject":"-1","collegeType":null,"searchValue":"-1","organizationName":null,"professorName":null,"isFirstAuthor":null,"jourImageName":null,"searchTitle":null,"weight":null,"isFirstCollege":"false","isMergeCollege":"false","sortField":null,"language":"-1","percent":"1","compareid":null,"isHKMT":"false","sortKey":null,"sortType":null};
      const params={searchRetrieval:encodeURI(JSON.stringify(searchRetrieval))};
      console.log(params)
      const res = yield call(getColledgeData,params);
      console.log(res)
      yield put({type: 'save',  payload: res})

    },
  }
};
