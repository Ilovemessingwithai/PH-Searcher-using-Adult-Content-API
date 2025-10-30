import React, { useEffect } from 'react';

// Since particles.js is loaded from a script tag, we need to tell TypeScript about it.
declare global {
    interface Window {
        particlesJS: any;
    }
}

const ParticleBackground: React.FC = () => {

    useEffect(() => {
        // Ensure particlesJS is loaded before trying to use it
        if (window.particlesJS) {
            window.particlesJS('particles-js-container', {
              "particles": {
                "number": {
                  "value": 80,
                  "density": {
                    "enable": true,
                    "value_area": 800
                  }
                },
                "color": {
                  "value": ["#ff007f", "#f0f", "#ff3399"]
                },
                "shape": {
                  "type": "circle",
                },
                "opacity": {
                  "value": 0.5,
                  "random": true,
                },
                "size": {
                  "value": 3,
                  "random": true,
                },
                "line_linked": {
                  "enable": false
                },
                "move": {
                  "enable": true,
                  "speed": 2,
                  "direction": "none",
                  "random": true,
                  "straight": false,
                  "out_mode": "out",
                }
              },
              "interactivity": {
                "detect_on": "canvas",
                "events": {
                  "onhover": {
                    "enable": true,
                    "mode": "repulse"
                  },
                  "onclick": {
                    "enable": false,
                  },
                  "resize": true
                },
                "modes": {
                  "repulse": {
                    "distance": 100,
                    "duration": 0.4
                  }
                }
              },
              "retina_detect": true
            });
        }
    }, []);

    // This div is the target for particles.js
    return <div id="particles-js-container" />;
};

export default ParticleBackground;
