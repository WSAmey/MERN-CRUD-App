import express from 'express';
import { create, deleteUser, getAll, getOne, update } from '../controller/userController.js';
const route = express.Router();

//create api
route.post("/create",create)

//get all users api
route.get("/getAll",getAll)

//get user by id
route.get("/getOne/:id",getOne)

//update user
route.put("/update/:id",update);

//delete user
route.delete("/delete/:id",deleteUser);

export default route;