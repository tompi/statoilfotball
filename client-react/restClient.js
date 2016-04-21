var me = {};

function getJson(url, next, body) {
  var reqParams = {
    "credentials": "same-origin"
  };
  if (body) {
    reqParams.method = "POST";
    reqParams.body = JSON.stringify(body);
    reqParams.headers = new Headers({
        "Content-Type": 'application/json'
      });
  }
  fetch(url,reqParams)
    .then(function(response) {
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

me.changeStatus = function(newStatus, next) {
  getJson('/event/changeStatus', next, newStatus);
};

export default me;
