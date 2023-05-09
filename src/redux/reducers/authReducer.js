const initialStateLogin = {
  details: {},
};

export function authReducerLogin(state = initialStateLogin, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        details: action.payload.details,
      };

    default:
      return state;
  }
}
