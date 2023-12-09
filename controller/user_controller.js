const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

class UserController {

    static async getAll(req,res,next) {
        try {
            const pagenumber = Number.parseInt(req.query.page)
            const sizenumber = Number.parseInt(req.query.limit)
            
            let page = 0 
            if(!Number.isNaN(pagenumber) && pagenumber > 0){
                page = pagenumber
            }
            let limit = 10
            if(!Number.isNaN(sizenumber) && sizenumber > 0 && sizenumber < 10){
                limit = sizenumber
                
           }
            
            const users = await User.findAndCountAll({
                limit : limit,
                offset : page * limit
        })
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }
    // static async limit(req,res,next){
    //     const {page, limits} = req.query
    //     try{
    //     const user= await User.findAndCountAll({
    //         limit : limits,
    //         offset : page * limits
    //     })
    //     res.status(200).json(user)
    // }catch(error){
    //     next(error)
    // }
// }


    static async register(req, res, next) {
        try {
            const { email, name, password } = req.body;

            // Hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);
             
            // Create a new user in the database
            const newUser = await User.create({
                email,
                name,
                password: hashedPassword,
            });

            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
          const { email, password } = req.body;
          const user = await User.findOne({ where: { email } });
          if (!user) {
            throw {name: 'InvalidCredential'};
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            throw {name: 'InvalidCredential'};
          }
          const token = jwt.sign(
            {
              id: user.id,
              email: user.email
            },
            'secret'
          );
          res.status(200).json({ token });
        } catch (err) {
          next(err);
        }
      }

}

module.exports = UserController