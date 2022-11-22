import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

type Props = {
    text:string;
    icon?: React.ReactNode ;
    children: JSX.Element,
  };

const  ButtonUsed: React.FC<any>= ({text,icon,
    children})=>
(
    <Button variant="contained" color="success" >
        {text}{icon}
    </Button>
);


export default ButtonUsed ;