import Box, { BoxProps } from '@mui/material/Box';
import React from 'react';

type Props = {
  children: JSX.Element,
};

const  Padding: React.FC<any>= ({
    children})=>
    (   
        <Box
        sx={{
          m: 3,
        }}
      >{children}</Box>
        
     );


export default Padding ;