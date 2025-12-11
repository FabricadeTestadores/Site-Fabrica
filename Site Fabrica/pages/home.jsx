import React from 'react';
import Navbar from '../Components/Navbar';
import Header from '../Components/Header';
import Info from '../Components/Info';
import Objectives from '../Components/Objectives';
import Performance from '../Components/Performance';
import Team from '../Components/Team';
import Footer from '../Components/Footer';

export default function Homepage() {
  return (
    <>
      <Navbar />
      <Header />
      <Info />
      <Objectives />
      <Performance />
      <Team />
      <Footer />
    </>
  );
}