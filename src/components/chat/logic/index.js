import { combineReducers } from "redux";
import { all } from 'redux-saga/effects';
import send, { sendSaga } from './send';
import messageList, { messageListSaga } from "./messageList";

const rootReducer = combineReducers(
    {
        send,
        messageList,
    },
);

export default function* rootSaga() {
    yield all([
        sendSaga(),
        messageListSaga(),
    ]);
}