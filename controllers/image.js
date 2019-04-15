const imageHandle=(req,res,db)=>{
      const {id}=req.body;
      db('users')
      .where('id', '=', id)
      .increment('entries', 1)
      .returning('*')
      .then(data=>{
        if(data.length==0)
        res.status(400).json("failure");
        else {
          res.json(data[0]);
        }
      })
      .catch(err=>res.status(400).json("error incrementing"));

}


module.exports={
  imageHandle,
};
