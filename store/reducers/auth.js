import { AUTHENTICATE } from "../actions/auth";

const initialeState = {
  token: null,
  userId: null,
};

export default (state = initialeState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };

    default:
      return state;
  }
};
