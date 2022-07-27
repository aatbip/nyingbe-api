const success = (data) => {
  return {
    status: "success",
    data: data,
  };
};

const failure = (msg) => {
  return {
    status: "failure",
    message: msg,
  };
};

module.exports = {
  success,
  failure,
};
