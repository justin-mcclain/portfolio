const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "First name is required."],
        },
        lastname: {
            type: String,
            required: [true, "Last name is required."],
        },
        email: {
            type: String,
            required: [true, "Email is required."],
            validate: {
                validator: (val) => /^([\w-\.]+@([\w]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email address.",
            },
        },
        password: {
            type: String,
            required: [true, "Password is required."],
            validate:{
                validator: (val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val),
                message: "Password requires: minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
            }
        },
    },
    { timestamps: true }
);

UserSchema.virtual('confirm')
    .get( () => this._confirm)
    .set ( value => this._confirm = value);

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirm) {
        this.invalidate('confirmPassword', 'Passwords must match.');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model ('User', UserSchema);