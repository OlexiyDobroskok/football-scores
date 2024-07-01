export class InvalidResponseDataException extends Error {
  constructor(message: string = 'Wrong data from the server') {
    super(message);
    this.name = 'InvalidResponseDataException';
    this.message = message;
  }
}

