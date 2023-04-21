import api from "./api";

export async function isLogged() {
  const usertoken = localStorage.getItem("token");

  try {
    if (usertoken === undefined || usertoken === null || usertoken === "") {
      window.location.replace("/login");
      return false;
    }
    const response = await api.post("/tokenverify");
    console.log(response);
    return true;
  } catch (error) {
    console.log(error);
    window.location.replace("/login");
    return false;
  }
}
