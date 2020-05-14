const User=require('../models/user.model.js')
const validate=require('../models/valiate')

exports.create = (req,res) => {
    const { error } = validate.validate(req.body)
    if (error) {
        return res.status(400).send({
            message: 'ENTER PROPER DATA'
        })
    }
    let user=new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    user.save()
    .then(data => {
        res.send(data)
    }).catch(err =>{
        res.status(500).send({
            message:'Some Error is occured while creating user.'
        })
    }) 
}
exports.findAll=(req,res) => {
    User.find()
        .then(users =>{
            res.send(users)
        }).catch(err =>{
            res.status(500).send({
            message: err.message || "some eror occurred while retriving user"
        })
    })
}
exports.login=(req,res) =>{
    let email=req.body.email
    let password=req.body.password
    User.findOne({email:email})
    .then(user =>{
        if(user==undefined){
            res.status(400).send({
                message: "UNFEFINED USER"
        })
        }else{
            if(password==user.password){
                res.status(200).send({
                    message: "LOGIN SUCCESSFULL"
                }) 
            }else{
                res.status(400).send({
                message: "INCURRECT PASSWORD"
                }) 
            }
        }
    }).catch(err=>{
        res.status(400).send({
            message: "SERVER ERROR"
        })
    })
}

  
