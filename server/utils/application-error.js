class ApplicationError extends Error {
  static NotUnique = () => new ApplicationError(2, 409, 'Element is not unique');
  static NotFound = () => new ApplicationError(3, 404, 'Element not found');
  static NotCreated = () => new ApplicationError(4, 400, 'Element not created');
  static NoAuthHeader = () => new ApplicationError(9, 403, 'Authorization header not specified');
  static BadUserToken = () => new ApplicationError(20, 401, 'Bad token');
  static InvalidCredentials = () => new ApplicationError(5, 401, 'Invalid credentials');
  static RequiredAttributes = () => new ApplicationError(6, 400, 'Required attributes not specified');
  static JsonValidation = (message) => new ApplicationError(11, 422, `JSON is bad: ${message}`);
  static AlreadyExists = () => new ApplicationError(25, 409, 'Already exists');
  static NoPermission = () => new ApplicationError(8, 403, 'No permission to perform action with that access level');
  static WrongPassword = () => new ApplicationError(30, 403, 'Wrong password');
  static TransactionError = (errors) => new ApplicationError(31, 403, `Transaction error. Errors: ${errors}`);
  static ManagerNotFound = () => new ApplicationError(32, 404, `Manager not found`);
  static DotRestrictionError = () => new ApplicationError(33, 404, `Polkadot needs password to estimate transaction fees`);
  static AdaRestrictionError = () => new ApplicationError(34, 404, `Cardano minimum transaction is 1 ADA`);
  static AdminTokenNotFound = () => new ApplicationError(35, 401, 'Admin token not found');
  static UsernameError = () => new ApplicationError(36, 409, 'Username must contain from 8 to 35 digits and letters');


  static CryptowalletError = (message) => new ApplicationError(99, 409, `Blockchain fired an error. ${message}`);


  constructor(code, httpStatusCode, message) {
    super();
    this.code = code;
    this.httpStatusCode = httpStatusCode;
    this.message = message;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApplicationError;
