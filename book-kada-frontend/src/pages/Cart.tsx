import { useState } from 'react';
import CartCard from '../components/cart/CartCard';
import { BookData } from '../constants/Interfaces';
import PrimarySearchAppBar from '../UI/AppBar/AppBar';
import Padding from '../UI/Padding';

export default function CartPage() {
  const [data, setData] = useState([] as BookData[]);

  return (
    <div>
      <PrimarySearchAppBar setData={setData} />
      <Padding>
        <CartCard sx={{ height: "100%" }} />
      </Padding>
    </div>
  );
}
