import {call,put, takeLatest} from "redux-saga/effects";
import { fetchSaccosApi } from "../../api";
import {GET_SACCO_PROFILE, GET_SACCOS, GET_SACCO_MEMBERS } from "../../redux/actionTypes";
import { fetchProducts,getSingleItem } from "../../redux/ecommerce/product/action";
import { fetchMembers, fetchSaccos } from "./action";

function* fetchSaccosAsyn() {
    try {
        const saccos = yield call(fetchSaccosApi);
        yield put(fetchSaccos(saccos.data)); 
    } catch (error) {
        console.log("Error", error)
    }

    // yield put(f());
}

export function* WatcherSaccos() {
    yield takeLatest(GET_SACCOS,fetchSaccosAsyn)
    yield takeLatest(GET_SACCO_MEMBERS,fetchMembers())
}