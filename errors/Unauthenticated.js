import StatusCode from "http-status-codes";
import customAPIError from "./custom-api";

class UnAuthenticatedError extends customAPIError{
    constructor(message) {
        super(message);
        this.statusCode = StatusCode.UNAUTHORIZED
    }
}

export default UnAuthenticatedError