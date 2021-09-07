import { store } from "../store/index";

export const adminGuard = (to, from, next) => {
  if (store.state.dbUser === undefined) {
    return next("/login");
  } else {
    if (store.state.dbUser.admin === true) {
      return next();
    } else {
      return next("/");
    }
  }
};

export const authGuard = (to, from, next) => {
  if (store.state.dbUser !== undefined) {
    return next();
  } else {
    return next("/login");
  }
};
