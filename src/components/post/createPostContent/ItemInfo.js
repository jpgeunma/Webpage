import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import {Input} from '@mui/material';
import Hashtag from './../../Hashtag'

import { useState } from 'react';
export default function ItenInfo() {

    const [pic, picUploaded] = useState([]);
    const [postCategory, setPostCategory] = useState("",[]);
    const [itemCategory, setItemCategory] = useState("",[]);

    const uploadPicture = (event) =>{
        const value = event.target;
        const formData = new FormData();
        formData.append('file', value.files[0]);
        picUploaded(URL.createObjectURL(event.target.files[0]));
    }

    const changePostCategory = (event) =>{
        setPostCategory(event.target.value);
    }
    const changeItemCategory = (event) =>{
        setItemCategory(event.target.value);
    }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} >
            <Box component="img" src={pic} alt="" sx={{height: 400, width: 450, maxHeight: {xs: 350, md: 230}, maxWidth: {xs: 430, md:300}}}/>
        </Grid>
        <Grid item xs={12}>
         <input 
            type="file"
            accept='image/*'
            onChange={uploadPicture}
         />
        </Grid>
        <Grid item xs={12} sm={6} >
          <TextField
            required
            id="title"
            name="title"
            label="Title"
            fullWidth
            autoComplete="title"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                <InputLabel>Post Category</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                value="category"
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
          />
        </Grid>
        <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel>Item Category</InputLabel>
                <Select
                labelId="demo-simple-select"
                value="category"
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
            <Hashtag />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}