/** @format */

import { React } from 'react';
import LatestPost from '../components/main/LatestPost';
import MyNav from '../components/navigation/MyNav';
import Footer from '../components/footer/Footer';
import Form from '../components/form/Form';
import Jumbotron from '../components/jumbo/Jumbotron';
import './home.css';
import { useSession } from '../hooks/useSession';

const Home = () => {
  const session = useSession();
  console.log('Utente', session);
  return (
    <>
      <div className='Home'>
        <MyNav />
        <Jumbotron />
        <LatestPost />
        <Form />
        <Footer />
      </div>
    </>
  );
};

export default Home;
