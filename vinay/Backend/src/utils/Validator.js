const validator = require('validator');

const validate = (data) => {
    const mandatoryFields = ['firstName', 'password', 'Email'];

    const isAllowed = mandatoryFields.every((field) => Object.keys(data).includes(field));
    if (!isAllowed) {
        throw new Error("Field missing");
    }

    if (!validator.isEmail(data.Email)) {
        throw new Error("Invalid Email");
    }

    if (!validator.isStrongPassword(data.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })) {
        throw new Error("Weak password. Must include uppercase, lowercase, number, symbol, and be at least 8 characters.");
    }
};

module.exports = validate;
