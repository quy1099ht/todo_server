const errorCodeGenerator = (errorStatus, errorMessage) => {

    const listMsg = errorMessage.toUpperCase().split(" ");

    var code = "";
    listMsg.forEach(element => {
        code += element[0];
    });

    return `${errorStatus}-${code}`;
}

exports.errorMsgHandler = (errorCode, errorStatus, errorMessage) => {
    switch (errorStatus) {
        case 409:
            errorCode = `${errorStatus}-${errorCode[4]}:EXISTED`
            break;
    }
    return {
        "status": errorStatus,
        errors: [
            {
                "code": errorCodeGenerator(errorStatus, errorMessage),
                "description": `${errorMessage}.`,
            }
        ]
    }

}

exports.errorMsgGenerator = (errorStatus, errorMessage) => {
    return {
        "code": errorCodeGenerator(errorStatus, errorMessage),
        "descriprion": `${errorMessage}.`
    }
}

exports.setOneErrMsg = (req, next, errStatus, errMsg) => {
    req.status = errStatus;
    req.errCode = errorCodeGenerator(errStatus, errMsg);
    req.message = `${errMsg}`;
    return next();
}

exports.badRequestErr = (req, next) => {
    return this.setOneErrMsg(req, next, 400, "BAD_REQUEST");
}