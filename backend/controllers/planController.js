import { Mongoose } from 'mongoose';
import Plan from '../models/planModel.js'
import { errorHandler } from "../utils/error.js"

export const getPlans = async(req,res,next) => {
  
    const  plans = await Plan.find({isDeleted:false})
    .then(plan => {
     //res.send(user) 
     res.json({plan})
 })
   .catch(err => {
     next(errorHandler(500, 'Error occured while retrieving data'));
 })
  
//  exports.listProducts = async (req, res) => {
//     const defaultPerPage = 10;
//     const page = parseInt(req.query.page) || 1; 
//     const limit = parseInt(req.query.limit) || defaultPerPage; 
//     const skip = (page - 1) * limit;
//     const selectedFilter = req.query.filter || 'all';
//     const productNameSearch = req.query.productNameSearch || '';
//     console.log(productNameSearch)
//     let totalCountQuery = Product.find();

//     if (selectedFilter === 'in_stock') {
//       totalCountQuery = totalCountQuery.where('productStock').gt(0);
//     } else if (selectedFilter === 'out_of_stock') {
//       totalCountQuery = totalCountQuery.where('productStock').equals(0);
//     }
   
//     const totalProducts = await totalCountQuery.countDocuments();
//     const startSerialNumber = (page - 1) * limit + 1;
//     const searchPattern = new RegExp(`.*${productNameSearch}.*`, 'i');

//     let productsQuery = Product.find();
//     if (productNameSearch) {
//         productsQuery = productsQuery.where('productName').regex(searchPattern);
//     }
//     if (selectedFilter === 'in_stock') {
//       productsQuery = productsQuery.where('productStock').gt(0);
//     } else if (selectedFilter === 'out_of_stock') {
//       productsQuery = productsQuery.where('productStock').equals(0);
//     }
//     productsQuery = productsQuery.sort({ createdAt : -1 });

//     const product = await productsQuery
//       .skip(skip)
//       .limit(limit)
//       .populate('productCategory');
    
//     res.render('admin/view-product', {
//       product,
//       currentPage: page,
//       pages: Math.ceil(totalProducts / limit),
//       startSerialNumber:startSerialNumber,
//       selectedLimit:limit,
//       selectedFilter:selectedFilter,
//       productNameSearch:productNameSearch
//     });
//   };

 }

 export const createPlan = async(req,res,next) => {
  const { planName,planValidity,planPrice,noOfContacts,noOfMessages } = req.body
  const planExists = await Plan.findOne({planName})
  if(planExists) {
  console.log("name already in db")    
    return res.status(200).json({
      success: false,
      message: 'Plan Already Existing',
    });
  }
  const newPlan = new Plan({
    planName,
    planValidity,
    planPrice,
    noOfContacts,
    noOfMessages
  });
  
  const plan = await newPlan.save()
 
  if(plan){
     return res.status(201).json({
        success: true,
        message: 'Plan created successfully',
      });
  }
  else {
      res.status(400);
      throw new Error('Invalid plan data');
  }
} 

export const editPlan = async(req,res,next) => {
  try {
    const plan = await Plan.findById(req.body.id);
    if (plan) {
      plan.planName = req.body.planName || plan.planName;
      plan.planValidity = req.body.planValidity || plan.planValidity;
      plan.planPrice = req.body.planPrice || plan.planPrice;
      plan.noOfContacts = req.body.noOfContacts || plan.noOfContacts;
      plan.noOfMessages = req.body.noOfMessages || plan.noOfMessages;
     
      const updatedPlan = await plan.save();

      return res.status(200).json({
        success: true,
        message: 'Plan updated successfully',
        // _id: updatedPlan._id,
        // planName: updatedPlan.planName,
        // planValidity: updatedPlan.planValidity,
        // noOfContacts: updatedPlan.noOfContacts,
        // noOfMessages: updatedPlan.noOfMessages,
      });
    } else {
      res.status(404).json({ message: "Plan not found" });
      throw new Error("Plan not found");
    }

  } catch (error) {
    console.log(error.message);
  }
} 

export const deletePlan = async(req,res,next) => {
  try {
    console.log("deletiiiiiiiiiiiiing")
    const plan = await Plan.findById(req.body.id);
    if(plan){
        plan.isDeleted = true;
        const deletedPlan =await plan.save();
        res.status(200).json({
            _id: deletedPlan._id,
            success: true,
            message: 'Plan deleted successfully',
        })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
    
  } catch (error) {
    console.log(error.message);
  }
 
}