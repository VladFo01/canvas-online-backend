const codes = new Map([
  [400, "Bad request. Try again"],
  [401, "Unauthorized. Please login and try again"],
  [404, "Not found"],
  [429, "Oops, something went wrong. Please try again later"],
  [500, "Server error"],
]);

class ResponseService {
  constructor() {
    this.codes = codes;
  }

  getCodeMessage(code) {
    if (this.codes.has(code)) {
      return this.codes.get(code);
    }
    throw new Error("Wrong code");
  }

  sendResponse(res, errorCode, message) {
    if (!message) {
      // eslint-disable-next-line no-param-reassign
      message = this.getCodeMessage(errorCode);
    }
    return res.status(errorCode).json({ message });
  }
}

module.exports = {
  responseService: new ResponseService(),
};
