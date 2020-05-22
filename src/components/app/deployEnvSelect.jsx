import React from 'react'
import { Select } from 'antd';
import * as actions from '../../redux/actions'
import PubSub from 'pubsub-js' // 引入


const { Option } = Select;

export default class DeployEnvSelect extends React.Component {

    constructor(props){
        super(props)
    }

    resetAllValue = () => {
        this.props.store.dispatch(actions.updateState(
            {
                value: undefined,  // 应用值

                currentTag: "请先选择应用", // 当TAG值
            
                appTagValue: undefined,    // 选择的TAG值

            }
        ))     
    }

    onChange = (value) => {
        let appList = []
        const {info, operateEnvSelectValue} = this.props.store.getState()
        console.log(info, operateEnvSelectValue)

        appList = info[operateEnvSelectValue].env_list[value]
        this.props.store.dispatch(actions.updateState(
            {
                appList: appList,
                deployEnvSelectValue: value
            }
        ))

        this.props.onChange(value)

        this.resetAllValue()
    }

    onBlur = (val) => {

        // const {selected} = this.props.store.getState()
        // if(!selected){ 
        //     this.props.store.dispatch(actions.updateState({
        //         selected: false,
        //         value: undefined,
        //         appTagContent: "请先选择应用",
        //         appTagList: [],
        //         currentTag: "请先选择应用",
        //         appTagvalue: undefined
        //     }))

        //     // this.props.onChange(undefined)

            
        // }
    }

    onFocus = () => {
    }

    onSearch = (val) => {
        this.props.store.dispatch(actions.updateState({selected: false}))
    }

    componentDidMount(){
        PubSub.subscribe('deployeEnvOnChange', (e, data) => {
            this.props.onChange(data)
            console.log('deployeEnvOnChange', e, data)
        }) // 订阅
    }

    render(){
        const {deployEnvList} = this.props.store.getState()
        const {deployEnvSelectValue} =  this.props.store.getState()
        return (
            <Select
            size="middle"
            showSearch
            placeholder='选择要发布的环境'
            style={{ width: 350 }}
            optionFilterProp="children"
            onChange={this.onChange}
            onSelect={this.onSelect}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onSearch={this.onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            value={deployEnvSelectValue}
          >
              {deployEnvList.map((app, index) => (
                <Option value={app} key={index}>{app}</Option>
              ))}

          </Select>

        )
    }
}
