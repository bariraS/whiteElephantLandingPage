import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './styles.module.css';
import LogoCanvas from './LogoCanvas';
import Button from './Button'; // Verify this import path is correct

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <LogoCanvas  />
      </div>
     
      <ul className={`${styles.navLinks} ${isOpen ? styles.showNav : ''}`}>
        <li><a href="https://whiteelephants.io/vision">Our Vision</a></li>
        <li><a href="https://whiteelephants.io/milestone">Milestone</a></li>
        <li><a href="https://whiteelephants.io/team">Our Team</a></li>
        <li><a href="https://pdflink.to/f8353e19/">WhitePaper</a></li>
        <li><a href="https://us06web.zoom.us/j/9770259282?omn=82900310642#success">Events</a></li>
      </ul>
        <Button text="INVEST NOW" link="https://wefunder.com/weexpo" />
      <div className={styles.navExtras}>
        <a href="https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit"><img src='/linkedin.avif' alt="LinkedIn" height="30"/></a>
        <a href="https://www.instagram.com/whiteelephantstech/"><img src='/instagram.avif' alt="Instagram" height="30"/></a>
        <a href="https://www.facebook.com"><img src='/Ffacebook.avif' alt="Facebook" height="30"/></a>
        <a href="https://x.com/i/flow/login?redirect_after_login=%2FWEelephantTech"><img src='/Xtwitter.avif' alt="Twitter" height="30"/></a>
      </div>
      <button className={styles.menuToggle} onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
}

export default NavbarComponent;
