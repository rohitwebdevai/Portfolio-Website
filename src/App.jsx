import { useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Page1Section from './components/Page1Section';
import Page2Section from './components/Page2Section';
import Page3Section from './components/Page3Section';
import ContactSection from './components/ContactSection';
import useScrollAnimation from './hooks/useScrollAnimation';

function App() {
  const canvasRef = useRef(null);
  const bgCanvasRef = useRef(null);

  // Initialise Locomotive Scroll + GSAP + Canvas sequences
  useScrollAnimation(canvasRef, bgCanvasRef);

  return (
    <>
      <Navbar />

      <div id="main" data-scroll-container>
        <canvas ref={canvasRef}></canvas>

        <HeroSection />
        <Page1Section ref={bgCanvasRef} />
        <Page2Section />
        <Page3Section />
        <ContactSection />
      </div>
    </>
  );
}

export default App;
