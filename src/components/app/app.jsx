import React from 'react'
import { Select } from 'antd';
import * as actions from '../../redux/actions'
import PubSub from 'pubsub-js' // 引入


const { Option } = Select;

export default class App extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount() {
        // this.props.onRef(this)
        PubSub.subscribe('appOnChange', (e, data) => {
            this.props.onChange(data)
        }) // 订阅
    }


    resetAllValue = () => {
        this.props.store.dispatch(actions.updateState(
            {

                currentTag: "请先选择应用", // 当TAG值
            
                appTagValue: undefined,    // 选择的TAG值

            }
        ))     
    }


    onChange = (value) => {
        this.props.store.dispatch(actions.updateState({
            selected: true,
            value: value,
        }))

        this.props.onChange(value)

        this.resetAllValue()

        const {deployEnvSelectValue} =  this.props.store.getState()

        this.props.store.dispatch(actions.updateState({
            appTagContent: "加载中",
            appTagList: [],
            appTagvalue: undefined,
        }))
        
        this.props.store.dispatch(actions.setAppTagListAsync(value))
        this.props.store.dispatch(actions.getCurrentTagAsync(deployEnvSelectValue, value))
    }

    onBlur = (val) => {

        const {selected} = this.props.store.getState()
        if(!selected){ 
            this.props.store.dispatch(actions.updateState({
                selected: false,
                value: undefined,
                appTagContent: "请先选择应用",
                appTagList: [],
                currentTag: "请先选择应用",
                appTagvalue: undefined
            }))
        }
    }

    onFocus = () => {
    }

    onSearch = (val) => {
        this.props.store.dispatch(actions.updateState({selected: false}))
    }

    render(){
        const {appList} = this.props
        const {value} =  this.props.store.getState()
        return (
            <Select
            size="middle"
            showSearch
            placeholder='选择要发布的应用'
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
            value={value}
          >
              {appList.map((app, index) => (
                <Option value={app} key={index}>{app}</Option>
              ))}

          </Select>

        )
    }
}
