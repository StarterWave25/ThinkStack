const respond = (res, OK, code, data = {}, error = {}) => {
    res.status(code).json({ OK, data, error });
};

module.exports = respond;
