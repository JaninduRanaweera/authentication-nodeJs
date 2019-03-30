const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

//User model importing
const User = require('../../models/User');

//do routings
router.post('/',(req,res)=>{
    const{name,username,email,nic,contact_number,address,registered_date,password,role,status} = req.body;

    //simple validations
    
    if(!name || !username || !email || !nic || !contact_number || !address || !password){
        return res.status(400).json({msg:'Please enter all fields'});
    }

    //check for existing users
    User.findOne({email})
        .then(user=>{
            if(user) return res.status(400).json({msg:'User already exists'});
               
            const newUser = new User({
                name,
                username,
                email,
                nic,
                contact_number,
                address,
                registered_date,
                password,
                role,
                status
            });

            //create salt & hash 
            bcrypt.genSalt(10, (err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user=>{

                            jwt.sign(
                                {id:user.id},
                                config.get('jwtSecret'),
                                {expiresIn:3600},
                                (err,token)=>{
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user:{
                                           id:user.id,
                                           name:user.name,
                                           username:user.username,
                                           email:user.email,
                                           nic:user.nic,
                                           contact_number:user.contact_number,
                                           address:user.address,
                                           registered_date:user.registered_date,
                                           role:user.role,
                                           status:user.status 
                                        }
                                    });    
                                }    

                            )

                          
                        });
                })
            })
        });
});

module.exports = router;