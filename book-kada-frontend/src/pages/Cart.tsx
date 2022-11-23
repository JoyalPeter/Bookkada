import * as React from 'react';
import CartCard from '../cart/CartCard';


export interface IAppProps {
}

export default function CartPage (props: IAppProps) {
  return (
    <div>
      <CartCard sx={{height:'100%'}} />
    </div>
  );
}
