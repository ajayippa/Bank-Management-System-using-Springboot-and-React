import React, { useState } from "react";
import './SignIn.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';

function SignIn() {

    let navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const [register, setRegister] = useState({
        loginId:"",
        password:"",
    });

    const {loginId, password} = register;
    const onInputChange = (e) =>{
        setRegister({...register,[e.target.name]: e.target.value } );
    };
    

    function homePage() {
        navigate('/');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
        const response = await axios.post('http://localhost:5000/sign/authenticate', register);

        localStorage.setItem('token', response.data);

        if (response.data && typeof response.data === 'string') {
            const decodedToken = jwtDecode(response.data);
            if (decodedToken) {
                const userRole = decodedToken.role;
                localStorage.setItem('name', decodedToken.name);
                if (userRole === 'ROLE_ADMIN') {
                    navigate('/adminHome');
                } else if (userRole === 'ROLE_USER') {
                    navigate('/userHome');
                } else {
                    console.error("Unknown user role:", userRole);
                }
            } else {
                console.error("Invalid token:", response.data);
            }
        } else {
            setErrorMessage(response.data);
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errorMessage) {
            setErrorMessage(error.response.data.errorMessage);
          } else {
            setErrorMessage(['LoginId or Password Incorrect']);
          }
    }

    }
    
    return (
        <div>
            <div className="flex h-16 items-center pl-5 bg-black space-x-5">
                <div>
                    <h1 className="text-xl text-white">Online Bank Management</h1>
                </div>
                <div className="space-x-6 text-gray-500">
                    <span className="cursor-pointer hover:text-slate-300" onClick={homePage}>Home</span>
                    <span className="cursor-pointer hover:text-slate-300" onClick={homePage}>Sign In</span>
                    <span>Hi, Guest</span>
                </div>
            </div>
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div className="mt-36 ml-96">
                    <div className="border-2 rounded-md border-blue-200 w-2/5 h-48">
                        <div className="bg-blue-200">
                            <h4 className="pl-3 text-lg">Login</h4>
                        </div>
                        {errorMessage && <p style={{color:"red",fontWeight:'bold',fontSize:"13px",}}>{errorMessage}</p>}
                        <div className="pt-7 pl-7">
                            <div>
                                <label>
                                    Login Id : 
                                        <input type="text" className="h-7 border-2 border-slate-400 rounded ml-4" name="loginId" value={loginId} onChange={(e) => onInputChange(e)}/>
                                </label>
                            </div>
                            <div className="mt-3">
                                <label className="">
                                    Password : 
                                        <input type="password" className="h-7 border-2 border-slate-400 rounded ml-2" name="password" value={password} onChange={(e) => onInputChange(e)}/>
                                </label>
                            </div>                            
                        </div>
                        <div className="pl-28 pt-2">
                            <button className="pt-1 border-2 w-16 rounded-md bg-cyan-400" type="submit">SignIn</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignIn;