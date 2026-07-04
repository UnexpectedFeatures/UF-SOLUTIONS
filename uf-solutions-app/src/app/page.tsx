import Navbar from './components/navbar/navbar';
import HomePage from "./(pages)/home/page";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HomePage />
      </main>
    </>
  );
}