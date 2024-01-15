import { getBackendUrl } from "getBackendUrl";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const backendUrl = getBackendUrl();

export const useToken = () => {
  const token = useSelector((state) => state.token);

  useEffect(() => {
    console.log("Token changed: " + token);
    return () => {};
  }, [token]);

  return token;
};
