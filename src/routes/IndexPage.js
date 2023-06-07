import React, {Component} from 'react';
import {Form, Input, Icon, Button, Checkbox,} from "antd";
import Time from "./component/time";
import {connect} from "dva";

let tempValue = {};

@Form.create()

@connect(({time}) => ({time}))

class IndexPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //1.获取数据
    const {dispatch} = this.props;
    dispatch({
      type: 'time/fetch',
      //模拟传入搜索参数
      payload: {
        name: '李白',
        description: '大家好,我叫李白'
      }
    }).then(res => {
      //2.填充数据
      console.log('获取的', res)
      this.props.form.setFieldsValue(res);//等同于如下
      //this.props.form.setFieldsValue({
      //  username: '梦洁',
      //  password: 'dreamlove.top',
      //  timeInfo: {
      //    list: [0, 1, 2, 3,],
      //    maximum: 1,
      //  }
      //});
    })
  }

  //校验
  validateTimeInfo = (rule, value, callback) => {
    if (!value) {
      callback('请选择值');
    } else {
      const { list = [], maximum } = value;
      if (!list.length || !maximum) {
        callback('请选择值');
      } else {
        callback();
      }
    }
  }

  //点击提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('验证通过,填写的值: ', values);
        tempValue = values;
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{required: true, message: '请填写用户名'}],
            })(
              <Input
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请填写密码'}],
            })(
              <Input
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password"
                placeholder="请输入密码"
              />,
            )}
          </Form.Item>
          {/* 全选/全不选/最值选择 */}
          <Form.Item label={'时间选择'}>
            {
              getFieldDecorator('timeInfo',
                {
                  rules: [
                    {required: true},
                    { validator: this.validateTimeInfo }
                  ],
                })(
                <Time/>
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
        <div>
          { JSON.stringify(tempValue) }
        </div>
      </div>
    );
  }
}

export default IndexPage;
