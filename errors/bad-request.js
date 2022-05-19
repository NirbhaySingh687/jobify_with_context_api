import StatusCode from "http-status-codes";
import customAPIError from "./custom-api";

class BadRequestError extends customAPIError{
    constructor(message) {
        super(message);
        this.statusCode = StatusCode.BAD_REQUEST
    }
}

export default BadRequestError