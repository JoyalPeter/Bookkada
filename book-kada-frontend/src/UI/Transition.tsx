import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Cards from '../components/home/Cards';
import { useState } from 'react';
import { BookDataProps } from '../components/home/HomeComponent';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
  const [data, setData] = useState([] as BookDataProps[]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(5)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            {/* {data.map(
              (element: BookDataProps): JSX.Element =>
               <Grid item xs={2} sm={4} md={4} key={index}> (
                <Cards
                  bookId={element.bookId}
                  name={element.name}
                  price={element.price}
                  description={element.description}
                  author={element.author}
                />
              )
            )} */}

            <Cards
              bookId={0}
              name={''}
              price={0}
              description={''}
              author={''}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
