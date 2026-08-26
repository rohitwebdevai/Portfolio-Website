import { forwardRef, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import "../skills.css";

gsap.registerPlugin(ScrollTrigger);

const Page1Section = forwardRef(function Page1Section(props, ref) {
  const sectionRef = useRef(null);

  useEffect(() => {
    // gsap.context ensures all animations are scoped and cleaned up properly in React
    const ctx = gsap.context(() => {
      
      // Select all elements with the 'badge' class
      const badges = gsap.utils.toArray('.badge');
      
      badges.forEach((badge) => {
        // Read the custom CSS variable for staggering, fallback to 0 if missing
        const delay = parseFloat(badge.style.getPropertyValue('--delay')) || 0;

        gsap.from(badge, {
          scrollTrigger: {
            trigger: badge,
            start: "top 90%", // Animation starts when the badge top hits 90% of the viewport height
            toggleActions: "play none none reverse", // Reverses animation if you scroll back up
          },
          scale: 0.7,
          opacity: 0,
          y: 30, // Adds a slight upward movement along with the scale
          duration: 0.8,
          delay: delay * 0.5, // Utilize the existing delay variables for a staggered effect
          ease: "back.out(1.5)", // Creates a very subtle, professional "pop" effect
        });
      });
      
    }, sectionRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section id="page1" data-scroll-section ref={sectionRef}>
      {/* We need to attach the forwarded canvas ref from the parent, and the local sectionRef */}
      <canvas id="bgCanvas" ref={ref}></canvas>

      <div className="skills-container">
        
        {/* Top Left Quadrant */}
        <div className="cluster top-left">
            <div className="cluster-row">
                <div className="badge" style={{ '--delay': '0.1s' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" alt="HTML5" />
                    HTML5
                </div>
                <div className="badge" style={{ '--delay': '0.2s' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="CSS3" />
                    CSS3
                </div>
                <div className="badge" style={{ '--delay': '0.3s' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" />
                    Tailwind CSS
                </div>
            </div>
            <div className="cluster-row">
                <div className="badge" style={{ '--delay': '0.4s' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" />
                    JavaScript (ES6+)
                </div>
                <div className="badge" style={{ '--delay': '0.5s' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React.js" />
                    React.js
                </div>
            </div>
        </div>

        {/* Top Right Quadrant */}
        <div className="cluster top-right">
            <div className="cluster-row">
                <div className="badge" style={{ '--delay': '0.2s' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" alt="Next.js" />
                    Next.js 15
                </div>
                <div className="badge" style={{ '--delay': '0.3s' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="TypeScript" />
                    TypeScript
                </div>
            </div>
            <div className="cluster-row">
                <div className="badge" style={{ '--delay': '0.4s' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" />
                    Python
                </div>
                <div className="badge" style={{ '--delay': '0.5s' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" alt="GraphQL" />
                    GraphQL
                </div>
            </div>
        </div>

        {/* Bottom Left Quadrant */}
        <div className="cluster bottom-left">
            <div className="cluster-row">
                <div className="badge" style={{ '--delay': '0.3s' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" alt="VS Code" />
                    VS Code
                </div>
                <div className="badge" style={{ '--delay': '0.4s' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" alt="Git" />
                    Git
                </div>
                <div className="badge" style={{ '--delay': '0.5s' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" />
                    GitHub
                </div>
                <div className="badge" style={{ '--delay': '0.6s' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" alt="Docker" />
                    Docker
                </div>
            </div>
            <div className="cluster-row">
                <div className="badge" style={{ '--delay': '0.4s' }}>
                    <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M128 0L256 221.705H0L128 0Z" fill="black"/></svg>
                    Vercel
                </div>
                <div className="badge" style={{ '--delay': '0.5s' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg" alt="Netlify" />
                    Netlify
                </div>
                <div className="badge" style={{ '--delay': '0.6s' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub Copilot" />
                    GitHub Copilot
                </div>
                <div className="badge" style={{ '--delay': '0.7s' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" alt="Figma" />
                    Figma
                </div>
            </div>
        </div>

        {/* Bottom Right Quadrant */}
        <div className="cluster bottom-right">
            <div className="cluster-row">
                <div className="badge" style={{ '--delay': '0.4s' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    Authentication & Security
                </div>
                <div className="badge" style={{ '--delay': '0.5s' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg" alt="WebSockets" />
                    WebSockets / Socket.io
                </div>
            </div>
            <div className="cluster-row">
                <div className="badge" style={{ '--delay': '0.6s' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS Cloud" />
                    AWS Cloud
                </div>
                <div className="badge" style={{ '--delay': '0.7s' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 2.5 2.5 0 0 1-.39-4.8 2.5 2.5 0 0 1 1.94-4.22 2.5 2.5 0 0 1 3.87-5.84Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 2.5 2.5 0 0 0 .39-4.8 2.5 2.5 0 0 0-1.94-4.22 2.5 2.5 0 0 0-3.87-5.84Z"></path></svg>
                    AI API Integration
                </div>
            </div>
        </div>

      </div>
    </section>
  );
});

export default Page1Section;