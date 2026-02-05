import Navbar from '../src/Components/Navbar';
import Header from '../src/Components/Header';
import Info from '../src/Components/Info';
import Objectives from '../src/Components/Objectives';
import Performance from '../src/Components/Performance';
import Team from '../src/Components/Team';
import Footer from '../src/Components/Footer';

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