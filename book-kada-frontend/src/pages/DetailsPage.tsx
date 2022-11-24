import * as React from 'react';
import DetailsCard from '../components/book/DetailsCard';
import PrimarySearchAppBar from '../UI/AppBar/AppBar';

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <div>
      <PrimarySearchAppBar />
      <DetailsCard />
    </div>
  );
}
