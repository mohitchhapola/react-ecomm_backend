const mongoose = require('mongoose');
const Cart = require('../models/cart'); // Adjust the path as necessary

const fetchCartByUser = async (req, res) => {
  const { user } = req.query;
  try {
    const cartItems = await Cart.find({ user: user }).populate('product');

    res.status(200).json(cartItems);
  } catch (err) {
    
    res.status(400).json(err);
  }
};

const deleteItemFromCart = async(req,res)=>{
  const {id} = req.query;
  try{
    const doc = await Cart.findByIdAndDelete({_id:id})
    res.status(200).json(doc)
  }
  catch(err){
    res.status(400).json(err);
    } 
}


const addToCart = async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const doc = await cart.save();
    const result = await doc.populate('product');
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateCart = async(req,res)=>{
  const {id} = req.params;
  try {
    const doc = await Cart.findByIdAndUpdate(id , req.body , {new:true});
    const result = await doc.populate('product')
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error)
  }
}
module.exports = {
    fetchCartByUser,
    addToCart,
    deleteItemFromCart,
    updateCart
  };
