import React from 'react';
import Head from 'next/head';
import LoginPageContainer from '../page-containers/login/LoginPageContainer';

function Home() {
  return (
    <>
      <Head>
        <title>My App</title>
      </Head>
      <LoginPageContainer />
    </>
  );
}

export default Home;
