import {GET_SACCOS, GET_SACCO_MEMBERS, GET_SACCO_PROFILE} from '../actionTypes'

export const fetchSaccos = () => ({
    type: GET_SACCOS
})

export const fetchMembers = () => ({
    type: GET_SACCO_MEMBERS
})

