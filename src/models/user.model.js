const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    let user = this;

    if (!user.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt();

    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
});

userSchema.methods.comparePassword = async function (password) {
    const user = this;

    return bcrypt.compare(password, user.password).catch((e) => false);
};

const User = mongoose.model("user", userSchema);
module.exports = User;
