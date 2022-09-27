import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ItenInfo from './createPostContent/ItemInfo';
import ItemFinalReview from './createPostContent/ItemFinalReview';
import Hashtag from './../Hashtag'
import { useState, memo } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import styled, {css} from 'styled-components';
import FormControlLabel from '@mui/material/FormControlLabel';
import $ from "jquery";
import { Button, FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import { LineAxisOutlined } from '@mui/icons-material';
import axios from "axios";
import { Cookies } from 'react-cookie';
import AuthenticationService from '../../service/AuthenticationService';
import Header from "../Header";
import ImageSlider from './component/ImageSlider';

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

function validationForm(body){
  try{
    if(body.get("title") === "")
      throw "no title"
    if(body.get("content") === "")
      throw "no content"
  } catch (e) {
    console.log(e);
    return e;
  }

}

const steps = ['製品情報入力', '情報確認'];



const theme = createTheme();

export default function CreatePost() {
  const [activeStep, setActiveStep] = useState(0);
  
  const [postCategory, setPostCategory] = useState("",[]);
  const [itemCategory, setItemCategory] = useState("",[]);
  const [imageFiles, setImageFiles] = useState([], []);
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState(null);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [hashtags, setHashtags] = useState([]);

  const formData = new FormData();

  const cookies = new Cookies();

  let body = {
    title: title,
    itemCategory: itemCategory,
    postCategory, postCategory,
    price: price,
    content: content,
    location: location,
    hashtags: hashtags,
    imageFiles: imageFiles,
  };

  const handleNext = (event) => {
    setActiveStep(activeStep + 1);
    handleSubmit(event);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = (event) =>{
    console.log("handleSubmit ", body);
    if(validationForm(body) !== ""){
      body.content = body.content.target.value;
      body.location = body.location.target.value;
      body.title = body.title.target.value;
      body.price = body.price.target.value;
      //formData.append("PostsSaveRequestDto", new Blob([JSON.stringify(body)], {type: "application/json"}));
      AuthenticationService.CreateBoardService(body);
      // axios.post(
      //   "http://localhost:8080/api/v1/posts/save",
      //   formData,
      //   {
      //     headers: {
      //       Authorization: "Bearer " + cookies.get("token"),
      //       "Content-Type": "multipart/form-data",
      //     }
      //   }
      // )

      console.log(formData);
    }

  }

  const uploadPicture = (event) =>{
    setImageFiles(Array.prototype.slice.call(event.target.files));
    console.log("imagefiles ", imageFiles);
  }

  const changePostCategory = (event) =>{
      setPostCategory(event.target.value);
  }
  const changeItemCategory = (event) =>{
      setItemCategory(event.target.value);
  }


  return (
    <ThemeProvider theme={theme}>
      <Header />
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
        {/* 상품 헤더 등록 */}
        {/* <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            商品登録
          </Typography>
        </Toolbar> */}
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
                {activeStep === 0 ? (
                      <React.Fragment>
                      <Typography variant="h6" gutterBottom>
                        Shipping address
                      </Typography>
                      {/* 상품정보 입력 */}
                      <Grid container spacing={3}>
                        <Grid item xs={12} >
                            {/*<Box component="img" src={pic} alt="" sx={{height: 400, width: 450, maxHeight: {xs: 350, md: 230}, maxWidth: {xs: 430, md:300}}}/> */}
                          <ImageSlider imageFiles = {imageFiles} />
                        </Grid>
                        {/* 사진 업로드 버튼 */}
                        <Grid item xs={12}>
                         <input 
                            type="file"
                            accept='image/*'
                            multiple="multiple"
                            onChange={uploadPicture}
                         />
                        </Grid>
                        {/* 포스팅 내용 */}
                        <Grid item xs={12} sm={6} >
                          <TextField
                            required
                            id="title"
                            name="title"
                            label="Title"
                            fullWidth
                            autoComplete="title"
                            variant="standard"
                            onChange={setTitle}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                                <InputLabel>Post Category</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                label="category"
                                fullWidth
                                value={postCategory}
                                onChange={changePostCategory}
                                >
                                <MenuItem value={'커뮤니티'}>커뮤니티</MenuItem>
                                <MenuItem value={'직거래'}>직거래</MenuItem>
                                <MenuItem value={'질문'}>질문</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            id="content"
                            name="content"
                            label="商品説明"
                            fullWidth
                            autoComplete="shipping address-line1"
                            variant="standard"
                            onChange={setContent}
                          />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Item Category</InputLabel>
                                <Select
                                labelId="demo-simple-select"
                                label="category"
                                fullWidth
                                value={itemCategory}
                                onChange={changeItemCategory}
                                >
                                <MenuItem value={'스포츠'}>스포츠</MenuItem>
                                <MenuItem value={'가구'}>가구</MenuItem>
                                <MenuItem value={'전자기기'}>전자기기</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="price"
                            name="price"
                            label="Price"
                            fullWidth
                            autoComplete="shipping address-level2"
                            variant="standard"
                            onChange={setPrice}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="state"
                            name="state"
                            label="State/Province/Region"
                            fullWidth
                            variant="standard"
                            onChange={setLocation}
                          />
                        </Grid>
                        <Grid item xs={12}>
                            <Hashtag onChange={setHashtags}/>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  ) : (
                    <ItemFinalReview/>)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {/* 되돌아가기 버튼 */}
                  {/* {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )} */}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? '確認' : '商品登録'}
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




const PContents = styled.textarea`
  display: block;
  float: left;
  font-size: 14px;
  width: 560px;
  box-shadow: 0 1px 3px 0 hsl(0deg 0% 86% / 30%);
  box-sizing: border-box;
  border-radius: 2px;
  background: #fff;
  border: 1px solid #d9d9d9;

  cursor: pointer;
`;

const Reset = styled.button`
  display: block;
  float: left;
  padding: 0;
  line-height: 44px;
  font-size: 16px;
  width: calc((97% - 46px) / 3);
  margin-right: 0;
  height: 46px;
  box-shadow: 0 1px 3px 0 hsl(0deg 0% 86% / 30%);
  font-weight: 400;
  box-sizing: border-box;
  border-radius: 2px;
  background: #fff;
  border: 1px solid #d9d9d9;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  color: #333;
  cursor: pointer;
`;

const Submit = styled.button`
  flex: 1 1 0%;
  margin-right: 1%;

  display: block;
  float: left;
  padding: 0;
  line-height: 44px;
  font-size: 16px;
  width: calc((97% - 46px) / 3);
  height: 46px;
  border-color: transparent;
  background: #f1c333;
  color: #fff;
  box-shadow: 0 1px 3px 0 hsl(0deg 0% 86% / 30%);
  font-weight: 400;
  box-sizing: border-box;
  border-radius: 2px;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
`;

const DimmedBackground = styled.div`
  display: none;
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: #333;
  opacity: 0.5;
  z-index: 150;
`;

const ContentRel = styled.div`
  position: relative;
  padding-bottom: 64px;
  background: #fff;
`;
const StickyStart = styled.div`
  position: absolute;
  top: 25px;
`;

const InnerWMobileFull = styled.div`
  width: 1056px;
  margin: 0 auto;
  position: relative;
`;

const ImgSection = styled.section`
  padding: 36px 0;
  width: 560px;
  display: block;
`;

const ImagePreviewUiSlider = styled.div`
  touch-action: pan-y;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
`;

const OuterFrame = styled.div`
  overflow: hidden;
`;

const ImgViewInnerFrame = styled.ul`
  margin-left: 0px;
  overflow: hidden;
  cursor: zoom-in;
  width: 100000px;
  height: 100%;
  position: relative;
`;

const UiSlider = styled.li`
  width: 520px;
  display: list-item;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  height: auto;
  float: left;
  list-style: none;

  &:first-child {
    display: block;
  }

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const WelcomeDeal = styled.img`
  position: absolute;
  width: 72px !important;
  height: 72px !important;
  left: 10px;
  bottom: 10px;
`;

const FieldsetUiControl = styled.fieldset`
  margin-top: 0;
  display: block;
  border: 0 none;
  text-align: center;
  padding: 0;
  margin: 0;
`;

const BtnPrev = styled.button`
  left: 0;
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 0;
  border: 0 none;
  background: #0000004d;
  transition: opacity 0.3s ease;
  top: 50%;
  margin-top: -52px;
  // opacity: 0;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
`;

const BtnNext = styled.button`
  right: 0;
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 0;
  border: 0 none;
  background: #0000004d;
  transition: opacity 0.3s ease;
  top: 50%;
  margin-top: -52px;
  // opacity: 0;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
`;

const ImgListI = styled.i`
  color: #fff;
  font-size: 16px;
  display: inline-block;
  font-weight: bold;
  line-height: 16px;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
`;

const ImgListIndicator = styled.ul`
  margin: 0;
  margin-top: 8px;
  overflow: hidden;
  text-align: center;
  font-size: 0;
  display: inline-block;
  vertical-align: middle;
  padding: 0;
  border: 0 none;

  li {
    cursor: pointer;
    font-size: 0;
    display: inline-block;
    margin-left: 2px;
    width: 56px;
    height: 56px;
    background-repeat: no-repeat;
    background-position: center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    &:first-child {
      margin-left: 0;
    }

    &.active {
      border: 2px solid #f1c333;
    }
  }
`;

const StickyAsideProductD = styled.aside`
  padding: 12px;
  background-color: #fff;

  @media (min-width: 720px) {
    padding: 16px;
    position: absolute;
    right: 1px;
    top: 36px;
    width: 472px;
    z-index: 98;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: 0 2px 4px 0 #0000001a;
    -moz-box-shadow: 0 2px 4px 0 #0000001a;
    box-shadow: 0 2px 4px 0 #0000001a;
    border: solid 1px #f5f5f5;

    &.fixed {
      position: fixed;
      left: 50%;
      margin-left: 55px;
      top: 10px;
    }
  }

  &.product_detail {
    padding: 0 !important;
    -webkit-box-shadow: none !important;
    -moz-box-shadow: none !important;
    box-shadow: none !important;
    border: none !important;
  }
`;

const StickyAsideDiv = styled.div`
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 #0000001a;
  border: solid 1px #f5f5f5;
`;

const ArtistCard = styled.div`
  margin-bottom: 12px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
`;

const ArtistCardSplit = styled.div`
  display: table-cell;
  vertical-align: top;
  width: 75%;
`;

const ArtistCardSplitA = styled.a`
  display: block;
  width: 100%;
`;
const ArtistCardImg = styled.div`
  background-image: url("https://image.idus.com/image/files/7a637cb4c313453fb03bd1edbb0868c6_324.jpg");
  display: inline-block;
  vertical-align: top;
  font-size: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 6px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const ArtistCardLabel = styled.div`
  margin-top: 2px;
  display: inline-block;
  vertical-align: top;
  max-width: 80%;
  font-size: 14px;
  color: #666;
`;

const ArrowR = styled.i`
  color: #999;
  font-size: 12px;
  margin-bottom: 2px;
  margin-left: 2px;
  display: inline-block;
  vertical-align: middle;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  font-family: "Font Awesome 5 Free";

  //   &:before {
  //     content: "\e909";
  //   }
`;

const ArtistCardSplitt = styled.div`
  width: 25%;
  text-align: right;
  display: table-cell;
  vertical-align: top;
`;

const StickyAsideProducTitle = styled.h2`
  display: block;
  font-size: 15px;
  color: #333;
  margin-bottom: 12px;
`;

const PriceTagD = styled.div`
  margin-bottom: 8px;
`;

const StickyAsideMRight = styled.mark`
  display: flex;
  align-items: flex-start;
  float: right;
  color: #666666;
  font-size: 14px;
  background: none;
`;

const LikeBtn = styled.button`
  width: 24px;
  height: 100%;
  outline: none;
  -webkit-tap-highlight-color: transparent;
`;

const ProductDetailStarTxt1 = styled.div`
  height: 36px;
  width: 100%;
`;

const ProductDetailStarTxt2 = styled.div`
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductDetailStarTxt2I = styled.i`
  font-size: 24px;
  color: #666666;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
`;

const ProductDetailStarTxt3 = styled.div`
  position: relative;
`;

const ProductDetailStarTxt3P = styled.p`
  position: absolute;
  top: 0;
  width: 100px;
  left: -39px;
  font-size: 10px;
  line-height: 1;
  color: #666666;
`;

const ProductDetailShareBtn = styled.button`
  margin-left: 16px;
  margin-right: 4px;
  margin-top: 2px;
`;

const ProductDetailShare = styled.div`
  height: 25px;
`;

const ShareIcon = styled.i`
  color: #666;
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
`;

const ProductDetailSpan = styled.span``;

const PriceTagHilight = styled.span`
  padding-right: 8px;
  color: #ff4b50;
  font-size: 24px;
`;

const PriceTagHilightEm = styled.em`
  font-size: 24px;
  font-weight: bold;
`;

const PriceTagStrong = styled.span`
  padding-right: 6px;
  font-size: 15px;
  color: #333;
`;

const PriceTagCrossout = styled.span`
  font-size: 14px;
  color: #999;
`;

const Maker = styled.div``;

const PricetagD2 = styled.div`
  height: 20px;
  margin-bottom: 16px;
`;

const MarkR = styled.mark`
  float: right;
  color: #666666;
  font-size: 14px;
  background: none;
`;

const CountUp = styled.span`
  color: #666666;
  font-weight: bold;
`;

const DarkSpan = styled.span`
  color: #666666;
`;

const DataRow = styled.div`
  padding-bottom: 8px;
  position: relative;
`;

const DataRowTable = styled.table`
  table-layout: fixed;
  width: 100%;
  box-sizing: border-box;
`;

const DataRowTr = styled.tr`
  color: inherit;
  font-size: inherit;
`;

const TitleTd = styled.td`
  width: 80px;
  font-size: 14px;
  color: #666666;
`;

const TitleDiv = styled.div`
  width: 80px;
  font-size: 14px;
  color: #666666;
`;

const ContenetTd = styled.td`
  color: #333333;
  font-size: 14px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const DataRowSpan = styled.span`
  font-weight: bold;
`;

const Balloon = styled.div`
  position: relative;
  display: inline-block;
  height: 18px;
  margin-left: 8px;
`;

const BalloonIcon = styled.i`
  font-size: 18px;
  color: #666666;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
`;

const BalloonContent = styled.div`
  display: none;
  width: 220px;
  position: absolute;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 2px 2px 4px 0 rgb(0 0 0 / 30%);
  border: solid 1px #666666;
  background-color: rgba(255, 255, 255, 0.92);
  left: 120px;
  top: 0;
  z-index: 101;
`;

const BalloonBtn = styled.button`
  font-size: 12px;
  text-align: left;
  display: inline-block;
  width: 100%;
  color: #666666;
  display: none !important;
`;

const CloseIcon = styled.i`
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
`;

const PointBal = styled.div`
  display: initial;
  font-size: 12px;
  text-align: left;
  display: inline-block;
  width: 100%;
  color: #666666;
`;

const PointBalTable = styled.table`
  display: table;
  table-layout: fixed;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
`;

const PointBalTr = styled.tr`
  height: 20px;
  color: inherit;
  font-size: inherit;
`;

const PointBalTd = styled.td`
  width: 80%;
  text-align: left;
  display: table;
`;

const PointBalTd2 = styled.td`
  text-align: right;
  width: 20%;
`;

const VipSection = styled.table`
  margin-top: 8px;
  height: 40px;
  table-layout: fixed;
  width: 100%;
  box-sizing: border-box;
  table-layout: fixed;
  width: 100%;
  // -webkit-box-sizing: border-box;
  box-sizing: border-box;
`;

const VipSectionDiv = styled.p`
  border-top: 1px solid #d9d9d9;
  color: inherit;
  font-size: inherit;
`;

const VipSectionTr = styled.tr`
  color: inherit;
  font-size: inherit;
`;

const VipSectionTd = styled.td`
  float: left;
`;

const VipSectionTdR = styled.td`
  float: right;
`;

const VipSectionA = styled.a`
  color: #f1c333;
  color: #f1c333 !important;
`;

const VipSectionDesc = styled.p`
  font-size: 12px;
  color: #999999;
`;

const ReviewRateBox = styled.div`
  display: flex;
`;

const ReviewRateBoxA = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1.5;
  color: #666666;
`;

const ReviewRateDiv = styled.div`
  padding-top: 1px;
`;

const ReviewRateSpan = styled.span`
  display: flex;
  margin-bottom: 4px;
  vertical-align: middle;
  box-sizing: border-box;
  line-height: 1.5;
`;

const Star = styled.i`
  font-size: 15px;
  color: #ffc500 !important;
  display: inline-block;
  vertical-align: middle;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
`;

const ReviewRateDivLeft = styled.div`
  margin-left: 3px;
`;

const ReviewRateDivTop = styled.div`
  margin-top: 2px;
`;

const ReviewRateDivTopI = styled.i`
  font-size: 12px;
  color: #999999;
`;

const Subcontent = styled.span`
  font-size: 12px;
  color: #999999;
`;

const DeliveryHeaderDiv = styled.div`
  display: flex;
  justify-content: left;
`;

const DeliveryHeaderP = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #333333;
  display: inline-block;
`;

const DeliveryHeaderPB = styled.div`
  font-weight: bold;
  margin-left: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: #333333;
  display: inline-block;
`;

const DeliveryHeaderPCom = styled.div`
  margin-right: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: #333333;
  display: inline-block;
`;

const BuyScrollable = styled.div`
  margin-top: 16px;
  position: relative;
`;

const SelectGroupTriggerBtn = styled.button`
  width: 100%;
  color: #333;
  //   font-size: 12px;
  text-align: left;
  border-color: #666;
  position: relative;
  padding: 0 16px;
  line-height: 30px;

  box-shadow: 0 1px 3px 0 hsl(0deg 0% 86% / 30%);
  font-weight: 400;
  box-sizing: border-box;
  display: inline-block;
  border-radius: 2px;
  background: #fff;
  border: 1px solid #d9d9d9;
  vertical-align: middle;

  transition: border-color 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  margin: 0;
  text-decoration: none;
  cursor: pointer;
`;

const IdusIconArrowDown = styled.i`
  font-size: 12px;
  color: #333;
  position: absolute;
  right: 12px;
  top: 7px;
`;

const QuotaMessageDiv = styled.div`
  margin: 10px 0 5px;
  color: #666666;
  font-size: 12px;
`;

const IdusIconIf = styled.i`
  display: inline-block;
  vertical-align: middle;
  margin-right: 2px;
  font-size: 14px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
`;