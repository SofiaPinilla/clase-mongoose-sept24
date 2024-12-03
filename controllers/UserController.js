// const { JWT_SECRET } = require("../config/keys")
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const UserController = {
    async create(req,res){
        req.body.role = "user"
        const user = await User.create(req.body)
        res.status(201).send({message:"User successfully created",user})
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email,
            })
          const token = jwt.sign({ _id: user._id }, JWT_SECRET);
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({ message: 'Bienvenid@ ' + user.name, token });
        } catch (error) {
            console.error(error);
        }
    },
    async logout(req, res) {
        try {
          await User.findByIdAndUpdate(req.user._id, {
            $pull: { tokens: req.headers.authorization },
          });
          res.send({ message: "Desconectado con éxito" });
        } catch (error) {
          console.error(error);
          res.status(500).send({
            message: "Hubo un problema al intentar desconectar al usuario",
          });
        }
      },
    
}


module.exports = UserController