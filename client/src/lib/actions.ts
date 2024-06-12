import { API_URL } from "@/constants/constants";

interface FormDataJSON {
  email: string;
  password: string;
}

async function getUser() {
  try {
    const res = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    console.log(res);
    // console.log("req headers", request.headers);
    // console.log("req cookies", request.cookies);
    return data;
  } catch (e) {
    console.log(e);
  }
}

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
