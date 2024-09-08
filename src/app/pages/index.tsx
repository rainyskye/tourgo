import { NextPage } from 'next';
import Head from 'next/head';
import Map from '@/components/Map'
import Navbar from '@/components/Navbar'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>My Map App</title>
        <meta name="description" content="A map app built with NextJS and Google Maps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow">
        <Map />
      </main>

      <Navbar />
    </div>
  );
};

export default Home;