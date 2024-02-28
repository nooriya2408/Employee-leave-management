import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nooriya@123",
    database: "test"
  }); 
  
  
  
   db.connect((err) => {
    if (err) {
      console.error('Database connection failed: ', err);
    } else {
      console.log('Connected to MySQL database');
    }
  }); 


  export default db;