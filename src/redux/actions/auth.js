export const loginSuccess = (details) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: {
      details,
    },
  };
};
