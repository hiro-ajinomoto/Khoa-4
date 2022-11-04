import { call, put, select, takeLatest, delay } from "redux-saga/effects";
import { commentService } from "../../../services/CommentService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import {
  DELETE_COMMENT_SAGA,
  INSERT_COMMENT_SAGA,
  RESET_UPDATING_COMMENT,
  UPDATE_COMMENT_SAGA
} from "../../constants/Cyberbugs/CommentConstants";
import { GET_TASK_DETAIL_SAGA } from "../../constants/Cyberbugs/TaskConstants";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

function* insertCommentSaga(action) {
  //   yield put({
  //     type: DISPLAY_LOADING
  //   });
  //   yield delay(2000);

  try {
    const { data, status } = yield call(() =>
      commentService.insertCommentService(action.commentDetail)
    );

    if (status === STATUS_CODE.SUCCESS) {
      const { taskDetailModal } = yield select((state) => state.TaskReducer);

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskDetailModal.taskId
      });
    }
  } catch (err) {
    console.log("errors", err.response?.data);
  }

  //   yield put({
  //     type: HIDE_LOADING
  //   });
}

export function* theoDoiInsertCommentSaga() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga);
}

function* deleteCommentSaga(action) {
  try {
    const { data, status } = yield call(() =>
      commentService.deleteCommentService(action.commentId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      const { taskDetailModal } = yield select((state) => state.TaskReducer);

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskDetailModal.taskId
      });
    }
  } catch (err) {
    console.log(err.response?.data);
  }
}

export function* theoDoiDeleteCommentSaga() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}

function* updateCommentSaga(action) {
  try {
    const { data, status } = yield call(() =>
      commentService.updateCommentService(
        action.commentId,
        action.newCommentContent
      )
    );

    if (status === STATUS_CODE.SUCCESS) {
      const { taskDetailModal } = yield select((state) => state.TaskReducer);

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskDetailModal.taskId
      });

      yield put({
        type: RESET_UPDATING_COMMENT
      });
    }
  } catch (err) {
    console.log(err.response?.data);
  }
}

export function* theoDoiUpdateCommentSaga() {
  yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga);
}
