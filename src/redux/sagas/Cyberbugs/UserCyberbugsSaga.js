import Axios from "axios";
import {
  call,
  delay,
  fork,
  take,
  takeEvery,
  takeLatest,
  put,
  select
} from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import {
  SIGN_UP_SAGA,
  USER_SIGNIN_API,
  USLOGIN
} from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN
} from "../../../util/constants/settingSystem";

import { history } from "../../../util/history";
import { userService } from "../../../services/UserService";
import {
  ADD_USER_SAGA,
  DELETE_USER_SAGA,
  EDIT_USER_SAGA,
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_SAGA
} from "../../constants/Cyberbugs/UserConstatnts";

//Quản lý các action saga
function* signinSaga(action) {
  // console.log(action);
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  //Gọi api
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.signinCyberBugs(action.userLogin)
    );

    //Lưu vào localstorage khi đăng nhập thành công
    localStorage.setItem(TOKEN, data.content.accessToken);

    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: USLOGIN,
      userLogin: data.content
    });

    // let history = yield select(state=> state.HistoryReducer.history)

    history.push("/home");
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING
  });
}

export function* theoDoiSignin() {
  yield takeLatest(USER_SIGNIN_API, signinSaga);
}

//Quản lý các action saga
function* getUserSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.getUser(action.keyword)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_USER_SEARCH",
        lstUserSearch: data.content
      });
    }
  } catch (err) {
    console.log(err.response?.data);
  }
}

export function* theoDoiGetUser() {
  yield takeLatest("GET_USER_API", getUserSaga);
}

//Quản lý các action saga
function* addUserProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.assignUserProject(action.userProject)
    );

    yield put({
      type: "GET_LIST_PROJECT_SAGA"
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiAddUserProject() {
  yield takeLatest("ADD_USER_PROJECT_API", addUserProjectSaga);
}

//Quản lý các action saga
function* removeUserProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.deleteUserFromProject(action.userProject)
    );

    yield put({
      type: "GET_LIST_PROJECT_SAGA"
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiRemoveUserProject() {
  yield takeLatest("REMOVE_USER_PROJECT_API", removeUserProjectSaga);
}

function* getUserByProjectIdSaga(action) {
  const { idProject } = action;
  console.log("action", idProject);

  try {
    const { data, status } = yield call(() =>
      userService.getUserByProjectId(idProject)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: data.content
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
    if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: []
      });
    }
  }
}
export function* theoDoiGetUserByProjectIdSaga() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}

function* SignUpSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.signUpService(action.userInfo)
    );

    if (status === STATUS_CODE.SUCCESS) {
      alert("Tạo tài khoản thành công");
      history.push("/login");
    }
  } catch (err) {
    alert(err.response.data);
  }
}

export function* theoDoiSignUpSaga() {
  yield takeLatest(SIGN_UP_SAGA, SignUpSaga);
}

function* deleteUserSaga(action) {
  try {
    let confirm = window.confirm("Bạn thực sự muốn xoá người dùng này?");
    if (confirm) {
      const { data, status } = yield call(() =>
        userService.deleteUser(action.userId)
      );

      if (status === STATUS_CODE.SUCCESS) {
        alert("Xóa người dùng thành công");

        yield put({
          type: "GET_USER_API",
          keyword: ""
        });
      }
    }
  } catch (err) {
    alert(err.response?.data.content);
  }
}

export function* theoDoiDeleteUserSaga() {
  yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
}

function* editUserSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.editUser(action.editingUserInfo)
    );

    if (status === STATUS_CODE.SUCCESS) {
      alert("Chỉnh sửa người dùng thành công");
      history.goBack();
    }
  } catch (err) {
    alert(err.response?.data);
    // console.log("err", err.response?.data);
  }
}

export function* theoDoiEditUserSaga() {
  yield takeLatest(EDIT_USER_SAGA, editUserSaga);
}

function* addUserSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.signUpService(action.userInfo)
    );

    if (status === STATUS_CODE.SUCCESS) {
      alert("Thêm tài khoản thành công");
      window.location.reload();
    }
  } catch (err) {
    alert(err.response?.data);
  }
}

export function* theoDoiAddUserSaga() {
  yield takeLatest(ADD_USER_SAGA, addUserSaga);
}
