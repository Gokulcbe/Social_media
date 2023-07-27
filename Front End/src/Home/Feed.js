import React, {Component}  from 'react';
import Avatar from '@mui/material/Avatar';
import './Feed.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Button from '@mui/material/Button';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import Cookies from 'js-cookie';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Divider } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Comments from './Comments.js'
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
class Feed extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            data : [],
            like: [],
            open: false,
            open2: false,
            comments: '',
            commentData : [],
            postContent : '',
            commentTemp: [],
        }
    }

    handleClickOpen(postId,d)  {
      this.setState({open:true});
      this.setState({comments:postId});
      this.setState({commentTemp: d});
      const response='';
      // axios.get('http://127.0.0.1:8080/Feed/get').then(response =>{this.setState({data: response.data});
      axios.get(`http://127.0.0.1:8080/Comment/get/${postId}`).then(response =>{this.setState({commentData: response.data});
      console.log("CommentData: ", response.data[0]);
      // console.log("Post ID: " , postId);
        })
        .catch(error => {console.log(error);
        });
    };
    handleClose=(event)=> {
      this.setState({open:false});
    }

    handleClickOpen2=(event)=>{
      this.setState({open2:true});
    }

    handleClose2=(event)=> {
      this.setState({open2:false});
    }

    handleComment=(event)=>{
      var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const data = {
        postId: this.state.comments,
        commentedBy : Cookies.get('email'),
        content : this.state.postContent,
        date: date,
      }
      const response='';
          // axios.get('http://127.0.0.1:8080/Feed/get').then(response =>{this.setState({data: response.data});
          axios.post(`http://127.0.0.1:8080/Comment/add`,data ).then(response =>{
          console.log("CommentData: ", response);
          // this.setState({commentData: response.data[0]})
          console.log("Post ID: " , this.state.comments);
          // const updatedData = this.state.data.map(item => {
          //   if (item.postId === this.state.comments) {
          //     return { ...item, commentCount: this.state.data.commentCount+1 };
          //   }
          //   return item;
          // });
        })
        .catch(error => {console.log(error);
        });
        axios.post(`http://127.0.0.1:8080/Feed/update/${this.state.comments}`).then(response => {
          console.log(response);
          const updatedData = this.state.data.map(item => {
            if (item.postId === this.state.comments) {
              return { ...item, commentCount: item.commentCount+1 };
            }
            return item;
          });
          this.setState({data:updatedData});
        }).catch(error => {console.log(error);
        });
        this.setState({postContent: ''});
        //

        //
        this.setState({open:false});
    }
    
    componentDidMount() {
        
        // Simulating async data fetching
        setTimeout(() => {
            const unSubscribe = onAuthStateChanged(getAuth(), user => {
                // this.setState({user: user.email, isLoading: true})
                // const response = axios.get(`http://127.0.0.1:8080/personaldetails/get/${user.email}`);
                // this.setState({data:response.data});
                const response='';
                // axios.get('http://127.0.0.1:8080/Feed/get').then(response =>{this.setState({data: response.data});
              //   axios.get(`http://127.0.0.1:8080/Feed/get/${Cookies.get('email')}`).then(response =>{this.setState({data: response.data});
              //   console.log("Feed: ", response);
              // })
              // .catch(error => {console.log(error);
              // });
              axios.get(`http://127.0.0.1:8080/Feed/get1/${Cookies.get('email')}`)
      .then(response => {
        this.setState({data: response.data});
        console.log("Feed: ", response);
      })
      .catch(error => {
        console.log(error);
      });
                axios.get(`http://127.0.0.1:8080/Like/get/${Cookies.get('email')}`).then(response => {this.setState({like: response.data});
                console.log("Like: " ,response);
                }).catch(error => {console.log(error);
                });
             
               
            });
            return unSubscribe;
        }, []);
      }
      likePost(postid, likeCount, d) {
        if (this.state.like.includes(postid)) {
          const likes = likeCount - 1;
          d.likeCount = likes;
      
          axios.post('http://127.0.0.1:8080/Feed/add', d)
            .then(response => {
              const updatedData = this.state.data.map(item => {
                if (item.postId === postid) {
                  return { ...item, likeCount: likes };
                }
                return item;
              });
      
              this.setState(prevState => ({
                data: updatedData,
                like: prevState.like.filter(value => value !== postid)
              }));
            })
            .catch(error => {
              console.log(error);
            });
      
          axios.delete(`http://127.0.0.1:8080/Like/delete/${postid}/${Cookies.get('email')}`)
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          const likes = likeCount + 1;
          d.likeCount = likes;
      
          axios.post('http://127.0.0.1:8080/Feed/add', d)
            .then(response => {
              const updatedData = this.state.data.map(item => {
                if (item.postId === postid) {
                  return { ...item, likeCount: likes };
                }
                return item;
              });
      
              this.setState(prevState => ({
                data: updatedData,
                like: [...prevState.like, postid]
              }));
            })
            .catch(error => {
              console.log(error);
            });
      
          const data = {
            likedBy: Cookies.get('email'),
            postId: d.postId,
          };
      
          axios.post('http://127.0.0.1:8080/Like/add', data)
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
      
    
    render(){
        
    return (
        <div style={{marginTop: "5rem"}}>
            <h1>Feed</h1>
            {this.state.data.map(d => (
                <div class="responsive-div">
                <div >
            <div className="center" style={{marginBottom: "3%"}}>
        <Card className="cardContainer" style={{marginTop: "0px", width: "100%"}}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} style={{zIndex: 0}} aria-label="recipe">
                {d.postedBy.charAt(0)}
              </Avatar>
            }
            style={{textAlign: "left"}}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={d.postedBy}
            subheader={d.postDate}
          />
          <CardMedia
            component="img"
            className="cardMedia"
            // image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn_KXt_mnaMZcw_vFGvsSUGtx4jQ497DR6HZG31p48gcK1w_soUKapLRNPSqcOI5-Ecq4&usqp=CAU"
            image={`data:image/jpeg;base64,${d.image}`}
            alt="Paella dish"
          />
          <CardContent className="cardContent" >
            <Typography variant="body2" color="text.secondary" style={{textAlign: "left"}}>
            {d.postContent}
            </Typography>
          </CardContent>
          <Divider/>
          <CardActions disableSpacing className="cardActions" >
            {/* {d.liked? <IconButton */}
            {this.state.like.includes(d.postId)?<IconButton
              aria-label="add to favorites"
              style={{color:"red"}}
              className={d.liked ? 'likedIcon' : ''}
            //   onClick={handleFavoriteClick}
            //   className={favorite ? 'favoriteIcon' : ''}
            >
              <FavoriteIcon onClick={() => this.likePost(d.postId, d.likeCount, d)}/> <Typography sx={{color: "black"}}>{d.likeCount}</Typography>
            </IconButton>:
            <IconButton
              aria-label="add to favorites"
              // style={{color:"red"}}
              className={d.liked ? 'likedIcon' : ''}
            //   onClick={handleFavoriteClick}
            //   className={favorite ? 'favoriteIcon' : ''}
            >
              <FavoriteIcon onClick={() => this.likePost(d.postId, d.likeCount, d)}/> <Typography sx={{color: "black"}}>{d.likeCount}</Typography>
            </IconButton>}
            <IconButton aria-label="comment" >
              <CommentIcon onClick={() => this.handleClickOpen(d.postId,d)}/> <Typography sx={{color: "black"}}>{d.commentCount}</Typography>
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon onClick={this.handleClickOpen2}/>
            </IconButton>
            
          </CardActions>
        </Card>
      </div>
      </div>
      </div>
      ))}

<BootstrapDialog
        onClose={this.handleClose}
        aria-labelledby="customized-dialog-title"
        open={this.state.open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={this.handleClose}>
          {this.state.data.commentCount} Comments
        </BootstrapDialogTitle>
            <DialogContent dividers>
          {this.state.commentData.map(d => ( 
           d.postId==this.state.comments ? ( 
            <div style={{alignContent: 'center'}}>
            {/* <Typography>{this.state.commentData}</Typography> */}
            <div className="center" style={{marginBottom: "3%"}}>
            <Card className="cardContainer" style={{marginTop: "0px", width: "100%"}}>
            <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} style={{zIndex: 0}} aria-label="recipe">
                {d.commentedBy.charAt(0)}
              </Avatar>
            }
            style={{textAlign: "left"}}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={d.commentedBy}
            subheader={d.date}
            />
            <Divider/>
            <CardContent className="cardContent" >
            <Typography variant="body2" color="black" style={{textAlign: "left"}}>
            {d.content}
            </Typography>
            </CardContent>
            <Divider/>
            </Card>
            </div>
            
            </div>
          ) : null
            ))}
            </DialogContent>
        <DialogActions>
          <div>

          <div><label class="text-inverse" style={{marginTop: '1%'}}>Post Your Comment:</label>
          {/* <div style={{marginLeft: "2%", marginTop: "2%"}}> */}
            <textarea 
                // value={commentText}
                placeholder='What do you think about this post?'
                value={this.state.postContent}
                onChange={e => this.setState({postContent : e.target.value})}
                // onChange={e=> this.setState({postContent: e.target.value})}
                rows="5" cols="75"  maxLength={80} style={{boxShadow: "5px 15px 5px 1px"}} />
                </div>
            <div style={{marginTop: '2%'}}>
          <Button autoFocus onClick={this.handleComment}>
            Post Comment
          </Button>
            </div>
                </div>
        </DialogActions>
      </BootstrapDialog>
            {/* {this.state.data.map(d => (
                
            
            <div class="responsive-div" key={d.postId} style={{marginTop: "0"}}>
                <div>

                <div class="border border-dark pb-3 rounded-lg" style={{width: "100%", background: "#fafad2"}}>
                    <div class="text-center p-1 mb-2 text-light " style={{background: "white", borderRadius: "15px"}}>
                        <div style={{marginLeft: 15, display: "flex", lineHeight:1}}>
                        <div class="icon">
                            <Avatar  style={{zIndex:-1}}>{d.postedBy.charAt(0)}</Avatar>
                        </div>
                        <div class="name">
                            <h3 >{d.postedBy}</h3>
                            <p style={{marginTop: "0.5%"}}>{d.postDate}</p>
                        </div>
                        </div>
                </div>
                <div class="post">
                    <p style={{textAlign: "left"}}>{d.postContent}</p>
                </div>
            </div>
                <div class="bottom" style={{marginBottom: "0%"}}>
                <div class="border border-dark pb-2 rounded-lg" style={{background: "white"}}>
                    <div style={{display: "flex", marginLeft: "3%"}}>

                    <div style={{textAlign: "left"}}>{d.likeCount}<span> likes</span></div>
                    <div style={{marginLeft: "70%"}}>{d.commentCount}<span> Comment</span></div>
                    </div>
                    <div class="like">
                        <Button startIcon={<ThumbUpIcon/>} style={{marginRight: "20%"}} onClick={() => this.likepost(d.postId, d.likeCount, d)}>Like</Button>
                        <Button startIcon={<ChatBubbleOutlineIcon/>}>Comment</Button>
                    </div>
                </div>
                </div>
            </div>
            </div>
            ))} */}
            </div>
    );
}
}

export default Feed;
