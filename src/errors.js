export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class InvalidUserError extends Error{
  errorCode="U002";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class NoReviewError extends Error{
  errorCode="R001";
  constructor(reason) {
    super(reason);
    this.reason = reason;
  }
}

export class InternalServerError extends Error{
  errorCode = "S001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class ShopError extends Error{
  errorCode = "S002";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class InvalidInputError extends Error {
  errorCode = "I001"
  constructor(reason) {
    super(reason);
    this.reason = reason
  }
}