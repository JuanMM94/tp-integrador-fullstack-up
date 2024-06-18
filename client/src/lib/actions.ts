import { API_URL, JWT_SECRET } from "@/constants/constants";
import { jwtVerify } from "jose";

interface FormDataJSON {
  email: string;
  password: string;
}

export const joseVerify = async (jwt: string | undefined) => {
  if (!jwt) return null;

  try {
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(jwt, secretKey);
    return payload;
  } catch (error) {
    console.log("joseVerify", error);
  }
};

export const login = async (formData: FormDataJSON) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include" as RequestCredentials,
  };

  try {
    const res = await fetch(`${API_URL}/auth/login`, options);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const register = async (formData: FormDataJSON) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  try {
    const res = await fetch(`${API_URL}/auth/signup`, options);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const logout = async () => {
  const options = {
    method: "GET",
    credentials: "include" as RequestCredentials,
  };

  try {
    return await fetch(`${API_URL}/auth/logout`, options);
  } catch (error) {
    console.error(error);
  }
};
