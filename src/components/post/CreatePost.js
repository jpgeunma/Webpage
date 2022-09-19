import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ItenInfo from './createPostContent/ItemInfo';
import ItemFinalReview from './createPostContent/ItemFinalReview';
import HashTag from './../Hashtag'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['製品情報入力', '情報確認'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ItenInfo />;
    case 1:
      return <ItemFinalReview />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            商品登録
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
// import React from "react";
// import { useState } from "react";
// import AuthenticationService from "../service/AuthenticationService";
// import { useNavigate } from "react-router";
// import { useRef } from "react";
// import { Cookies } from "react-cookie";
// import Tag from "./Hashtag";
// const cookies = new Cookies();

// export default function CreatePost(props) {
    
//     const navigate = useNavigate();

//     const [inputs, setInputs] = useState({
//         pictures: new FormData(),
//         type: '1',
//         title: '',
//         content: '',
//         author: '',
//         hashtag: [""]
//     });

//     const postInput = useRef();

//     const {pictures, type, title, content, author, hashtag} = inputs;
//     const changeType = (event) => {
//         event.preventDefault();
//         const {value} = event.target;
//         setInputs({
//             ...inputs,      // 그 전 값 복사
//             type : value
//         });
//     }
//     const changeTitle = (event) => {
//         event.preventDefault();
//         const {value} = event.target;
//         setInputs({
//             ...inputs,      // 그 전 값 복사
//             title : value
//         });
//     }
//     const changeContent = (event) => {
//         event.preventDefault();
//         const {value} = event.target;
//         setInputs({
//             ...inputs,      // 그 전 값 복사
//             content : value
//         });
//     }

//     const changePictures = (event) => {
//         event.preventDefault();
//         const value = event.target;
//         const formData = new FormData();
//         console.log("files ", value.files[0]);
//         formData.append('file',  value.files[0]);
//         setInputs({
//             ...inputs,
//             pictures : formData,
//         })
//         console.log("test ", inputs.pictures.has('file'));
//     }



//     const createBoard = (event) => {
//         inputs.author = cookies.get("email");
//         console.log("createBoard " + inputs.author);
//         console.log("createBoard title " + inputs.title);
//         console.log("createBoard content " + inputs.content);
//         console.log("createBoard pictures " + inputs.pictures);
//         console.log("createBoard event " + event);
//         AuthenticationService.CreateBoardService(inputs).then((res) => {
//        ui      console.log(res);
//             navigate('/', {replace: true});
//         });
        
//     }

//     const cancel = () => {
//         navigate('/', {replace: true});
//     }



//     return (
//             <div>
//             <div className = "container">
//                 <h3 className="text-center">새글을 작성해주세요</h3>
//                 <div className = "card-body">
//                     <form>
//                         <div className="button">
//                             <input type="file" accept="image/*" onChange={changePictures}/>
//                             <label htmlFor="image">choose file</label>
//                         </div> 
//                         <div className = "form-group">
//                             <label> Type </label>
//                             <select placeholder="type" name="type" className="form-control" 
//                             value={type} onChange={changeType}>
//                                 <option value="1">자유게시판</option>
//                                 <option value="2">질문과 답변</option>
//                             </select>
//                         </div>
//                         <div className = "form-group">
//                             <label> Title </label>
//                             <input type="text" placeholder="title" name="title" className="form-control" 
//                             value={title} onChange={changeTitle}/>
//                         </div>
//                         <div className = "form-group">
//                             <label> Contents  </label>
//                             <input placeholder="contents" name="contents" className="form-control" 
//                             value={content} onChange={changeContent}/>
//                         </div>
//                         <Tag />

//                             {/* button은 기본적type을 summit으로 가진다--> 2번씩 메세지를 보내서 쥐소 되는 문제가 발생 그래서 type='button'으로 함 */}
//                         <button className="btn btn-success" onClick={createBoard} type="button">Save</button>
//                         <button className="btn btn-danger" onClick={cancel} style={{marginLeft:"10px"}}>Cancel</button>
//                     </form>
//                 </div>
//             </div>

//         </div>
//     )
// }