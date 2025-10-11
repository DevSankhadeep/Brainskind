import React, { useState } from "react";
import Navbar from "../ui/components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Link } from "lucide-react";

const Login = () => {
    
        const [input, setInput] = useState({
            
            email: "",
            password: "",
            role: "",
            
    
        });
        const changeEventHandler = (e) => {
            setInput({ ...input, [e.target.name]: e.target.value });
        };
        const changeFileHandler = (e) => {
            setInput({ ...input, file: e.target.files[0] });
        };
        const submitHandler = async (e) =>{
            e.preventDefault();
            console.log(input);
    
        }
  return (
    <div>
      


        <Navbar></Navbar>
        <div className="flex items-center justify-center max-w-7xl mx-auto">
            <from
             onSubmit={submitHandler}
             className="w-1/2 border p-5 rounded-md mt-10">
                <h1 className="font-bold text-xl mb-5 items-center">Login</h1>
                
                <div className="my-2">
                  <Label>Email</Label>   
                  <Input type="email"
                  value={input.email}
                   name="email"
                    onChange={changeEventHandler} 
                     placeholder="johndoe@gmail.com"></Input>
                </div>
                <div className="my-2">
                  <Label>Password</Label>   
                  <Input type="password"
                   value={input.password}
                    name="password"
                     onChange={changeEventHandler}
                       placeholder="********"></Input>
                </div>
                
                <div className="flex items-center justify-between">
    <RadioGroup className="flex items-center gap-4 my-5">
      <div className="flex items-center gap-3">
        <Input 
        type="radio"
         name="role"
         value="Student"
         checked={input.role === "Student"}
         onChange={changeEventHandler}
         className="cursor-pointer"
         />
        <Label htmlFor="r1">Student</Label>
      </div>
      <div className="flex items-center gap-3">
        <Input 
        type="radio"
         name="role"
         value="Recruiter"
         checked={input.role === "Recruiter"}
         onChange={changeEventHandler}
         className="cursor pointer"
         />
        
        <Label htmlFor="r2">Recruiter</Label>
      </div>
    </RadioGroup>
    
    <button className="block w-full py-3 text-white bg-primary hover:bg-primary/90 rounded-md">
     Login
    </button>
    {/* No account then register */}
    <p className="text-gray-500 text-sm mt-2">
     No account? <Link to="/register">Register</Link>
     </p>


                </div>
            </from>
        </div>
      
    </div>
  
    
  );
};

export default Login;
