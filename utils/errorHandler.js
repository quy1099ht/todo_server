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
        case 400:
            errorCode = `${errorStatus}-${errorCode[4]}:EXISTED`
            break;
    }
    return {
        errors: [
            {
                "code": errorCode,
                "message": `${errorMessage}.`,
                "status": errorStatus
            }
        ]
    }

}

exports.errorMsgGenerator = (errorStatus, errorMessage) => {
    return {
        "code": errorCodeGenerator(errorStatus, errorMessage),
        "message": `${errorMessage}.`,
        "status": errorStatus
    }
}

exports.setOneErrMsg = (req, next, errStatus, errMsg) => {
    req.status = errStatus;
    req.errCode = errorCodeGenerator(errStatus,errMsg);
    req.message = `${errMsg}`;
    return next();
}