const mongoose =require('mongoose');
const Order=require("../models/orderSchema");

// Create Order controller
const createOrder = async(req,res)=>{
    const neworder=req.body; 
    console.log(req.userID)
   //  const {data}=req.userID;

    // const {data}=req.userID;

  
    const order=await Order.create({...neworder, userId:req.userID.data});
    if(!order){
       return res.status(400).json({
          message:"Order Creation Fail,Check post order, BE"
       })
    }
    console.log(order);
    return res.status(200).json({
       message:"Success",
       order,
    })
 };
  //PastOrder Get Api
  const getPastOrder = async (req , res) =>{
   console.log(req.userID.data)
   try{
      //  let {data} = req.userID
       let result = await Order.find({userId:req.userID.data})
       res.status(201).json({
           status:"Success",
           result
       })
   }catch(e){
       res.status(500).json({
           status:"Failed",
           message:e.message
       })
   }
}

const updateOrder = async  (req , res) =>{
   try{
      // console.log("Called")
      let result = await Order.findOneAndUpdate({_id:req.params.id},{$set:{status:"Cancelled"}})
      // console.log(result)
   }catch(e){
      res.status(500).json({
         status:"Failed",
         message:e.message
      })
   }
}


 module.exports={createOrder , getPastOrder, updateOrder}