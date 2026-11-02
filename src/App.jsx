import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Works from './components/Works.jsx'
import Collection from './components/Collection.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <div className="bg-glow" />
      <Header />
      <main>
        <Hero />
        <About />
        <Works />
        <Collection />
      </main>
      <Footer />
    </>
  )
}
