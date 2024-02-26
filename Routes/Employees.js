import express from 'express';
import db from '../utils/db.js';

const router = express.Router()
router.get('/employees',(req,res)=>{
    db.query("SELECT * FROM employees",(error,result)=>{
        if(error){
            console.error("Error retrieving employees:",error);
           res.status(500).json({error:"Internal server error"});
           return; 
        }
        res.status(200).json(result)
    })
})

router.post('/employees',(req,res)=>{
    const {name,employee_id, department, email_id,
         password, dob, gender, address, mobile_no } = req.body;
const dobDate = new Date(dob);
const formatteddob  = dobDate.toISOString().split('T')[0];
        const query ='INSERT INTO employees (name, employee_id, department, email_id, password, dob, gender, address, mobile_no) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [name, employee_id, department, email_id, password, formatteddob, gender, address, mobile_no], (error, result) => {
            if (error) {
                console.error('Error creating employee:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.status(201).json({ message: 'Employee created successfully', id: result.insertId });
        });
    })

    router.put('/employees/:id', (req, res) => {
        const employeeId = req.params.id;
        const { name,employee_id, department, email_id, password,
             dob, gender, address, mobile_no } = req.body;
             const dobDate = new Date(dob);
const formatteddob  = dobDate.toISOString().split('T')[0];
        const query = 'UPDATE employees SET name=?, employee_id=?,department=?, email_id=?, password=?, dob=?, gender=?, address=?, mobile_no=? WHERE id=?';
        db.query(query, [name, employee_id,department, email_id, password, formatteddob, gender, address, mobile_no, employeeId], (error, result) => {
            if (error) {
                console.error('Error updating employee:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Employee not found' });
                return;
            }
            res.status(200).json({ message: 'Employee updated successfully' });
        });
    });
    router.put('/employees/:id/password', (req, res) => {
        const employeeId = req.params.id;
        const { password } = req.body;
    
        const query = 'UPDATE employees SET password=? WHERE id=?';
        db.query(query, [password, employeeId], (error, result) => {
            if (error) {
                console.error('Error updating employee password:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Employee not found' });
                return;
            }
            res.status(200).json({ message: 'Employee password updated successfully' });
        });
    });
    
    router.delete('/employees/:id', (req, res) => {
        const employeeId = req.params.id;
      
        // Assuming you have a database query to delete the employee with the given ID
        const query = 'DELETE FROM employees WHERE id = ?';
        db.query(query, [employeeId], (error, result) => {
          if (error) {
            console.error('Error deleting employee:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          if (result.affectedRows === 0) {
            // If no rows were affected, it means the employee with the given ID was not found
            res.status(404).json({ error: 'Employee not found' });
          } else {
            // If the deletion was successful, send a success message
            res.status(200).json({ message: 'Employee deleted successfully' });
          }
        });
      });
      
    
export {router as employeerouter}