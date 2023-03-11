
import './App.css'

import React, { useState, useEffect, useMemo } from "react";
import Navrbar from "./components/Navbar/Navbar"
import Cards from "./components/Cards/Cards"
import axios from "axios";
import Grid from '@mui/system/Unstable_Grid';
import { Box, Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import Dexie from "dexie"
// const Dexie = require("dexie");




function App() {

  const db = new Dexie("MyDatabase");
  db.version(1).stores({ people: "++id" });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
 


  async function userData() {

    try {

      const myTable = db.table('people');
      const results = await myTable.toArray();
      if (results.length === 0) {
        setLoading(true);
        let response = await axios.get("https://randomuser.me/api/?results=50")
        if (response) {
          let result = await response.data.results.filter((item) => item.name && item.picture)
            .map((item) => ({ name: `${item.name.first} ${item.name.last}`, image: item.picture.large, id: item.login.uuid }));
          db.table("people").bulkPut(result);
          const myTable = db.table('people');
          const results = await myTable.toArray();
          setData(result);
          setLoading(false);
        }
        setData(results);
        setLoading(false);

      }
      setData(results);
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    userData();
  }, [data])

  const deleteitem = (id) => {
    db.table("people")
      .where("id")
      .equals(id)
      .delete()
      .then(() => {
        setData((prevPeople) => prevPeople.filter((person) => person.id !== id));
      });
  }

  const refreshdata = async () => {

    await db.table('people').clear();
    window.location.reload(true)

  }







  return (

    <>
      <Navrbar />
     
      {loading ? (
        <div className="spinner">
        <CircularProgress />
     
      </div>
      ):(
        <div className="App">
       

        
        <Container sx={{paddingTop:"50px"}}>
          <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', }}>
                <Typography variant="h5" gutterBottom>
                  Total: {data.length}
                </Typography>
                <Button onClick={refreshdata} variant="contained" component="label" startIcon={<RefreshIcon />}>
                  Remove
                </Button>
              </Grid>
              {/* <Grid item xs={12}>
                    <Button variant="outlined" startIcon={<DeleteIcon />} color="error">
                  Remove
                </Button>
                    </Grid> */}
              {data.map((item, index) => (
                <Grid key={index} xs={6} sm={4} >
                  <Cards data={item} deleteIem={deleteitem} />
                </Grid>

              ))}

            </Grid>
          </Box>
        </Container>

      </div>
      )}
    
    </>
  )


}

export default App
