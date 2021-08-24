import {GET_SACCOS, GET_SACCO_MEMBERS, GET_SACCO_PROFILE} from '../actionTypes'

const INIT_STATE = {
    saccos: [],
    sacco_profile:{},
    members:[]
};

export default (state = INIT_STATE, action) => {

    switch (action.type) {

        case GET_SACCOS:
            return { ...state, saccos: action.payload };

        case GET_SACCO_MEMBERS:
            return { ...state, members: action.payload };
            
        case GET_SACCO_PROFILE:
            return { ...state, saccos_profile: action.payload };
        default:
            return state;
    }
}