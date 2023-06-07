import React, {Component} from 'react';
import {Checkbox,Radio} from "antd";

/* 整点时间 */
const CLOCK_TIME = [0,1,2,3,4,5];
/* 枚举 */
export const MAX_ENUM = {
  max:1,
  min:2,
  average:3,
}
class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked:false,//是否全选
      indeterminate:false,//选中的那种状态
      selectList:[],//选中列表
      selectValue:MAX_ENUM.max,//最小值,最大值,平均值,默认选中最小值
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    //如果下一次更新的值存在,并且当前接收到的value值为空,那么就执行初始化操作
    if(nextProps.value && !this.props.value){
      //初始化操作
      const { list, maximum } = nextProps.value ? nextProps.value : {};
      const isCheckAll = list && list.length === CLOCK_TIME.length;
      this.setState({
        checked: isCheckAll,
        indeterminate: !isCheckAll && !!(list && list.length > 0), //选中的那种状态
        selectList: list ? list : [], //选中列表
        selectValue: maximum ? maximum : MAX_ENUM.max, //最小值,最大值,平均值,默认选中最小值
      });
    }

  }

  //更新修饰器
  updateDecorator = (list,maximum) => {
    this.props.onChange && this.props.onChange({
      list,
      maximum,
    })
  }
  // 全选/反选
  timeCheckAllChange = e => {
    const selectList = e.target.checked ? CLOCK_TIME: []  ;
    if (!e.target.checked) {
      // 如果不是全选
      this.setState({
        selectList,
        checked:false,
        indeterminate:false,
      })
    } else {
      // 全选，全部赋值。
      this.setState({
        selectList,
        checked:true,
        indeterminate:false,
      })
    }
    this.updateDecorator(selectList,this.state.selectValue)
  }
  //多选按钮被选中
  onChange = selectList => {
    this.setState({
      selectList,
      indeterminate: !!selectList.length && selectList.length < CLOCK_TIME.length,
      checkAll: selectList.length === CLOCK_TIME.length,
    });
    this.updateDecorator(selectList,this.state.selectValue)
  };
  //单选按钮
  onRadioChange = e => {
    this.setState({
      selectValue:e.target.value,
    })
    this.updateDecorator(this.state.selectList,e.target.value)
  }
  render() {
    const { checked,indeterminate,selectList,selectValue } = this.state;
    return (
      <div>
        {/* 全选 */}
        <>
          <Checkbox
            indeterminate={indeterminate}
            onChange={this.timeCheckAllChange}
            checked={checked}
          >
            全选
          </Checkbox>
          <Checkbox.Group value={ selectList } onChange={this.onChange}>
            { CLOCK_TIME.map((item, index) => (
              <Checkbox value={index}>{`${index < 10 ? `0${index}` : `${index}`}:00`}</Checkbox>
            ))
            }
          </Checkbox.Group>
        </>
        <>
          {/* 最值单选 */}
            <Radio.Group value={ selectValue } onChange={this.onRadioChange} style={{ marginTop: '20px' }}>
              <Radio value={MAX_ENUM.max}>最大值</Radio>
              <Radio value={MAX_ENUM.min}>最小值</Radio>
              <Radio value={MAX_ENUM.average}>平均值</Radio>
            </Radio.Group>
        </>
      </div>
    );
  }
}

export default Time;
