const express = require("express")
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const User = require("../model/user");

const JWT_SECRET = 'TopSecret';



exports.users_post_register = async (req, res) => {
    // console.log(req.body)

    // Hashing of password
    const { username, email, phone, parent_phone, address, password: plainTextPassword, exam } = req.body

    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Name is required' })
    }

    if (!email || typeof email !== 'string') {
        return res.json({ status: 'error', error: 'Email is required' })
    }

    if (!validator.isEmail(email)) {
        return res.json({ status: 'error', error: 'Wrong email' })
    }

    if (!phone || typeof phone !== 'string') {
        return res.json({ status: 'error', error: 'Phone no. is required' })
    }

    if (!parent_phone || typeof phone !== 'string') {
        return res.json({ status: 'error', error: 'Parents phone no. is required' })
    }

    if (!address || typeof address !== 'string') {
        return res.json({ status: 'error', error: 'Address is required' })
    }


    if (phone.length !== 10) {
        return res.json({ status: 'error', error: 'Wrong phone no.' })
    }

    if (parent_phone.length !== 10) {
        return res.json({ status: 'error', error: 'Wrong phone no.' })
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Password is required' })
    }

    if (plainTextPassword.length < 7) {
        return res.json({ status: 'error', error: 'Password too small. Should be atleast 8 characters' })
    }

    if (!exam || typeof exam !== 'string') {
        return res.json({ status: 'error', error: 'Exam is required' })
    }


    const password = await bcrypt.hash(plainTextPassword, 10)

    // console.log(await bcrypt.hash(password, 10))

    try {
        const response = await User.create({
            username,
            email,
            phone,
            parent_phone,
            address,
            password,
            exam
        })
        console.log('User created successfully: ', response)
    } catch (error) {
        // console.log(JSON.stringify(error))
        if (error.code === 11000) {
            // duplicate key 
            return res.json({ status: 'error', error: error.message })
        }
        throw error
    }


    res.json({ status: 'ok' })
}


exports.verifyEmail = async (req, res) => {
    try {
        const { code } = req.body
        // const phone = req.params.phone;
        userData = await User.findOne({ phone : req.userData.phone })
        if (code == "123456") {
            res.status(200).json({
                emailVerified: "true"
            })
        }
        else {
            res.status(400).json({
                emailVerified: "false",
                message: "Something went wrong.!"

            })

        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

};


exports.users_post_login = async (req, res) => {
    // console.log(req.body)
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email }).lean()


        if (!user) {
            return res.json({ status: 'error', error: 'Invalid email/password' })
        }

        if (await bcrypt.compare(password, user.password)) {
            // the username,password combination is successful 

            const token = jwt.sign({
                id: user._id,
                email: user.email.toString()
            },
                JWT_SECRET
            )
            console.log(token)

            return res.json({ status: 'ok', data: token })

        } else {
            res.json({ status: 'error', error: 'Invalid email/password' })
        }


    } catch (error) {
        res.json({ error: error.message })
    }

}


exports.users_post_checkAuth = async (req, res) => {

    try {
        res.status(200).json({
            id: req.userData.id,
            email: req.userData.email
        })


    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: ';))' })
    }

}


exports.users_post_changePassword = async (req, res) => {
    const { token, newpassword: plainTextPassword } = req.body

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if (plainTextPassword.length < 7) {
        return res.json({ status: 'error', error: 'Password too small. Should be atleast 8 characters' })
    }

    try {
        const user = jwt.verify(token, JWT_SECRET)
        //....
        const _id = user.id

        const password = await bcrypt.hash(plainTextPassword, 10)
        await User.updateOne({
            _id
        }, {
            $set: { password }
        })
        res.json({ status: 'ok' })

    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: ';))' })
    }

    console.log('JWT decoded: ', User)
    res.json({ status: 'ok' })
}
