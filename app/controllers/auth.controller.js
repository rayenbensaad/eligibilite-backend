const db = require("../models");
const config = require("../config/auth.config");
var randomstring = require("randomstring");
var nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

const User = db.user;
const Role = db.role;

var bcrypt = require("bcryptjs");
const e = require("express");

exports.signin = (req, res) => {
    console.log("hereee")
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            console.log(user)

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );


            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            else {
                res.status(200)
                    .json({
                        user
                    }).end()
            }

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.updatePassword = (req, res) => {
    const UserId = req.params.userId;

    User.findByPk(UserId)
        .then((user) => {
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            // console.log(req.body.password, '----------',user.password,passwordIsValid)
            if (passwordIsValid) {

                user.password = bcrypt.hashSync(req.body.newPassword, 8);
                user.save();
                res.status(200).json({ message: 'success' });
            }
            else
                return res.status(500).json({ message: 'error' });

        })
};


exports.updateEmail = (req, res) => {
    const UserId = req.params.userId;

    User.findByPk(UserId)
        .then((user) => {
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            // console.log(req.body.password, '----------',user.password,passwordIsValid)
            if (passwordIsValid) {

                user.email = req.body.email;
                user.save();
                res.status(200).json({ message: 'success' });
            }
            else
                return res.status(500).json({ message: 'error' });

        })
};

exports.forgetPasword = (req, res) => {
    const UserId = req.params.userId;


    User.findByPk(1)
        .then((user) => {
            const newPasword = randomstring.generate(7);
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                secure: 'true',
                port: '465',
                auth: {
                    user: 'eligibilitee@gmail.com', // must be Gmail
                    pass: 'eligibilite1.'
                }
            });

            var mailOptions = {
                from: 'eligibilitee@gmail.com',
                to: 'rayenbensaad01@gmail.com', // must be Gmail
                cc: `${user.username} <${user.email}>`,
                subject: `New password :  `,
                html: `
                      <h1>please Change ur password now for your security </h1>
                      <p>${newPasword}</p>
                      `
            };


            console.log(newPasword)

            user.password = bcrypt.hashSync(newPasword, 8);
            user.save();
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).json({
                        message: 'successfuly sent!'
                    })
                }
            });
            res.status(200).json({ message: 'success' });

        })
};


exports.getPassword = (req, res) => {

    User.findByPk(1)
        .then((user) => {
            //console.log("Decrypted password = ", cryptr.decrypt(user.password ));
            //user.password = bcrypt.hashSync(newPasword, 8);
            let email = 'some@mail.com';
            let encryptdEmail = cryptr.encrypt(email);
            console.log("Decrypted email = ", cryptr.decrypt(encryptdEmail));

            res.status(200).json({ message: user });

        })
};