const errorCatcher = (asyncFn) => {
    return (req, res, next) => {
        asyncFn(req, res, next).catch((err) => {
            res,status
        });
    }
}

exports.module = errorCatcher;