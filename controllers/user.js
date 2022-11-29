const User = require('../models/user')


const register = (req, res, next) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    User.findOne({ email: user.email })
    .then(data => {    
        if(data===null)  {
            user.save()
            const resdata = {
                "status": "Success",
                "message": "Register successfully",
                "result":{},
                "error": {}
            }
            res.json(resdata)
        }else{
              const resdata = {
                "status": "OK",
                "message": "Already register",
                "result": `${data.email} `,
                "error": {}
            }
            res.json(resdata)
        }
          
        })
        .catch(err => {
            const resdata = {
                "status": "OK",
                "message": "",
                "result": {},
                "errors": {
                    "errors": {
                        "message": `${err.message}`,
                        "type": `${err.name}`
                    }
                }
            }
            res.json(resdata)
        })
}

const login = (req, res, next) => {
    var email = req.body.email
    var password = req.body.password

    User.findOne({ $or: [{ email: email }] })
        .then(user => {
            if (user) {
                if (user.password == password) {
                    const resdata = {
                        "status": "OK",
                        "message": "loggedin successfully",
                        "result":  `${user.email}`,
                    }
                    user.is_Logged_in = 1
                    user.save()
                    res.send(resdata)
                } else {
                    const resdata = {
                        "status": "ERROR",
                        "message": "invalid password",
                        "result": {},
                        "error": {}
                    }
                    res.json(resdata)
                }
            } else {
                const resdata = {
                    "status": "ERROR",
                    "message": "invalid email",
                    "result": {},
                    "error": {}
                }
                res.send(resdata)
            }
        })
}

const logout = (req, res, next) => {
    var user_id = req.body.user_id

    User.findOne({ user_id: user_id })
        .then(user => {
            if (user) {
                const resdata = {
                    "status": "OK",
                    "message": "user logged out",
                    "result": {},
                    "errors": {}
                }
                user.is_Logged_in = 0
                user.save()
                res.send(resdata)
            } else {
                res.send({ message: "Please check User id" })
            }
        })
}

const forgotpassword = (req, res, next) => {
    var email = req.body.email
    
       User.findOne({email:email})
        .then(user=>{
            if(user){
                user.password=req.body.password
                user.save()
                const resdata = {
                    "status": "OK",
                    "message": "password updated successfully",
                    "result": {},
                    "errors": {}
                }
                res.send(resdata)
            }else{
                res.send({ message: "Please check User id & change password" })  
            }
        })
}

module.exports = {
    register,
    login,
    logout,
    forgotpassword
}