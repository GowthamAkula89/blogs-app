const httpStatus = require("http-status");
const userService = require('../services/auth.service');

const tokenService = require('../services/token.service');


const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

const register = catchAsync(async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        const token = await tokenService.generateAuthToken(user);
        res.status(httpStatus.CREATED).send({ user, token });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
    }
});

const login = catchAsync(async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUserWithEmailAndPassword(email, password);
        const token = await tokenService.generateAuthToken(user);
        res.status(httpStatus.OK).send({ user, token });
    } catch (error) {
        if (error.name === 'AuthenticationError') {
            return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Invalid email or password' });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
    }
});

module.exports = {
    register,
    login,
};
