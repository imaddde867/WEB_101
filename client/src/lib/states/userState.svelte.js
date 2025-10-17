let user = $state(null);

export const userState = {
  get user() {
    return user;
  },
  set user(value) {
    user = value;
  }
};
