import express from 'express';
import db from '../utils/db.js';

const router = express.Router()
router.get('/leavetypes',(req,res)=>{
    const query = 'SELECT * FROM leavetype';
    db.query(query,(error,results)=>{
        if(error){
            console.log("error fetching leave type:",error);
            res.status(500).json({error:"Internal server error"});
            return;
        }
        res.json(results)
    })
})


router.post('/leavetypes',(req,res)=>{
    const{leavetype,description} = req.body;

    const query = "INSERT INTO leavetype (leavetype,description,creation_date) VALUES (?, ?, NOW())";
    db.query(query,[leavetype,description],(error,result)=>{
     if(error){
        console.error("error creating leave type:",error);
        res.status(500).json({error:"Internal server error"})
        return;
        
     }  
     res.status(201).json({message:"leave type is created successfully",id:result.insertId}) 
    })
})

router.delete('/leavetypes/:id',(req,res)=>{
    const leavetypeId = req.params.id;
    const query = "DELETE FROM leavetype WHERE id=?";
    db.query(query,[leavetypeId],(error,result)=>{
        if(error){
            console.log("error deleting leave type:",error);
            res.status(500).json({error:"Internal server error"});
            return;
        }
        if(result.affectedRows === 0){
            res.status(404).json({error:"leave type not found"});
            return;
        }
        res.status(200).json({message:"leave type deleted succesfully"})
    })
})

router.put('/leavetypes/:id',(req,res)=>{
    const leaveTypeID =req.params.id;
    const {leavetype,description} =req.body;
    const query = "UPDATE leavetype SET leavetype =?,description=? WHERE id=?";
    db.query(query,[leavetype,description,leaveTypeID],(error,result)=>{
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

export {router as leavetyperouter}