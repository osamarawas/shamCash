import Features from "./_components/Features";
import Landing from "./_components/Landing";
import About from "./_components/About";
import FAQ from "./_components/FAQ";
import { Languages } from "../utils/enums";

interface HomeProps {
  params: Promise<{ locale: Languages }>;
}
export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  return (
    <div className="">
      <Landing />
      <About />
      <Features />
      <FAQ locale={locale} />
    </div>
  );
}
