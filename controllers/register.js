const registerHandle=(req,res,db,bcrypt)=>{
    const {email,name,password}=req.body;
    const hash = bcrypt.hashSync(password);

   db.transaction(trx=>{
     trx('login').insert({
       hash:hash,
       email:email
     })
     .returning('email')
     .then(loginEmail=>{

     return trx('users')
      .insert({
        email:loginEmail[0],
        name:name,
        joined:new Date()
      })
      .then(status=>{
        res.json("success");
      })
     })
     .then(trx.commit)
     .catch(trx.rollback)
     })
   .catch(err=>{ res.status(400).json("failure")});

}

module.exports={
  registerHandle,
};
