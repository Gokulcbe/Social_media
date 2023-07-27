import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Button from '@mui/joy/Button';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import './Login.css';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const signup = async() => {
        try{
            if(password!==confirmPassword){
                setError('Password and Confirm password do not match');
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            const data = {
                email : email,
                username : username,
                bio : '',
                city : '',
                relation : '',
                password: password,
            }
            const data1 = {
                email : email,
                username : username,
                bio : '',
                city : '',
                relation : '',
            }
            axios.post("http://127.0.0.1:8080/Profile/add",data1);
            const response = await axios.post("http://127.0.0.1:8181/api/v1/auth/register", data);
            console.log(response.data);
            // if (response.status === 200) {
                navigate('/');
            // } 
        }
        catch(e){
            if(e.message==="Firebase: Error (auth/email-already-in-use)."){
                setError("Email already in use. Please Try again");
                
              }
            // setError(e.message);
        }
    }
    const signInWithGoogle = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
    
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          // You can access the user's information like user.displayName, user.email, etc.
        //   Cookies.set('Id', user.email);
          navigate('/');
        } catch (e) {
          setError(e.message);
        }
      };
    return (
        <div className='login-container'>
            <div class="Top">
                <div class="left">
                    <div class="">

                    </div>
                    <h2><span><i>Connect</i></span> helps you connect and share with the people in your life.</h2>
                </div>

                <div class="right">
            <h1>Welcome!!! Sign up New Account</h1>
            <div class="loginform">
            {error && <p style={{color: "red"}}>{error}</p>}
            <div class="border border-dark pb-3 rounded-lg" style={{width: "100%"}}>
            <div class="text-center p-1 mb-2 text-light " style={{background: "#016b7a"}}>
                    <h2>Sign Up</h2>
                    <h4>It's Quick and Easy</h4>
                </div>
                <form id="logf">
                    <div class="form-group ml-3 mr-3">
                        <label class="text-inverse">Email</label>
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            // defaultValue="Hello World"
                            type="email"
                            style={{width: '80%'}}
                            value={email}
                            onChange={e => setEmail(e.target.value)} 
                        />
                    </div>
                    <div class="form-group ml-3 mr-3">
                        <label class="text-inverse">User name</label>
                        <TextField
                            required
                            id="outlined-required"
                            label="Username"
                            // defaultValue="Hello World"
                            type="text"
                            style={{width: '80%'}}
                            value={username}
                            onChange={e => setUsername(e.target.value)} 
                        />
                    </div>
                    <div class="form-group ml-3 mr-3">
                        <label class="text-inverse">Password</label>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            style={{width: '80%'}}
                            label="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} 
                            required
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                    
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            // label="Password"
                            />
                            
                            {/* </FormControl> */}
                    </div>

                    <div class="form-group ml-3 mr-3">
                        <label class="text-inverse">Confirm Password</label>
                        <TextField
                            id="outlined-password-input"
                            label="Confirm Password"
                            type="password"
                            style={{width: '80%'}}
                            // autoComplete="current-password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)} 
                            required
                        />
                    </div>

                    <div class="form-group ml-3 mr-3 mt-2 mb-2">
                        <Button id="logfib1" class="form-control" type="button" style={{background: "#4CAF50", color: "#ffffff", width: "80%", marginLeft: "10%"}} name="nlogfib1 " onClick={signup}>SIGNUP</Button>
                        <Button variant="contained" endIcon={<GoogleIcon/>} style={{marginTop: "4%"}} onClick={signInWithGoogle}><span>Sign in with Google</span></Button>
                        <div class=" mt-3 mr-3" style={{marginTop: "5%"}}>
                            <i>Already Registered</i>
                            <a href="/">Click here</a>
                        </div>
                        <div class=" mt-3 mr-3" style={{marginTop: "5%"}}>
                            <i>Forgot Password</i>
                            <a href="">Click here</a>
                        </div>
                    </div>
                </form>
            </div>
            </div>
            </div>
            </div>
        </div>
    );
}

export default Signup;
