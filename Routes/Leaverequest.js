import express from 'express';
import db from '../utils/db.js'



const router = express.Router()
router.get('/leaverequest/:employeeId', (req, res) => {
    const employeeId = req.params.employeeId;
    const sql = 'SELECT * FROM leave_request WHERE employee_id = ?';
    db.query(sql, [employeeId], (err, results) => {
        if (err) {
            console.log('Error fetching leaves: ' + err.message);
            return res.status(500).send('Error fetching leaves');
        }
        res.json(results);
    });
});

router.get('/leaverequest',(req,res)=>{
    const sql = 'SELECT * FROM leave_request';
    db.query(sql,(err,results)=>{
        if(err){
            console.log('Error fetching leaves' + err.message);
            return res.status(500).send('error fetching leaves');

        }
        res.json(results)
    })
});


router.post('/leaverequest', (req, res) => {
    const { leave_type, from_date, to_date, description,employee_id } = req.body;
    const status = 'pending';
    
    const sql = "INSERT INTO leave_request (leave_type, from_date, to_date, description, status, creation_date,employee_id) VALUES (?, ?, ?, ?, ?, NOW(),?)";
    const values = [leave_type, from_date, to_date, description, status,employee_id];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.log('Error creating leave: ' + err.message);
            return res.status(500).send("Error creating leave");
        }
        console.log("Leave created with id: " + result.insertId);
        res.status(201).send('Leave created successfully');
    });
});

router.put('/leaverequest/:leave_id',(req,res)=>{
    const ID =req.params.leave_id;
    const {status} =req.body;
    const query = "UPDATE leave_request SET status=? WHERE leave_id=?";
    db.query(query,[status,ID],(error,result)=>{
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

  
router.delete('/leaverequest/:id',(req,res)=>{

    const leaveId = req.params.id;
    const sql = "DELETE FROM leave_request WHERE leave_id=?"
    db.query(sql,[leaveId],(err,result)=>{
      if(err){
        console.error("error deleting leave: "+err.message);
        return res.status(500).send('error deleting')
      }  
      if(result.affectedRows === 0){
        res.status(404).json({error:"leave type not found"});
        return;
    }
      console.log('Leave deleted');
      res.status(200).send("Leave deleted successfullly")
    })
})


export {router as leaverequestrouter}