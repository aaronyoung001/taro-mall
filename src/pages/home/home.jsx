import React, { PureComponent } from 'react';
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Navigator, Swiper, SwiperItem, Image, ScrollView, Block,Icon } from '@tarojs/components'
import { connect } from 'react-redux';
import { AtIcon, AtTag} from 'taro-ui';
// import { TabBar } from '../../components';
import { get as getGlobalData} from '../../global_data';
import { couponReceive } from '../../services/coupon';
import { TaroVirtualList } from 'taro-virtual-list'

import './home.less'

@connect(({ schoolData, config }) => ({
  data: schoolData.data,
  theme: config.theme
}))
class Index extends PureComponent {




  // 渲染列表Item
  renderFunc = (item, index, pageIndex) => {
    return (
      <View className="list-block">
        <View className="list-item"> <View className="list-item-label">学校名称:</View>{`${item.collegeName}`}</View>
        <View className="list-item"> <View className="list-item-label">发文量:</View>{`${item.collegeName}`}</View>
      </View>
    )
  }
  handleBottom = () => {
    console.log('触底了')
  }
  handleComplete = () => {
    console.log('加载完成')
  }


  $instance = getCurrentInstance()
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const { dispatch } = this.props;
    dispatch({type: 'schoolData/getColledgeData'})
  }

  onPullDownRefresh() {
    Taro.showNavigationBarLoading() //在标题栏中显示加载
    this.getData();
    Taro.hideNavigationBarLoading() //完成停止加载
    Taro.stopPullDownRefresh() //停止下拉刷新
  }

  componentWillMount() {
    // 页面初始化 options为页面跳转所带来的参数
    let {scene, grouponId, goodId, orderId} = this.$instance.router.params;
    if (scene) {
      //这个scene的值存在则证明首页的开启来源于朋友圈分享的图,同时可以通过获取到的goodId的值跳转导航到对应的详情页
      scene = decodeURIComponent(scene);
      console.log("scene:" + scene);

      let info_arr = [];
      info_arr = scene.split(',');
      let _type = info_arr[0];
      let id = info_arr[1];

      if (_type == 'goods') {
        Taro.navigateTo({
          url: '../goods/goods?id=' + id
        });
      } else if (_type == 'groupon') {
        Taro.navigateTo({
          url: '../goods/goods?grouponId=' + id
        });
      } else {
        Taro.navigateTo({
          url: '../index/index'
        });
      }
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (grouponId) {
      //这个pageId的值存在则证明首页的开启来源于用户点击来首页,同时可以通过获取到的pageId的值跳转导航到对应的详情页
      Taro.navigateTo({
        url: '../goods/goods?grouponId=' + grouponId
      });
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (goodId) {
      //这个goodId的值存在则证明首页的开启来源于分享,同时可以通过获取到的goodId的值跳转导航到对应的详情页
      Taro.navigateTo({
        url: '../goods/goods?id=' + goodId
      });
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (orderId) {
      //这个orderId的值存在则证明首页的开启来源于订单模版通知,同时可以通过获取到的pageId的值跳转导航到对应的详情页
      Taro.navigateTo({
        url: '../ucenter/orderDetail/orderDetail?id=' + orderId
      });
    }



  }

  onShareAppMessage () {
    return {
      title: 'Taro mall小程序商场',
      desc: 'Taro 开源微信小程序商城',
      path: '/pages/index/index'
    }
  }

  getCoupon = (e) => {
    if (!getGlobalData('hasLogin')) {
      Taro.navigateTo({
        url: "/pages/auth/login/login"
      });
    }

    let couponId = e.currentTarget.dataset.index;
    couponReceive({
      couponId: couponId
    }).then(() => {
      Taro.showToast({
        title: "领取成功"
      })
    })
  }

  render () {
    const {goodsCount, data, theme} = this.props;
    return (
      <Block>
        <View className='bar-container container'>
          <View className='search'>
            <Navigator url='/pages/search/search' className='input'>
              <AtIcon className='icon' size='18' color='#666' value='search' />
              <Text className='txt'>搜索</Text>
            </Navigator>
          </View>
          <View>
            <TaroVirtualList
              list={data.list}
              onRender={this.renderFunc}
              onBottom={this.handleBottom}
              onComplete={this.handleComplete}
              scrollViewProps={{
          style: {
            "height": '100vh',
          },
        }}
            />
          </View>






        </View>
      </Block>
    )
  }
}

export default Index
