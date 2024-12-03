import api from "./api";

export async function register(username, password) {
  return await api.post("/register", { username, password });
}

export async function login(username, password) {
  return await api.post(
    "/login",
    { username, password },
    {
      withCredentials: true,
    }
  );
}

export async function authStatus() {
  return await api.get("/status", { withCredentials: true });
}

export async function logout() {
  return await api.post(
    "/logout",
    {},
    {
      withCredentials: true,
    }
  );
}

export async function setup2FA() {
  return await api.post(
    "/2fa/setup",
    {},
    {
      withCredentials: true,
    }
  );
}

export async function verify2FA(token) {
  return await api.post(
    "/2fa/verify",
    { token },
    {
      withCredentials: true,
    }
  );
}

export async function reset2FA() {
  return await api.post(
    "/2fa/reset",
    {},
    {
      withCredentials: true,
    }
  );
}
