import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Container from '@mui/material/Container';
import "./searchbar.css"
import { useFreelancesStore } from '../../context/FreelancesContext';

export default function SearchBar() {
  const freelancesStore = useFreelancesStore()

  function getFreelances() {
    freelancesStore.getFreelances()
  }

  return (
    <>
      <Container sx={{ minWidth: "200px", marginTop: "2vh", display: "flex", alignItems: "center", flexDirection: "column"}}>
        <Box
          sx={{
            width: "60%",
            backgroundColor: "whitesmoke",
            borderRadius: "5px"
          }}
        >
          <TextField fullWidth label="Recherchez un freelance" id="fullWidth" />
        </Box>
        <Stack direction="row" spacing={2} sx={{ width: "60%", marginTop: "2vh"}}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            sx={{ width: "70%",
              backgroundColor: "whitesmoke",
              borderRadius: "5px"
            }}
            options={villesDeFrance.map((option) => option.title)}
            renderInput={(params) => <TextField {...params} label="Ville" />}>
          </Autocomplete>
          <Button variant="contained" 
            endIcon={<SendIcon />}
            sx={{ 
              Width: "auto", 
              minWidth: "120px", 
              backgroundColor: "rgba(73,115,255,1)"
            }}
            onClick={() => {getFreelances()}}
          >
            Chercher
          </Button>
        </Stack>
      </Container>
    </>
  );
}

const villesDeFrance = [
  { title: 'Paris', pays: "france" },
  { title: 'Marseille', pays: "france" },
  { title: 'Lyon', pays: "france" },
  { title: 'Toulouse', pays: "france" },
  { title: 'Nice', pays: "france" },
  { title: 'Nantes', pays: "france" },
  { title: 'Montpellier', pays: "france" },
  { title: 'Strasbourg', pays: "france" },
  { title: 'Bordeaux', pays: "france" },
  { title: 'Lille', pays: "france" }
];