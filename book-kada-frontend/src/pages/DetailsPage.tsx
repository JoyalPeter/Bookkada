import * as React from 'react';
import DetailsCard from '../components/book/DetailsCard';
import { BookData } from '../constants/Interfaces';
import PrimarySearchAppBar from '../UI/AppBar/AppBar';

export interface IAppProps {}

export default function App(props: IAppProps) {
  const [data, setData] = React.useState([] as BookData[]);
  
  return (
    <div>
      <PrimarySearchAppBar setData={setData} />
      <DetailsCard />
    </div>
  );
}
