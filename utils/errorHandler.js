const errorCodeGenerator = (errorStatus, errorMessage) => {

    const listMsg = errorMessage.toUpperCase().split(" ");

    var code = "";
    listMsg.forEach(element => {
        code += element[0];
    });

    return `${errorStatus}-${code}`;
}

exports.errorMsgHandler = (errorCode, errorStatus, errorMessage) => {
    return {
        errors: [
            {
                "code": errorStatus + "-" + errorCode,
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