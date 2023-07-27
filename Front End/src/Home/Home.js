import React, { useState } from 'react';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Cookies from 'js-cookie';
import Feed from './Feed';
import Message from './Message';
import AddPost from './AddPost';
import Profile from "./Profile"
import {Navigate, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import SendIcon from '@mui/icons-material/Send';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { DonutLargeRounded } from '@mui/icons-material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Search from './Search';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Feedback from './Feedback';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const Home = () => {
    const navigate = useNavigate();
    const currentDateTime= Date().toLocaleString()
    const [value, setValue] = React.useState('Home');
    const [selectedFile, setSelectedFile] = useState(null);

    const [postContent, setPostContent] = useState('');

    const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleContent = (event) => {
        setPostContent(event.target.value);
    }

    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };

    const handleLogout =() => { 
      Cookies.remove("email");
      navigate("/");
    }

    const handleFeedback =() => {
      navigate("/feedback");
    }

    const handleUpload = () => {
      var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const formData = new FormData();
      formData.append('imageFile', selectedFile);
      formData.append('postContent', postContent);
      formData.append('postDate', date);
      formData.append('likeCount', 0);
      formData.append('commentCount', 0);
      formData.append('postedBy', Cookies.get("email"));

      axios.post('http://127.0.0.1:8080/Feed/add1', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          console.log('Image and data uploaded successfully:', response.data);
          setOpen(false);
          // Handle successful response
        })
        .catch((error) => {
          console.error('Error uploading image and data:', error);
          // Handle error
        });
    };

    // const handlePost = async(event) =>{
    // var today = new Date(),
    // date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //     const data = {
    //         postContent : postContent,
    //         postDate : date,
    //         likeCount : 0,
    //         commentCount : 0,
    //         postedBy : Cookies.get("email"),

    //     }
    //     event.preventDefault();
    //     try{
    //         // console.log("c" ,postContent);
    //         // console.log("d" , postDate);
    //         // console.log("p", postedBy);
    //         const response = await axios.post("http://127.0.0.1:8080/Feed/add", data);
    //         console.log(response.data)
    //         setOpen(false);
    //     }
    //     catch (error) {
    //         console.error('Error:', error);
    //       }
    // }

    return (
        <div>
            
            <BottomNavigation sx={{ width: "100%" ,position: "fixed", top: 0, left: 0, height: "50px", zIndex: 1}} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Home"
        value="Home"
        icon={<HomeIcon />}
        onClick={() => navigate('/Home')}
      />
      <BottomNavigationAction
        label="Search"
        value="Search"
        icon={<PersonSearchIcon />}
        onClick={() => navigate('/search')}
      />
      {/* <BottomNavigationAction
        label="Message"
        value="Message"
        icon={<MessageIcon />}
        onClick={() => navigate('/message')}
      /> */}
      <BottomNavigationAction
        label="Add Post"
        value="Add Post"
        icon={<AddBoxIcon />}
        // onClick={() => navigate('/addpost')}
        onClick={handleClickOpen}
      /> <Dialog
      fullScreen
        style={{marginTop: "5%"}}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative', width: "100%"}}>
        <Toolbar >
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Cancel
          </Typography>
          {/* <Button autoFocus color="inherit" onClick={handlePost}> */}
          <Button autoFocus color="inherit" onClick={handleUpload}>
            Send Post <SendIcon/>
          </Button>
        </Toolbar>
      </AppBar>
      <div>
      <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} style={{zIndex: 0}} aria-label="recipe">
                {Cookies.get('email').charAt(0)}
              </Avatar>
            }
            style={{textAlign: "left", marginLeft:"1%"}}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={Cookies.get('email')}
            subheader={currentDateTime}
            />
      </div>
        <div sx={{marginTop: "10%"}}>

            <Typography sx={{marginLeft: "2%"}}>Write a post:</Typography>
            <div style={{marginLeft: "2%", marginTop: "2%"}}>
            <textarea 
                // value={commentText}
                // onChange={e => setCommentText(e.target.value)}
                placeholder='What do you want to talk about?'
                value={postContent}
                rows="20" cols="60"  style={{boxShadow: "15px 25px 15px 1px"}} onChange={handleContent}/>
                </div>

        </div>
        <div>
            <Button style={{variant:"contained", color: "blue", marginLeft: "2%", marginTop: "3%", size: "large", backgroundColor: "grey"}}><AddPhotoAlternateIcon/></Button>
            {/* <Typography style={{marginLeft: "2%"}} type="file" onChange={handleFileChange}>Add Image</Typography> */}
            <input type="file" onChange={handleFileChange} />
        </div>
          
    </Dialog>
   
      <BottomNavigationAction 
      label="Profile" 
      value="Profile" 
      icon={<AccountCircleIcon />}
      onClick={() => navigate('/profile')}
      />

<Button  aria-controls={open1 ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open1 ? 'true' : undefined}
        onClick={handleClick}>
          {/* <BottomNavigationAction 
      label="More" 
      value="More" 
      icon={<MoreVertIcon />}
      onClick={() => navigate('/profile')}
      /> */}
      <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open1}
        onClose={handleClose1}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/* <MenuItem onClick={handleClose1}>Profile</MenuItem> */}
        <MenuItem onClick={handleFeedback}>FeedBack</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </BottomNavigation>
    
    {/* <h1 style={{marginTop: "5%"}}>Connect</h1> */}
    <div>
                {
                (() => {
                    if(window.location.pathname==='/Home'){
                        return <Feed/>
                    }
                    if(window.location.pathname==='/message'){
                        return <Message/>
                    }
                    if(window.location.pathname==='/addpost'){
                        return <AddPost/>
                    }
                    if(window.location.pathname==='/profile'){
                        return <Profile/>
                    }
                    if(window.location.pathname==='/search'){
                      return <Search/>
                    }
                    if(window.location.pathname==='/feedback'){
                      return <Feedback/>
                    }
                })()}
            </div>
        </div>
    );
}

export default Home;
