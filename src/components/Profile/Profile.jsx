import React, { useContext, useEffect } from "react";
import style from "./Profile.module.css";
import jwtDecode from "jwt-decode";
import { Helmet } from "react-helmet";
import { userContext } from "../../context/UserContext";
export default function Profile() {
  let { userData } = useContext(userContext);
  let encodedToken = localStorage.getItem("userToken");
  let decodedToken = jwtDecode(encodedToken);
  console.log(decodedToken);
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <h1>{decodedToken?.name}</h1>
    </>
  );
}
