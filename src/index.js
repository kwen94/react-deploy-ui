import React from 'react'
import { Row, Col, Button, Input, Radio, Form } from 'antd'
import ReactDom from 'react-dom'
import store from './redux/store'

import MyForm from './components/app/appForm'

function render() {
  ReactDom.render(
    (
      <>
        <Row gutter={[20, 50]}>
          <Col span={12}></Col>
          <Col span={12}></Col>
        </Row>
  
        <Row gutter={[20, 0]}>
          <Col span={6}></Col>
          <Col span={12}><MyForm store={store} /></Col>
          <Col span={6}></Col>
        </Row>
      </>
    )
    , document.getElementById('root'))
}

render()

store.subscribe(render)

