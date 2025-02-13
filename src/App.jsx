import { CircularProgress, Container, Grid } from '@mui/material'
import './App.css'
import InputField from './components/InputField'
import ContentCard from './components/ContentCard'
import { useState } from 'react'

function App() {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Container maxWidth="xl">
        <InputField setPlaces={setPlaces} setIsLoading={setIsLoading} />
        {isLoading ? (
          <CircularProgress size={70} thickness={4} sx={{marginLeft: '50%', marginTop: '25%'}}/>
        ) : (
          <Grid
            container
            spacing={5}
            sx={{
              marginTop: '7%',
              marginLeft: '1%'
            }}
          >
            {places.map((place) => {
              return (
                <Grid item key={place.place.split(',')[0]} xs={4}>
                  <ContentCard place={place} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </>
  )
}

export default App
