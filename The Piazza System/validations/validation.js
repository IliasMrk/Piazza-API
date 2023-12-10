/** this file mapps to auth.js to ensure users are validated */
const joi = require('joi')

// creating a validation by requesting data while applying the joi requirements
const registerValidation = (data) =>{
    // creating a schema with the joi requirements to be checked
    const schemaValidation = joi.object({
        username:joi.string().required().min(3).max(256),
        email:joi.string().required().min(6).max(256).email(),
        password:joi.string().required().min(6).max(1024)
    })
    return schemaValidation.validate(data)
}

const loginValidation = (data) =>{
    // creating a schema with the joi requirements to be checked
    const schemaValidation = joi.object({
        email:joi.string().required().min(6).max(256).email(),
        password:joi.string().required().min(6).max(1024)
    })
    return schemaValidation.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation