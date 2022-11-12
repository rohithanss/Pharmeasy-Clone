function signupForm() {
  return `        <div class="header">
    <h1><i id="close-overLay-box" class="fa-solid fa-xmark"></i></h1>
    <div>
      <img src="images/logo-white.png" alt="" />
      <h1>MARS Pharmacy</h1>
    </div>
  </div>
  <h1 class="heading">Sign Up</h1>
  <form action="">
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Enter your full name"
    />
    <input
      type="text"
      name="username"
      id="username"
      placeholder="Create a unique username"
    />
    <input
      type="email"
      name="email"
      id="email"
      placeholder="Enter your E-mail"
    />
    <input
      type="number"
      name="mobile"
      id="mobile"
      placeholder="Enter your mobile number"
    />
    <div id="pass_div">
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Create your password"
      />
      <i class="fa-solid fa-eye-slash"></i>
    </div>
    <input type="submit" name="submit" id="sign-up" value="SIGN UP" />
  </form>`;
}

function loginForm() {
  return `<div class="header">
    <h1><i id="close-overLay-box" class="fa-solid fa-xmark"></i></h1>
    <div>
      <img src="images/logo-white.png" alt="" />
      <h1>MARS Pharmacy</h1>
    </div>
  </div>
  <h1 class="heading">Log In</h1>
  <form action="">
    <input
      type="text"
      name="username"
      id="username"
      placeholder="Enter username"
    />

    <div id="pass_div">
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter password"
      />
      <i class="fa-solid fa-eye-slash"></i>
    </div>
    <input type="submit" name="submit" id="log-in" value="LOG IN" />
  </form>`;
}
export { signupForm, loginForm };
