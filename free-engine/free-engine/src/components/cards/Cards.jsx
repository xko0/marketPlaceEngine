import * as React from 'react';
import { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite"
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useFreelancesStore } from '../../context/FreelancesContext';

export const Cards = observer(() => {
  const freelancesStore = useFreelancesStore()
  const [freelancesMalt, setFreelancesMalt] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    if (freelancesStore.freelancesMalt.length > 0) {
      setFreelancesMalt(freelancesStore.freelancesMalt)
      setTotalPages(Math.ceil(freelancesStore.freelancesMalt.length / itemsPerPage))
    }
  }, [freelancesStore.freelancesMalt, currentPage])

  function getCards() {
    if (freelancesMalt) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentItems = freelancesMalt.filter((_, i) => i >= startIndex && i < endIndex);
      return currentItems.map((freelance, index) => (
        <Grid key={index} item xs={2}>
          <Card key={index} sx={{ maxWidth: 345, margin: "2vh"}} onClick={() => window.open(`https://www.malt.fr${freelance[3]}`, '_blank')}>
            <CardMedia
              sx={{ height: 240 }}
              image={`${freelance[4]}`}
              title="Profile picture"
            />
            <CardContent sx={{ height: 100 }}>
              <Typography gutterBottom variant="h5" component="div">
                {freelance[1] != null ? freelance[1] : `Infos sur malt.fr`}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Prix à la journée: {freelance[0] != null ? freelance[0].replace(/\D/g, "") : ""} €
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {freelance[2] != null ? freelance[2] : `Développeur web`}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => window.open(`https://www.malt.fr${freelance[3]}`, '_blank')}>Voir sur Malt.fr</Button>
            </CardActions>
          </Card>
        </Grid>
      ));
    } else {
      return <p>Waiting for infos...</p>;
    }
  }

  return (
    <>
      <Grid container spacing={1}>
        {getCards()}
      </Grid>
      {currentPage <= totalPages && currentPage >= 2 && <Button onClick={() => setCurrentPage(currentPage - 1)}>Page précédente</Button>}

      {currentPage < totalPages && <Button onClick={() => setCurrentPage(currentPage + 1)}>Page suivante</Button>}
    </>
  );
});