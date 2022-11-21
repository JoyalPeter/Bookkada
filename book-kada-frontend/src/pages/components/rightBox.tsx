import Box, { BoxProps } from '@mui/material/Box';
import React from 'react';

type Props = {
  children: JSX.Element,
};

const  RightBox: React.FC<any>= ({
    children})=>
    (   
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
          m: 5,
          bgcolor: "red",
          borderRadius: 1,
        }}
      >{children}</Box>
        
     );


export default RightBox ;