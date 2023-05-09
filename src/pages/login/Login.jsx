import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import apiClient from "../../http/http-common";
import { loginSuccess } from "../../redux/actions/auth";
import { toastMessage } from "../../utilities/commons";
import styles from "./login.module.css";

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const mutation = useMutation((payload) => {
    return apiClient
      .post("/admin/login", payload)
      .then((res) => {
        if (res?.data?.success) {
          localStorage.setItem("token", res?.data?.data?.token);
          dispatch(loginSuccess(res?.data?.data));
          history.push("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        toastMessage(error?.response?.data?.message, "error");
      });
  });

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setLoginInput((prev) => ({ ...prev, [name]: value }));
  };

  const submitLogin = async () => {
    mutation.mutateAsync(loginInput);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card_group}>
        <div className={styles.card}>
          <form>
            <h1 className={styles.title}>Login</h1>
            <p className={styles.text_medium_emphasis}>
              Sign In to your account
            </p>
            <div className={styles.input_group}>
              <span>@</span>
              <input
                onChange={handleLogin}
                value={loginInput?.email}
                name="email"
                placeholder="Email"
                autoComplete="email"
                className={styles.input_field}
              />
            </div>
            <div className={styles.input_group}>
              <span>🔒</span>
              <input
                onChange={handleLogin}
                value={loginInput?.password}
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                className={styles.input_field}
              />
            </div>
            <div className={styles.button_row}>
              <button
                className={styles.btn}
                onClick={submitLogin}
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
