import {
  Form,
  Select,
  Button,
} from 'antd';

import PubSub from 'pubsub-js' // 引入

import React from 'react'
import TagList from './tagList'
import App from './app'

import * as actions from '../../redux/actions'
import MyTag from './myTag'
import OperateEnvSelect  from './operateEnvSelect'
import DeployEnvSelect from './deployEnvSelect'



const { Option } = Select;

export default class MyForm extends React.Component {

  constructor(props) {
    super(props);
  }


  childResetAppValue = (value) => {
    return this.appChild.resetValue(value)
  }

  childResetRadioValue = () => {
    this.radioChild.resetRadio()
  }

  formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  onFinish = values => {
    const {operateEnvSelectValue, value, appTagValue, deployEnvSelectValue} = this.props.store.getState()

    console.log('operateEnvSelectValue', operateEnvSelectValue)
    console.log('deployEnvSelectValue', deployEnvSelectValue)
    console.log('appValue', value)
    console.log('appTagValue', appTagValue)

    if(!operateEnvSelectValue){
      PubSub.publish('deployeEnvOnChange', undefined)
    }
    if(!deployEnvSelectValue){
      PubSub.publish('deployeEnvOnChange', undefined)
    }
    if(!value){
      PubSub.publish('appOnChange', undefined)
    }
    if(!appTagValue){
      PubSub.publish('tagListOnChange', undefined)
    }

    if(operateEnvSelectValue&&deployEnvSelectValue&&value&&appTagValue){
      console.log("开始提交")
    }

  }

  componentDidMount() {
    this.props.store.dispatch(actions.setOperateInfoAsync())
  }

  render() {
    const { appList, 
            tagValidateStatus, 
            tagErrorMsg } = this.props.store.getState()

    return (
      <Form
        name="validate_other"
        {...this.formItemLayout}
        onFinish={this.onFinish}
        width={600}
      >

        <Form.Item name="OperateEnvSelect" label="操作环境" 
        rules={[{ required: true, message: "环境为首选项、必选项" }]} >
          <OperateEnvSelect store={this.props.store}/>
        </Form.Item>

        <Form.Item name="DeployEnvSelect" label="部署环境"
          rules={[{ required: true, message: "环境为首选项、必选项" }]}
        >
          <DeployEnvSelect store={this.props.store}/>
        </Form.Item>

        <Form.Item
          name="app_select"
          label="选择应用"
          rules={[{ required: true, message: "环境为首选项、必选项" }]}
        >

          <App appList={appList}
            // onRef={(ref) => { this.appChild = ref }}
            store={this.props.store}
          />


        </Form.Item>


        <Form.Item label="当前TAG" >
          <MyTag store={this.props.store}/>
        </Form.Item>


        <Form.Item
          name="tag_select"
          label="选择TAG"
          rules={[{ required: true, message: "TAG为必选项" }]}
        >
          {/* <TagList id="TagList" store={this.props.store} onRef={(ref) => { this.appTagChild = ref }}/> */}
          <TagList id="TagList" store={this.props.store} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">发布</Button>
        </Form.Item>
      </Form>
    )
  }
}
