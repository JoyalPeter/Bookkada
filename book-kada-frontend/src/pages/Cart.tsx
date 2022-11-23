import * as React from 'react';
import CartCard from '../cart/CartCard';
import PrimarySearchAppBar from '../UI/AppBar/AppBar';
import Padding from '../UI/Padding';


export interface IAppProps {
}

export default function CartPage (props: IAppProps) {
  return (
    <div>
      <PrimarySearchAppBar/>
      <Padding>
      <CartCard sx={{height:'100%'}} />
      </Padding>
    </div>
  );
}
