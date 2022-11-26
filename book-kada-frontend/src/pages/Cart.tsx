import { useState } from 'react';
import CartCard from '../components/cart/CartCard';
import { BookDataProps } from '../components/Home/HomeComponent';
import PrimarySearchAppBar from '../UI/AppBar/AppBar';
import Padding from '../UI/Padding';

export default function CartPage() {

  return (
    <div>
      <PrimarySearchAppBar/>
      <Padding>
        <CartCard sx={{ height: "100%" }} />
      </Padding>
    </div>
  );
}
