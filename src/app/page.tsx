import FAQ from "./_components/FAQ";
import Landing from "./_components/Landing";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <div className="">
      <Landing />
      <About/>
      <FAQ/>
      <Footer/>
    </div>
  );
}
