import StatusCode from "http-status-codes";
import customAPIError from "./custom-api";

class NotFoundError extends customAPIError{
    constructor(message) {
        super(message);
        this.statusCode = StatusCode.NOT_FOUND
    }
}

export default NotFoundError