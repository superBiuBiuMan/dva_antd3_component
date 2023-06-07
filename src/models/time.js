
export default {
  namespace: 'time',

  state: {
  },
  effects: {
    *fetch({ payload },{ call,put }){
      console.log('查看payload',payload)
      //1.异步请求
      //2.call(发送请求)
      //3.返回异步获取的信息
      return {
        username:'梦洁',
        password:'dreamlove.top',
        timeInfo:{
          //list:[0,1,2,3,],
          list:[],
          maximum:1,
        }
      }
    },
  },
  reducers: {
  }
}
