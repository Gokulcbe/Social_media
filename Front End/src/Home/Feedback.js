import React from 'react';
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
// import useUser from "../hooks/useUser";
import { useEffect, useState } from 'react';
import Button from '@mui/joy/Button';
import TextField from '@mui/material/TextField';

const Feedback = () => {
    // const [ experience, setExperience ] = useState('');
    const [ commentText, setCommentText ] = useState('');
    // const [areas, setAreas ] = useState('');
    const [value, setValue] = React.useState(2);
    const navigate = useNavigate();

    const addComment = async () =>{
        // const token = user && await user.getIdToken();
        // const headers = token ? {authtoken: token} : {};
        const response = await axios.post(`http://127.0.0.1:2020/feedback/addf`, {
            email: Cookies.get("email"),
            experience: commentText,
            // areas: areas,
            star: value,
        },);
        alert("Sucessfully Submitted Feedback");
        navigate('/Home')
        // const updatedArticle = response.data;
        // // onArticleUpdated(updatedArticle);
        // setName('');
        // setCommentText('');
    }

    return (
        <div>
             <div class="border border-dark pb-3 rounded-lg" style={{width: "90%", maxWidth: "700px", margin: "0 auto", marginTop: "5rem"}}>
            <div class="text-center p-1 mb-2 text-light " style={{background: "DodgerBlue"}}>
            <h2>Hi 👋</h2>
            <h4>Have Feedback? We love to hear it</h4>
          {/* {email && <p>You are posting as <span style={{fontSize: "18px", fontWeight: "bold"}}>{email}</span></p>} */}
            </div>
            <form id="logf">
            <div><div class="form-group ml-3 mr-3">
            <input 
                disabled
                id="logfiu1"
                class="form-control1"
                type="email"
                value={Cookies.get("email")}
                style={{width: "80%", marginTop: "10px"}}
                placeholder='Your Email'
                // onChange={this.handlemailidchange}
                // required
                />
            </div>
            {/* <TextField id="outlined-basic" label="Experience" variant="outlined" onChange={e => setExperience(e.target.value)}/>
            <TextField id="outlined-basic" label="Areas" variant="outlined" onChange={e => setAreas(e.target.value)}/> */}
            <div>
            <textarea 
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                rows="12" cols="80"
                style={{maxWidth: "80%", marginTop: "10px"}}
                placeholder="Your FeedBack"/>
                
            </div>
            <div style={{marginTop: "20px"}}>
            <Typography component="legend">Rate Your Experience Out of 5</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        size="large"
        onChange={e=>
          setValue(e.target.value)
        }
      />
            </div></div>
            <div>
            <Button class="form-control1" style={{background: "#4CAF50", color: "#ffffff", width: "20%", display: "block",marginLeft:"40%", marginTop: "15px" }} onClick={addComment} type="submit">Add Feedback</Button>
            </div>
            </form>

        </div>
        </div>
    );
}

export default Feedback;
