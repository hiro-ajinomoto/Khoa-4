import {
  RESET_UPDATING_COMMENT,
  SET_UPDATING_COMMENT
} from "../constants/Cyberbugs/CommentConstants";

const initialState = {
  updatingComment: {}
};

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_UPDATING_COMMENT:
      return { ...state, updatingComment: action.updatingComment };

    case RESET_UPDATING_COMMENT:
      return { ...state, updatingComment: {} };

    default:
      return { ...state };
  }
};

export default CommentReducer;
