import { atom } from "recoil";

export const isLoginIn = atom({
  key: "isLogin",
  default: false,
});

export const userRecoil = atom({
  key: "userRecoil",
  default: "",
});

export const userId = atom({
  key: "userId",
  default: "",
});

export const booking = atom({
  key: "booking",
  default: [],
});

const appointments= atom({
  key: "appointments",
  default: []
})

const Atoms = {
  isLoginIn,
  userRecoil,
  userId,
  booking,
  appointments
};

export default Atoms;
