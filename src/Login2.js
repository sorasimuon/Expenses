import React from "react";
import axios from "./apis/axiosUsers";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./features/userSlice";

function Login2() {
  const history = useHistory();
  const dispatch = useDispatch();

  const signIn = async (e) => {
    e.preventDefault();

    const credentials = {
      email: "test@email.com",
      password: "doudoushi",
    };

    const response = await axios({
      method: "post",
      url: "/signin",
      data: credentials,
    });
    if (!response.error) {
      console.log("Perfect");
      dispatch(setUser(response.data));
      history.push("/Expenses/wallet");
    }
  };
  return (
    <div>
      <button onClick={(e) => signIn(e)}> Connect</button>
    </div>
  );
}

export default Login2;
