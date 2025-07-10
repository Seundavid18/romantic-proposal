// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { Heart, Sparkles, Star } from 'lucide-react';

const RomanticProposal = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentPoem, setCurrentPoem] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [yesClicked, setYesClicked] = useState(false);

  const poems = [
    {
      title: "My Dearest Darasimi",
      lines: [
        "In your eyes, I see my future bright and clear,",
        "Darasimi Blessing, you're everything I hold dear.",
        "Your smile lights up my darkest days,",
        "In countless beautiful and magical ways."
      ]
    },
    {
      title: "A Love Beyond Words",
      lines: [
        "Abioudun, your name means joy in my heart,",
        "From the very first moment, you set me apart.",
        "Like stars that dance in the midnight sky,",
        "You're the reason I believe love can fly."
      ]
    },
    {
      title: "Forever Yours",
      lines: [
        "Obadara, my precious one, so divine,",
        "Would you take my hand and forever be mine?",
        "Through every season, through joy and strife,",
        "I want to love you for the rest of my life."
      ]
    }
  ];

  useEffect(() => {
    const imageUrls = Array.from({ length: 6 }, (_, i) => `/images/Image${i + 1}.jpeg`);
    const totalImages = 20;
    const scattered = [];

    for (let i = 0; i < totalImages; i++) {
      const src = imageUrls[Math.floor(Math.random() * imageUrls.length)];
      scattered.push({
        id: i,
        src,
        left: Math.random() * 95,
        top: Math.random() * 95,
        rotation: Math.random() * 60 - 30,
        scale: Math.random() * 0.4 + 0.3,
        opacity: Math.random() * 0.25 + 0.1,
        animationDelay: Math.random() * 5,
        zIndex: Math.floor(Math.random() * 5) + 1,
      });
    }
    setBackgroundImages(scattered);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPoem((prev) => (prev + 1) % poems.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 3,
        size: Math.random() * 20 + 10,
      }));
      setHearts(newHearts);
    };
    generateHearts();
    const interval = setInterval(generateHearts, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleYes = () => {
    setYesClicked(true);
    alert("💜 YES! My heart is overflowing with joy! 💜");
    setTimeout(() => setYesClicked(false), 1000);
  };

  const handleNo = () => {
    alert("💔 I understand... but my love for you will never fade. 💔");
  };

  return (
    <div className="app-container">
      {backgroundImages.map((img) => (
        <div
          key={img.id}
          className="background-image"
          style={{
            left: `${img.left}%`,
            top: `${img.top}%`,
            zIndex: img.zIndex,
            transform: `rotate(${img.rotation}deg) scale(${img.scale})`,
            opacity: img.opacity,
            animationDelay: `${img.animationDelay}s`
          }}
        >
          <div className="image-box">
            <img src={img.src} alt="Darasimi" className="image-inner" />
          </div>
        </div>
      ))}

      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.animationDelay}s`
          }}
        >
          <Heart size={heart.size} className="heart-icon" />
        </div>
      ))}

      <div className="sparkles-container">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            <Sparkles size={16} className="sparkle-icon" />
          </div>
          
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`petal-${i}`}
            className="falling-petal"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 100}px`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      

      <div className={`content ${showMessage ? 'show' : ''}`}>
        <h1 className="title">My Beloved</h1>
        <h2 className="subtitle">Darasimi Blessing</h2>
        <h3 className="subtitle small">Abioudun Obadara</h3>

        <div className="poem-box">
          <div className="poem-title">
            <Star className="star-icon" />
            <h3>{poems[currentPoem].title}</h3>
            <Star className="star-icon" />
          </div>
          {poems[currentPoem].lines.map((line, index) => (
            <p key={index} className="poem-line">{line}</p>
          ))}
        </div>

        <div className="message-box">
          <p>From the moment I met you, my world changed forever.</p>
          <p>You're not just beautiful on the outside — your soul radiates light.</p>
        </div>

        <div className="proposal-box">
          <h2>Will You Be My Girlfriend?</h2>
          <p>I promise to love and cherish you forever.</p>
          <div className="buttons">
            <button onClick={handleYes} className={`yes-button ${yesClicked ? 'animate-yes' : ''}`}>
              <Heart className="btn-icon" size={24} /> Yes, I'd love to! 💜
            </button>
            <button onClick={handleNo} className="no-button">
              I need time to think
            </button>
          </div>
        </div>

        <p className="footer-text">With all my love ❤️</p>
      </div>
    </div>
  );
};

export default RomanticProposal;