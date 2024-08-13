const Users = require("../Model/Login-model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user_register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Checking existing user
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.send({ message: "User already registered!" }); // Return early to stop further execution
        }

        // Password hashing
        const saltRounds = 10; // Typically, a good number of rounds is 10
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(password, salt);

        //OTP regenerate
        const otp = Math.floor(Math.random() * 100000);
        let user = { name, email, password: hashPassword };

        //sign with jwt
        const activationToken = jwt.sign({ user, otp }, process.env.SECRET_KEY, {
            expiresIn: "5m"
        });

        res.status(200).send({ otp: `You otp is ${otp}`, activationToken: activationToken })

    } catch (error) {
        res.status(500).send({ error: error.message }); // Proper error handling
    }
}
const verify_user = async (req, res) => {
    const { otp, activationToken } = req.body;

    try {
        const verify = await jwt.verify(activationToken, process.env.SECRET_KEY)
        if (!verify) {
            res.send({ message: "OTP Expired" });
            return;
        }
        if (verify.otp !== otp) {
            res.send({ message: "Wrong OTP!" });
            return
        }
        await Users.create({
            name: verify.user.name,
            email: verify.user.email,
            password: verify.user.password,
        })
        res.status(200).send({ message: "User Registered Successfully!" })
    } catch (error) {
        res.status(500).send({ error: error.message }); // Proper error handling
    }
}

const user_login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(200).send({ message: "Invalid Email" })
        }

        const checkPassword = bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(200).send({ message: "Invalid Credentials" })
        }

        res.status(200).send({ message: "User Registered Successfully!" })
    } catch (error) {
        res.status(500).send({ error: error.message }); // Proper error handling
    }
}


module.exports = { user_register, verify_user, user_login }