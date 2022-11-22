import Box, { BoxProps } from '@mui/material/Box';
import React from 'react';

type Props = {
  children: JSX.Element,
};

const  CentreBox: React.FC<any>= ({
    children})=>
    (   
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 2,
          // m: 5,
          bgcolor: "red",
          borderRadius: 10,
        }}
      >{children}</Box>
        
     );


export default CentreBox ;