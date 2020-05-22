import React from 'react'
import { Select } from 'antd';
import * as actions from '../../redux/actions'
import PubSub from 'pubsub-js' // 引入

const { Option } = Select;

export default class TagList extends React.Component {

    constructor(props) {
        super(props)
    }

    // componentDidMount() {
    //     this.props.onRef(this)
    // }

    onChange = (value) => {
        this.props.store.dispatch(actions.updateState({
            // tagSelected: true,
            appTagValue: value
        }))
        this.props.onChange(value)
    }

    // onBlur = (val) => {

    //     if(!this.state.seleted){
    //         console.log('清除输入框选中项')
    //         this.setState({value: undefined})
    //         this.props.onChange(undefined)
    //     }
    // }

    // onBlur = (val) => {

    //     const {tagSelected} = this.props.store.getState()
    //     if(!tagSelected){ 
    //         this.props.store.dispatch(actions.updateState({
    //             tagSelected: false,
    //             appTagvalue: undefined
    //         }))

    //         // this.props.onChange(undefined)
    //     }
    // }

    onSearch = (val) => {
        // this.props.store.dispatch(actions.updateState({tagSelected: false}))
    }

    componentDidMount(){
        PubSub.subscribe('tagListOnChange', (e, data) => {
            this.props.onChange(data)
        }) // 订阅
    }

    render(){
        const {appTagValue, appTagList, appTagContent} = this.props.store.getState()
        return (
            <Select
            size="middle"
            showSearch
            placeholder={appTagContent}
            style={{ width: 350 }}
            optionFilterProp="children"
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onSearch={this.onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            value={appTagValue}
          >
              {appTagList.map((tag, index) => (
                  <Option value={tag} key={index}>{tag}</Option>
              ))}
          </Select>
        )
    }
}
