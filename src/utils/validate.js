export const checkValidData = (email, password) => {

const isEmailValid =/^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(email);
const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
if(!isEmailValid)return "Email is not valid";
      if(!isPasswordValid)return "Password is not valid";
      return null;
};