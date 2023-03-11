import * as React from 'react';
import styled from '@mui/system/styled';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, CardActionArea, CardActions } from '@mui/material';


const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

export default function RowAndColumnSpacing({data,deleteIem}) {
  
  function deleteUser(id){
    deleteIem(id)
  }

  return (
    <Card sx={{ maxWidth: 300 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={data.image}
                  alt="green iguana"
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: "center" }}>
                  <Typography gutterBottom variant="h5" component="div" sx={{}}>
                   {data.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {/* Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica */}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', alignItems: "end" }}>
                <Button onClick={()=>{deleteUser(data.id)}} variant="outlined" startIcon={<DeleteIcon />} color="error">
                  Remove
                </Button>
               
              </CardActions>
            </Card>

  );
}