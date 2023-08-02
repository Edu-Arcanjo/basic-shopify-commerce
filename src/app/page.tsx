import Hero from "./components/Hero";
import Products from "./components/Products";

export default function Home() {
  return (
    <main>
      <div className="h-screen bg-white">
        <Hero />
        <Products />
      </div>
    </main>
  );
}
