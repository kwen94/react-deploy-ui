import React from 'react'
import { Select } from 'antd';
import PubSub from 'pubsub-js' // 引入
import * as actions from '../../redux/actions'


const { Option } = Select;

export default class OperateEnvSelect extends React.Component {

    constructor(props){
        super(props)
    }

    resetAllValue = () => {
        this.props.store.dispatch(actions.updateState(
            {
                value: undefined,  // 应用值

                currentTag: "请先选择应用", // 当TAG值
            
                appTagValue: undefined,    // 选择的TAG值

                deployEnvSelectValue: undefined, // 部署环境值

                appList: [],
            }
        ))     
    }

    onChange = (value) => {
        const {info} = this.props.store.getState()
        const deployEnvList = Object.keys(info[value].env_list)

        console.log("operate onchange", value)

        this.props.store.dispatch(actions.updateState(
            {
                deployEnvList: deployEnvList,
                operateEnvSelectValue: value
            }
        ))

        this.props.onChange(value)

        this.resetAllValue()

    }

    onBlur = (val) => {
    }

    onFocus = () => {
    }

    // onSearch = (val) => {
    //     this.props.store.dispatch(actions.updateState({selected: false}))
    // }

    componentDidMount(){
        PubSub.subscribe('operateEnvOnChange', (e, data) => {
            this.props.onChange(data)
        }) // 订阅
    }

    render(){
        const {operateEnvList} = this.props.store.getState()
        const {operateEnvSelectValue} =  this.props.store.getState()

        return (
            <Select
            size="middle"
            // showSearch
            placeholder='选择要操作的环境'
            style={{ width: 350 }}
            optionFilterProp="children"
            onChange={this.onChange}
            onSelect={this.onSelect}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            // onSearch={this.onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            value={operateEnvSelectValue}
          >
              {operateEnvList.map((env, index) => (
                <Option value={env} key={index}>{env}</Option>
              ))}

          </Select>

        )
    }
}
