import React from 'react'
import Axios from 'axios'
import {
        UpdateState
    } from './action-types'

import PubSub from 'pubsub-js' // 引入



import { notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons';


export const updateState = (obj) => ({type: UpdateState, data: obj})


export const setOperateInfoAsync = () => {
    return dispatch => {
        const getOperateUrl = '/api/v1/deploy/getOperate'
        Axios.get(getOperateUrl).then(
                repsonse => {
                    const result = repsonse.data
                    // 得到数据
                    const operateEnvSelectValue = result.data.current_operate
                    // 更新状态
                    const envList = result.data.operate_info[operateEnvSelectValue].env_list

                    dispatch(updateState({
                        operateEnvSelectValue: operateEnvSelectValue,
                        operateEnvList: Object.keys(result.data.operate_info),
                    
                        deployEnvList: Object.keys(envList),
                        info: result.data.operate_info, 

                      }))

                      PubSub.publish('operateEnvOnChange', operateEnvSelectValue) // 发布消息
              })
            .catch((error) => {
                notification.open({
                    message: '错误提示',
                    description:
                    error.message,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                  })
                  dispatch(updateState({
                    switchDisable: true,
                    mainEnv: ""
                  }))
            })
    }
}


export const getCurrentTagAsync = (deploy_env, app) => {
    return dispatch => {
        dispatch(updateState({currentTag: "加载中"}))
        const getOperateUrl = `/api/v1/deploy/getCurrenttag?deploy_env=${deploy_env}&app=${app}`
        Axios.get(getOperateUrl).then(
                repsonse => {
                    const result = repsonse.data
                    // 得到数据
                    const currentTag = result.data
                    // 更新状态

                    dispatch(updateState({
                        currentTag: currentTag
                        }))
                })
            .catch((error) => {
                notification.open({
                    message: '错误提示',
                    description:
                    error.message,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    })
                    
            })
    }
}


export const setAppTagListAsync = (app) => {
    return dispatch => {
        const getOperateUrl = `/api/v1/deploy/getTagList?app=${app}`
        Axios.get(getOperateUrl).then(
                repsonse => {
                    const result = repsonse.data
                    // 得到数据
                    const appTagList = result.data
                    let tagValidateStatus = ''
                    let tagErrorMsg = ''
                    let appTagValue = ""
                    // 更新状态
                    if(appTagList.length>=1){
                        appTagValue = appTagList[0]
                        // tagValidateStatus = 'success'
                        // tagErrorMsg = null
                        PubSub.publish('tagListOnChange', appTagValue) // 发布消息
                    } else {
                        appTagValue = undefined
                        tagValidateStatus = 'error'
                        tagErrorMsg = "未获取到TAG"
                    }
                    dispatch(updateState({
                        appTagList: appTagList,
                        appTagContent: "加载成功",
                        appTagValue: appTagValue,
                        // tagValidateStatus: tagValidateStatus,
                        // tagErrorMsg: tagErrorMsg
                        }))
                })
            .catch((error) => {
                notification.open({
                    message: '错误提示',
                    description:
                    error.message,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    })
                    
            })
    }
}

