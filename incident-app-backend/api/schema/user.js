import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import constants from "../../constants.js";
const userSchema = {
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: constants.role,
        required: true
    },
    password: {
        type: String,
        required: true
    },
};

// userSchema.methods.generateAuthToken = generateAuthToken() {
// 	const token = jwt.sign({
// 		_id: this._id
// 	}, "azbycx192837", {
// 		expiresIn: "7d",
// 	});
// 	return token;
// };

export const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"), 
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

export const login_validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		password: passwordComplexity().required().label("Password")
	});
	return schema.validate(data);
};

export default userSchema;