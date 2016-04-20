var me = {};

function getJson(url, next) {
  fetch(url,{
      credentials: "same-origin"
    })
    .then((response) => {
      response.json()
        .then(next);
    });
}

me.getNextEvent = (next) => {
  getJson('/event/next', next);
};

me.getAccount = (next) => {
  getJson('/auth/account', next);
};

me.logout = (next) => {
  getJson('/auth/logout', next);
};

export default me;
