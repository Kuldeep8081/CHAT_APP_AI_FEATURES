import projectModel from '../models/project.model.js';
import { validationResult } from 'express-validator';
import * as projectService from '../services/project.service.js';
import userModel from '../models/user.model.js';

export const createProject=async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }


    try {

    const {name}=req.body;

    const loggedInUser=await userModel.findOne({email:req.user.email});

    const userId=loggedInUser._id;

    const newProject=await projectService.createProject({name,userId});

    res.status(201).json({newProject});
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:error.message});
    }
}

export const getAllProjects=async(req,res)=>{
    try {
        const loggedInUser=await userModel.findOne({email:req.user.email});
        const userId=loggedInUser._id;
        const allUserProjects=await projectService.getAllProjectsByUserId(userId);
        return res.status(200).json({projects:allUserProjects});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}

export const addUserToProject=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const {projectId, users}=req.body;
        const project=await projectModel.findById(projectId);
        if(!project){
            return res.status(404).json({message:'Project not found'});
        }
        project.users.push(...users);
        await project.save();
        res.status(200).json({message:'Users added successfully', project});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}