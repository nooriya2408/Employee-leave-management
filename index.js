

import  express  from "express";

import cors from "cors"
import { adminRouter } from "./Routes/AdminRoute.js";
import { leavetyperouter } from "./Routes/Leavetype.js";
import { employeerouter } from "./Routes/Employees.js";
import { departmentrouter } from "./Routes/Department.js";
import { leaverequestrouter } from "./Routes/Leaverequest.js";
import { config } from "dotenv";
config();

const app = express();
const port = 3001;

app.use(cors({
  origin:["http://localhost:3000"],
  methods:['GET',"POST","PUT","DELETE"],
  credentials:true
}));
app.use(express.json());
app.use('/auth',adminRouter)
app.use('/admin',leavetyperouter)
app.use('/admin',employeerouter)
app.use('/admin',departmentrouter)
app.use('/',leaverequestrouter)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });






  
  


