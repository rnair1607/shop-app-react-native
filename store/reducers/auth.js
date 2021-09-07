import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialeState = {
  token: null,
  userId: null,
};

export default (state = initialeState, action) => {
  switch (action.type) {
    case LOGOUT:
      return state;

    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };

    default:
      return state;
  }
};
