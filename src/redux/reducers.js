import {
    UpdateState
} from './action-types'



const defaultValue = {
    // mainEnv: "getEnv",
    info: "",

    // operateEnv: "",
    deployEnvList: [],

    // currentDeployEnv: "",
    
    appList: [],

    selected: false,
    value: undefined,  // 应用值

    currentTag: "请先选择应用", // 当TAG值

    // tagSelected: false,
    appTagValue: undefined,    // 选择的TAG值
    appTagContent: "请先选择应用",

    appTagList: [],



    operateEnvSelectValue: undefined, // 操作环境值
    operateEnvList: [],

    deployEnvSelectValue: undefined, // 部署环境值
    deployEnvList: [],
    
}


export function counter(state=defaultValue, action) {

    let newState = JSON.parse(JSON.stringify(state)); // 深拷贝原先的state

    switch (action.type) {
        // case SwitchOnChange:
        //     newState = Object.assign(newState, action.data);
        // case RadioOnChange:
        //     newState = Object.assign(newState, action.data);
        // case SetOperateInfo:
        //     newState = Object.assign(newState, action.data);
        // case AppOnchangeSetState:
        //     newState = Object.assign(newState, action.data);
        // case AppOnSearchSetState:
        //     newState = Object.assign(newState, action.data);
        // case SetApp:
        //     newState = Object.assign(newState, action.data);
        // case SetCurrentTag:
        //     newState = Object.assign(newState, action.data);
        // case SetAppTag:
        //     newState = Object.assign(newState, action.data);
        // case SetAppTagList:
        //     newState = Object.assign(newState, action.data);
        // case TagOnSearchSetState:
        //     newState = Object.assign(newState, action.data);

        case UpdateState:
            newState = Object.assign(newState, action.data);
        // default:
        //     return newState
    }

    return newState
    
}