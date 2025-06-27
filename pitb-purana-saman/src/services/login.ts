import { LoginPayload, LoginResponse } from "../commonTypes/user";


export async function loginUser(payload: LoginPayload): Promise<LoginResponse | null> {
  try {
    const response = await fetch("http://localhost:5154/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error("Login failed:", response.status, response.statusText);
      return null;
    }

    const data: any = await response.json();
    
    return {
      token: data.token,
      userid: data.user.id,
      username: data.user.username,
      userrole: data.user.role
    };
    

  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

export async function createUser(payload: LoginPayload): Promise<any> {
  const token = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth")!).token
    : "";

  const response = await fetch("http://localhost:5154/v1/users", {
    method: "POST",
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to create user: ${err}`);
  }

  return response.text(); // or JSON if API returns JSON
}

