import StatusCode from "http-status-codes";

const notFoundMiddleware = (req, res) => {
    const defaultError = {
        statusCode: StatusCode.NOT_FOUND,
        msg: "Route does not exists"
    }
    res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}

export default notFoundMiddleware