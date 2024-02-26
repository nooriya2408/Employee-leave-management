import express from 'express';
import db from '../utils/db.js';




const router = express.Router()
router.get('/checkCredentials',(req,res)=>{
    const sql = 'SELECT * FROM login';
    db.query(sql,(err,results)=>{
        if(err){
            console.log('Error fetching leaves' + err.message);
            return res.status(500).send('error fetching leaves');

        }
        res.json(results)
    })
});

router.post('/checkCredentials', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM login WHERE email = ?';

    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send('Internal server error');
        }

        if (results.length === 0) {
            return res.status(400).send('User not found');
        }

        const user = results[0];

       
        if (user.password === password) {
            res.send('Login successful');
        } else {
            res.status(400).send('Invalid credentials');
        }
    });
});

router.put('/checkCredentials/:id',(req,res)=>{
    const ID =req.params.id;
    const {password} =req.body;
    const query = "UPDATE login SET password=? WHERE id=?";
    db.query(query,[password,ID],(error,result)=>{
        if(error){
            console.error("Error updating password :",error);
            res.status(500).json({error:"internal error"})
            return;
        }
        if(result.affectedRows === 0){
            res.status(400).json({error:"user not found"});
            return;
        }
        res.status(200).json({message:"password is changed "})
    })
})
  

export {router as adminRouter}