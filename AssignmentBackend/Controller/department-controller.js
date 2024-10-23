const express = require('express');
const HttpError = require('../Model/http-error');
const {validationResult} = require ('express-validator');
const Employee = require('../Model/employee');
const Department = require('../Model/department');
const mongoose= require('mongoose');


const createDepartment = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        const error = new HttpError('Invalid Inputs passed, please check your data',422);
        return next(error);
    }
    const {name} = req.body;
    let existingdepartment;
    try{
        existingdepartment = await Department.findOne({name:name});    
    }
    catch(err){
        console.log(err)
        const error = new HttpError('Department Creation Failed, Please Try Again', 500);
        return next(error);
    }
    if(existingdepartment){
        const error = new HttpError('Department With Name Already Exists !! Change Name', 422);
        return next(error);
    }
    const createDepartment = new Department ({
        name:name,
        employee:[]
    })
    try{ 
        await createDepartment.save();
    }
    catch(err){
        const error = new HttpError('Department Creation Failed !!',500)
        return next(error);
    }
    res.status(201).json({department:createDepartment.toObject({getters:true})});
}


const updateDepartment = async (req,res,next)=>{
    const {name} = req.body;
    const departmentId = req.params.deptid;
    let department;
    try {
        department = await Department.updateOne({_id:departmentId},{$set:{name:name}})
        department = await Department.findById(departmentId)
    }
    catch(err){
        const error = new HttpError('Something Went Wrong,Could Not Update Department Name',500);
        return next(error);

    }
    if(!department){
        throw new HttpError('Could Not Find A Department With Given Id',404)
    }
    res.status(200).json({department:department});
}


const deleteDepartment = async (req,res,next)=>{
    const departmentId = req.params.deptid;
    let departmentx;
    try {
        // departmentx = await Department.findById(departmentId).populate('employee');
        departmentx = await Department.findById(departmentId);
    }
    catch(err){
        const error = new HttpError('Deleting Department Failed!',500);
        return next(error);

    }
    if(!departmentx){
        const error = new HttpError('Could Not Find A Department With Given Id',404)
        return next(error);
    }
    try{
        const sess = await mongoose.startSession();
        sess.startTransaction()


        // // Check if employees are populated and iterate over each employee to update their department field
        // if (Array.isArray(departmentx.employee)) {
        //     for (let emp of departmentx.employee) {
        //         emp.department = null;  // Set department to null
        //         await emp.save({ session: sess });  // Save each employee with the session
        //     }
        // } else if (departmentx.employee) {
        //     // If it's a single employee, update their department
        //     departmentx.employee.department = null;
        //     await departmentx.employee.save({ session: sess });
        // }
        // await departmentx.deleteOne({session:sess});


        await departmentx.deleteOne({session:sess});
        await Employee.updateMany({department:departmentId},{$set:{department:null}},{session:sess})

        await sess.commitTransaction()
    }catch(err){
        console.log(err)
        const error = new HttpError('Something Went Wrong,Could Not Delete Department',500)
        return next(error);
    }
    res.status(200).json({message:'Department Successfully Deleted :)'});
}


const getDepartmentById = async (req,res,next)=>{
    console.log('GET Request in departments');
    const departmentId = req.params.deptid;
    let department;
    try {
        department = await Department.findById(departmentId).populate('employee');
    }
    catch(err){
        const error = new HttpError('Something Went Wrong,Could Not Find Department',500);
        return next(error);

    }
    if(!department){
        const error = new HttpError('Could Not Find A Department With Given Id',404)
        return next(error);
    }
    res.json({department:department.toObject({getters:true})})
}


const getAllDepartment = async (req,res,next)=>{
    console.log('GET Request in departments');
    let department;
    try {
        department = await Department.find();
    }
    catch(err){
        const error = new HttpError('Something Went Wrong,Could Not Find A Department',500);
        return next(error);

    }
    if (!department || department.length === 0) {
        return res.status(404).json({ message: 'No Department To Show' });
    }
    res.json({department:department})
}

exports.createDepartment = createDepartment
exports.updateDepartment = updateDepartment
exports.deleteDepartment = deleteDepartment
exports.getDepartmentById = getDepartmentById
exports.getAllDepartment = getAllDepartment

