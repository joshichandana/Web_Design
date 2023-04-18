import mongoose from 'mongoose';
const { Schema } = mongoose;
// create schema for toen email verify
const tokenSchema = new mongoose.Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "userSchema",
		unique: true,
	},
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
});

export default tokenSchema;