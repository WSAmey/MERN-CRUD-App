import User from '../model/userModel.js'


//create user
export const create=async(req,res)=>{
    try {
        const userData= new User(req.body)
        if(!userData){
            return res.status(404).json({msg:"User data not found"});
        }

        const savedData=await userData.save();

        res.status(200).json({msg:'User created successfully!'});
         
    } catch (error) {
        res.status(500).json({error:error})
    }
}

//fetch data

export const getAll=async(req,res)=>{
    try {
        const userData= await User.find();
        if(!userData){
            return res.status(404).json({msg:'Users data not found'})
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({error:error})

    }
}


//get data by id

export const getOne=async(req,res)=>{
    try {
        const id=req.params.id;
        const userExists = await User.findById(id);
        if(!userExists){
            res.status(404).json({msg:'User data not found'})
        }
        res.status(200).json(userExists);
    } catch (error) {
        res.status(500).json({error:error})

    }
}

//update user

export const update=async (req,res)=>{
    try {
        const id=req.params.id;
        const userExists=await User.findById(id);
        if(!userExists){
            return res.status(404).json({msg:'User data not found'})
        }
        const updatedData=await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({msg:'User updated successfully!'});
    } catch (error) {
        res.status(500).json({error:error})

    }
}

//delete user

export const deleteUser=async(req,res)=>{
    try {
        const id=req.params.id;
        const userExists=await User.findById(id);
        if(!userExists){
            return res.status(404).json({msg:'User data not found'})

        }
        await User.findByIdAndDelete(id);
        res.status(200).json({msg:'User deleted successfully'})
        
    } catch (error) {
        res.status(500).json({error:error})

    }
}