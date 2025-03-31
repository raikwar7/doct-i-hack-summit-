import { atom } from "recoil";
// import {recoilPersist} from "recoil-persist"

// const persistAtom = recoilPersist({
//   key: "myApp",
//   storage: sessionStorage
// });

export const isLoginIn = atom({
  key: "isLogin",
  default: false,
});

export const userRecoil = atom({
  key: "userRecoil",
  default: "Admin",
});

export const userId = atom({
  key: "userId",
  default: "67e9104e5870d72aca94e97d",
});

// const localStorageEffect = (key) => ({ setSelf, onSet }) => {
//   const savedValue = localStorage.getItem(key);
  
//   if (savedValue != null) {
//     setSelf(JSON.parse(savedValue));  // Load saved state
//   }

//   onSet((newValue) => {
//     localStorage.setItem(key, JSON.stringify(newValue));  // Save new state
//   });
// };

export const booking = atom({
  key: "booking",
  default: [],
  // effects: [localStorageEffect('bookingState')],
});

const appointments= atom({
  key: "appointments",
  default: []
})

const allBooking= atom({
  key: "allBooking",
  default: []
})

const Atoms = {
  isLoginIn,
  userRecoil,
  userId,
  booking,
  appointments,
  allBooking
};

export default Atoms;
