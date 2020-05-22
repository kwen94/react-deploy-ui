import React from 'react'
import { Tag } from 'antd';
import * as actions from '../../redux/actions'



export default class MyTag extends React.Component {


    render(){
        const {currentTag} = this.props.store.getState()
        return (
            <Tag color="green">{currentTag}</Tag>
        )
    }
}