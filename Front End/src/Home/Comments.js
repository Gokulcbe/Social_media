import React, { useState } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
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

const Comments = () => {
    const [open, setOpen] = useState(false);
    
    const handleClickOpen=(event)=>  {
        // this.setState({open:true});
        setOpen(true);
      };
    const handleClose2=(event)=> {
        // this.setState({open:false});
        setOpen(false);
      }

    return (
        <div>
             
        <BootstrapDialogTitle id="customized-dialog-title" onClose={this.handleClose2}>
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
                // value={userName}
                // onChange={e => setUserName(e.target.value)} 
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
                // value={bio}
                // onChange={e => setBio(e.target.value)} 
            />
            <label class="text-inverse" style={{marginTop: '1%'}}>Living in</label>
          <TextField
                required
                id="outlined-required"
                label="City"
                // defaultValue="Hello World"
                type="text"
                style={{width: '80%'}}
                // value={city}
                // onChange={e => setCity(e.target.value)} 
            />
            
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus >
            Save changes
          </Button>
        </DialogActions>
      {/* </BootstrapDialog> */}
        </div>
    );
}

export default Comments;
