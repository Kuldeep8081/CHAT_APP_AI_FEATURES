import ProjectModel from "../models/project.model.js";

export const createProject=async({name,userId})=>{
    if(!name) throw new Error('Project name is required');
     
    if(!userId) throw new Error('User ID is required');
    let project;
    try {
        project = await ProjectModel.create({
            name,
            users: [userId]
        });
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Project name already exists');
        }
        throw error;
    }

    return project;
}

export const getAllProjectsByUserId=async(userId)=>{
    if(!userId) throw new Error('User ID is required');
    const allUserProjects=await ProjectModel.find({users:userId});
    return allUserProjects;
}

export const addUserToProject=async({projectId, users})=>{
    if(!projectId) throw new Error('Project ID is required');
    if(!users || !Array.isArray(users)) throw new Error('Users must be an array of user IDs');
    const project=await ProjectModel.findById(projectId);
    if(!project){
        throw new Error('Project not found');
    }
    project.users.push(...users);
    await project.save();
    return project;
}
