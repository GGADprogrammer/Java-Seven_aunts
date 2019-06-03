const app = getApp();
wx.cloud.init({
  env: 'relationship-mdihq'
});
const db = wx.cloud.database();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    currentgender:true,
    index: null,
    multiIndex: [0, 0, 0],
    time: '12:01',
    date: '2018-12-25',
    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: '',
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
 
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  nv:function(){
    wx.navigateTo({
      url: '../viewmen/viewmen',
    })
  },
  back_houtai:function(e){
    /*var name = e.detail.value.name; 
    var identity= e.detail.value.identity; 
    var phone= e.detail.value.phone; 
    var demo = e.detail.value.demo; 
    var gender=this.data.currentgender;*/
    //var that=this;
    //console.log(that);
    //var a=e.detail.value.name;
    db.collection('myrelatives').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        name:e.detail.value.name,
        identity: e.detail.value.identity,
        phone:e.detail.value.phone,
        demo:e.detail.value.demo,
        gender:e.detail.value.gender,
        url:this.data.imgList[0]
        //th:that.data.date,
        //ceshi:a
      },
      
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
    //console.log(name);
  },
  /*switchChange: function (event) {

    //得到值,默认男性,男性为true，女性为false

    var checkedValue = event.detail.value;
    if(!checkedValue)
     this.setData({
      currentgender:'female'
     })
    //打印输出

    //console.info("当前开关按钮是否打开：" + checkedValue);

  },*/
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  }
})