import express from 'express';
import db from '../utils/db.js';

const router = express.Router()
router.get('/department',(req,res)=>{
    const query = 'SELECT * FROM department';
    db.query(query,(error,results)=>{
        if(error){
            console.log("error fetching leave type:",error);
            res.status(500).json({error:"Internal server error"});
            return;
        }
        res.json(results)
    })
})


router.post('/department',(req,res)=>{
    const{department,department_code} = req.body;

    const query = "INSERT INTO department (department,department_code,creation_date) VALUES (?, ?, NOW())";
    db.query(query,[department,department_code],(error,result)=>{
     if(error){
        console.error("error creating leave type:",error);
        res.status(500).json({error:"Internal server error"})
        return;
        
     }  
     res.status(201).json({message:"department is created successfully",id:result.insertId}) 
    })
})

router.delete('/department/:id',(req,res)=>{
    const departmentId = req.params.id;
    const query = "DELETE FROM department WHERE id=?";
    db.query(query,[departmentId],(error,result)=>{
        if(error){
            console.log("error deleting leave type:",error);
            res.status(500).json({error:"Internal server error"});
            return;
        }
        if(result.affectedRows === 0){
            res.status(404).json({error:"leave type not found"});
            return;
        }
        res.status(200).json({message:"department deleted succesfully"})
    })
})

router.put('/department/:id',(req,res)=>{
    const departmentID =req.params.id;
    const {department,department_code} =req.body;
    const query = "UPDATE department SET department =?,department_code=? WHERE id=?";
    db.query(query,[department,department_code,departmentID],(error,result)=>{
        if(error){
            console.error("Error updating leave :",error);
            res.status(500).json({error:"internal error"})
            return;
        }
        if(result.affectedRows === 0){
            res.status(400).json({error:"leave type not found"});
            return;
        }
        res.status(200).json({message:"Leave type is changed "})
    })
})

export {router as departmentrouter}