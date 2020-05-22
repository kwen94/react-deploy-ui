import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import {counter} from './reducers'


// 生成store对象
const store = createStore(counter, applyMiddleware(thunk)) // 内部会第一次调用redux函数，得到初始state

export default store