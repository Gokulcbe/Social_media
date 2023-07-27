import React, { useEffect } from 'react';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Cookies from 'js-cookie';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import Followers from './followers';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// import './Feed.css';
const currentDateTime= Date().toLocaleString()

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
      •
    </Box>
  );


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  
const Profile = () => {
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [bio, setBio] = React.useState('');
    const [city, setCity] = React.useState('');
    const [relation, setRelation] = React.useState('');
    const [data, setData] = React.useState([]);
    const [data1, setData1] = React.useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(getAuth(), user => {
      const response = '';
      axios.get(`http://127.0.0.1:8080/profile/get/${Cookies.get('email')}`)
        .then(response => {
          setData(response.data);
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });

        axios.get(`http://127.0.0.1:8080/Feed/get2/${Cookies.get('email')}`)
        .then(response => {
          setData1(response.data);
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
        
    });

    return unSubscribe;
  }, []);
  const handleSubmit = async(event) => {
    const data = {
        email : Cookies.get('email'),
        username : username,
        bio : bio,
        city : city,
        relation : relation,
    }
    event.preventDefault();
    try{
        const response = await axios.post("http://127.0.0.1:8080/Profile/add", data);
        console.log(response.data);
        setOpen(false);
    }
    catch(error){
        console.log("error : " + error);
    }
  };
    return (
        <div style={{marginTop: "3rem"}}>
            <Typography style={{fontSize: '20px', fontWeight: 'bold'}}>PROFILE</Typography>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: "10%", marginTop: '2%', }}>
            <div>
      <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500]}} style={{zIndex: 0, height: "150px", width: "150px"}} aria-label="recipe">
                {Cookies.get('email').charAt(0)}
              </Avatar>
            }
            style={{textAlign: "left", marginLeft:"1%"}}
            
            // title={Cookies.get('email')}
            // subheader={currentDateTime}
            />
      <div style={{display: 'block', marginRight: '10%'}}>

        <Button variant="outlined" onClick={handleClickOpen}>Edit Profile</Button>
        <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit your Profile
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div style={{alignContent: 'center'}}>
          <label class="text-inverse" style={{marginTop: '1%'}}>UserName</label>
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
            <label class="text-inverse" style={{marginTop: '1%'}}>Bio</label>
          <textarea
                required
                id="outlined-required"
                label="Bio"
                // defaultValue="Hello World"
                type="text"
                style={{width: '80%'}}
                rows='10'
                value={bio}
                onChange={e => setBio(e.target.value)} 
            />
            <label class="text-inverse" style={{marginTop: '1%'}}>Living in</label>
          <TextField
                required
                id="outlined-required"
                label="City"
                // defaultValue="Hello World"
                type="text"
                style={{width: '80%'}}
                value={city}
                onChange={e => setCity(e.target.value)} 
            />
            <label class="text-inverse" style={{marginTop: '1%'}}>RelationShip Status</label>
            <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={relation}
        onChange={e => setRelation(e.target.value)}
        name="radio-buttons-group"
        class="form-control2"
      >
         <FormControlLabel value="single" onChange={e => setRelation(e.target.value)} control={<Radio />} label="Single" />
        <FormControlLabel value="Commited"  onChange={e => setRelation(e.target.value)} control={<Radio />} label="Commited" />
        <FormControlLabel value="Married"  onChange={e => setRelation(e.target.value)} control={<Radio />} label="Married" />
        </RadioGroup>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
        </div>
      </div>
      <div>
      <div>
      <Typography style={{textAlign: 'left', fontStyle: 'italic', fontWeight: 'bold', fontSize: '20px', marginBottom: "5%", marginTop: 0}}>{Cookies.get('email')}</Typography>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: "2%"}}>
            {/* <Button><Typography style={{fontSize: '13px'}}>0 Posts</Typography></Button>
            <Button><Typography style={{fontSize: '13px'}}>0 Followers</Typography></Button>
            <Button><Typography style={{fontSize: '13px'}}>0 Following</Typography></Button> */}
            <Followers/>
        </div>
      </div>
      <div style={{display: 'block', marginTop: "10%", textAlign: 'left'}}>
        <Typography >{data.username}</Typography>
        <Typography style={{fontStyle:"italic", fontSize: "18px"}}>{data.bio}</Typography>
        <Typography>{data.relation}</Typography>
        <Typography>{data.city}</Typography>
      </div>
      </div>
        </div>
        
        <Divider style={{marginTop: '5%'}}/>
        
        <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
        <ImageList sx={{ width: 600, height: 450 }} cols={3} rowHeight={204}>
      {data1.map((item) => (
        <ImageListItem key={item.imgage}>
          <img
            src={`data:image/jpeg;base64,${item.image}`}
            srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
            />
        </ImageListItem>
      ))}
    </ImageList>
      </div>
        </div>
    );
}
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

export default Profile;
