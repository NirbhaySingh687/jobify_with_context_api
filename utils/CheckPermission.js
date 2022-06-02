import { UnAuthenticatedError } from "../errors"

const checkPermission = (requestUser, resourceUserId) =>{
    if(requestUser.userId === resourceUserId.toString()) return;
    throw new UnAuthenticatedError("Not authorized to access this route")
}

export default checkPermission