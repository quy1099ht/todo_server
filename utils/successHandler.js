exports.successJsonFormat = (status,data,message) => {
    return {
        status : status,
        data : data,
        message : `${message}.`
    }
}