import { Container, Grid } from '@mui/material'
import './App.css'
import InputField from './components/InputField'
import ContentCard from './components/ContentCard'
import { useState } from 'react'

function App() {
  const [places, setPlaces] = useState([]);

  return (
    <>
      <Container maxWidth="lg" >
        <InputField setPlaces={setPlaces} />
        <Grid container spacing={8} sx={{
          marginTop: '0.5%',
        }}>
          {places.map((place) => {
            console.log(place)
            return (
              <Grid item key={place.place.split(',')[0]} xs={4}>
                <ContentCard place={place} />
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </>
  )
}

export default App
