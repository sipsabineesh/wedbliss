import User from '../models/userModel.js'

export const getUsers = async(req,res) => {
   
   const  users = await  User.find({isAdmin:false}).sort({_id:-1}).limit(5)
   .then(user => {
    //res.send(user) 
    res.json({user})
})
  .catch(err => {
    res.status(500).send({message:err.message||"Error occured while retrieving data"})
})
  
}

