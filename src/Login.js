import React,{ useState} from 'react';
import { Button } from '@mui/material';
import { useNavigate} from 'react-router-dom'
import { TextField } from '@mui/material';

function Login(props) {
    const navigate = useNavigate();
    const {user,setUser,signupUser,setSignupUser} = props;
    const handleEmailChange = (e) => {
        e.preventDefault();
        setUser({email: e.target.value, password: ''});
    }
    const handlePasswordChange = (e) => {
        e.preventDefault();
        setUser({email: user.email, password:e.target.value});
    }
    const getFormBody = (params) => {
        let formBody = [];
        for( let property in params) {
            let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
            let encodedValue = encodeURIComponent(params[property]); //gaurav 123 => 'gaurav%20123'
            formBody.push(encodedKey + '=' + encodedValue);
    
        }
        return formBody.join('&'); // username='gaurav'&email='g@gmail.com'
    }
    const handleLogin = (e) => {
        e.preventDefault();
        console.log(user," is the user");
        setUser(user);
        fetch('http://127.0.0.1:8000/login', {
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: getFormBody({email:user.email, password:user.password})
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data," DATA");
            if(data.success){
                //save the user 
                localStorage.setItem('user',JSON.stringify(data.user));
                navigate('/');
            }
        })
    }
    const handleNameChange = (e) => {
        e.preventDefault();
        setSignupUser({name: e.target.value, email: signupUser.email, password: signupUser.password, age: signupUser.age})
    }
    const handleSignupEmailChange = (e) => {
        e.preventDefault();
        setSignupUser({name: signupUser.name, email: e.target.value, password: signupUser.password, age: signupUser.age})
    }
    const handleSignupPasswordChange = (e) => {
        e.preventDefault();
        setSignupUser({name: signupUser.name, email: signupUser.email, password: e.target.value, age: signupUser.age})
    }
    const handleSignupAgeChange = (e) => {
        e.preventDefault();
        setSignupUser({name: signupUser.email, email: signupUser.email, password: signupUser.password, age: e.target.value})
    }
    
    const handleSignupButton = (e) => {
        e.preventDefault();
        setSignupUser(signupUser);
        fetch('http://127.0.0.1:8000/signup', {
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: getFormBody({name: signupUser.name, email:signupUser.email, password: signupUser.password, age: signupUser.age})
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data," DATA");
            // dispatch(signupFailed(data.message));
        })
        console.log(signupUser," is the signup user");
    }
    return (
        <div className='Login-Signup-Container'>
        <div className='Login-Container'>
            <div className='Login-Form'>
            <TextField id="standard-basic" label="Email" variant="standard" name="email" onChange={(e) => handleEmailChange(e)} value={user.email}/>
            <TextField id="standard-basic2" label="Password" variant="standard" name="password" onChange={ (e) => handlePasswordChange(e)} value={user.password}/>
            <Button variant="contained" onClick={(e) => handleLogin(e)}>Log In</Button>
            </div>
        </div>
        <div className='Login-Container'>
            <div className='Login-Form'>
            <TextField id="standard-basic3" label="Name" variant="standard" name="name" onChange={(e) => handleNameChange(e)} value={signupUser.name}/>
            <TextField id="standard-basic4" label="Email" variant="standard" name="signupEmail" onChange={(e) => handleSignupEmailChange(e)} value={signupUser.email}/>
            <TextField id="standard-basic5" label="Password" variant="standard" name="signupPassword" onChange={ (e) => handleSignupPasswordChange(e)} value={signupUser.password}/>
            <TextField id="standard-basic6" label="Age" variant="standard" name="age" onChange = {(e) => handleSignupAgeChange(e)} value={signupUser.age}/>
            <Button variant="contained" onClick={(e) => handleSignupButton(e)}>Sign Up</Button>
            </div>
        </div>
        </div>
    );
}

export default Login;