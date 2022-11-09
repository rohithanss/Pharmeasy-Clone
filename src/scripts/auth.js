const api = "http://localhost:1010";

async function signup(username, full_name, email, mobile, password) {
  // user/client signup function will go here
  let ls_cart = JSON.parse(localStorage.getItem("ls_cart")) || [];
  let sendData = {
    id: username,
    full_name,
    mobile,
    email,
    password,
    cart: ls_cart,
    orders: [],
  };
  try {
    let userExist = await fetch(`${api}/user/${username}`);
    userExist = await userExist.json();
    if (userExist.id != undefined) {
      return { message: "User already exists!", status: "error" };
    }
    let res = await fetch(`${api}/user`, {
      method: "POST",
      body: JSON.stringify(sendData),
      headers: {
        "content-type": "application/json",
      },
    });
    res = await res.json();
    return { status: "success", details: res, message: "Sign up successful!" };
  } catch (err) {
    console.log(err);
    return {
      status: "error",
      message: "Some error occurred, while fetching User details!",
    };
  }
}
async function login(type, username, password) {
  let url = `${api}/${type}/${username}`;
  try {
    let res = await fetch(url);
    res = await res.json();
    if (res.id != undefined) {
      if (res.password == password) {
        return {
          status: "success",
          message: "Login success",
          details: res,
        };
      } else {
        return {
          status: "fail",
          message: "Incorrect password",
        };
      }
    } else {
      return {
        status: "fail",
        message: "Incorrect username",
      };
    }
  } catch (err) {
    return {
      status: "error",
      message: "Some error occurred, while fetching User details!",
    };
  }
}

export { signup, login };
