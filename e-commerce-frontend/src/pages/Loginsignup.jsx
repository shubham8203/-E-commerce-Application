import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const Loginsignup = () => {
  const [state, setstate] = useState("login");
  const [formdata,setformdata]=useState({
    username:"",
    email:"",
    password:"",
  })
  const [agree,setagree]=useState(false);
  const accept=(e)=>{
    setagree(e.target.value);
  }
  const handler=(e)=>{
setformdata({...formdata,[e.target.name]:e.target.value});
  }
    const login=async ()=>{
      let response;
      await fetch('http://localhost:4000/login',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formdata),
      }).then((res)=>(res.json())).then((data)=>{
        response=data;
        console.log(response);
      })
    
      if(response.success){
        localStorage.setItem('token',response.token);

        window.location.replace('/');
        
      }
      else{
        alert(response.error);
      }
    }
    const signup=async ()=>{
          let response;
          await fetch('http://localhost:4000/signup',{
            method:'POST',
            headers:{
              Accept:'application/form-data',
              'Content-Type':'application/json',
            },
            body:JSON.stringify(formdata),
          }).then((res)=>(res.json())).then((data)=>{
            response=data;
            
          })
        
          if(response.success){
            localStorage.setItem('token',response.token);
            window.location.replace('/');
            
          }
          else{
            alert(response.error);
          }

    }
  if (state === "login") {
    return (
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>Login</h1>
          <div className="loginsignup-fields">
            <input value={formdata.email} onChange={handler} type="email" name="email" placeholder="E-mail" />
            <input value={formdata.password} onChange={handler}type="password" name="password" placeholder="Password" />
          </div>
          <button type="button" onClick={(agree)?()=>(login()):()=>(alert("Please agree to the terms and conditions to continue"))}>Continue</button>
          <p className="login">
            Not Registered?
            <span
              onClick={() => setstate("signUp")}
              style={{ cursor: "pointer" }}
            >
              {" "}
              Sign Up
            </span>
          </p>
          <div className="loginsignup-agree">
            <input type="checkbox" onChange={accept}/>
            <p>By Continuing I agree to the terms of use & privacy policy</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>Sign Up</h1>
          <div className="loginsignup-fields">
            <input value={formdata.username} onChange={handler} type="text" placeholder="Your Name" name="username" />
            <input value={formdata.email} onChange={handler} type="email" placeholder="E-mail" name="email"/>
            <input value={formdata.password} onChange={handler} type="password" placeholder="Password" name="password" />
          </div>
          <button type="button" onClick={(agree)?()=>(signup()):()=>(alert("Please agree to the terms and conditions to continue"))}>Continue</button>
          
          <p className="login">
            Already have an account?
            <span
              onClick={() => setstate("login")}
              style={{ cursor: "pointer" }}
            >
              {" "}
              Login
            </span>
          </p>
          <div className="loginsignup-agree">
            <input type="checkbox" onChange={accept}/>
            <p>By Continuing I agree to the terms of use & privacy policy</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Loginsignup;
