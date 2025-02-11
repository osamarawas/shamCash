import FAQ from "./_components/FAQ";
import Features from "./_components/Features";
import Landing from "./_components/Landing";
import About from "./_components/About";

export default function Home() {
  return (
    <div className="">
      <Landing />
      <About />
      <Features />
      <FAQ />
    </div>
  );
}
