import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Sizing Guide', path: '/sizing' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <Link to="/" className="font-heading text-xl font-semibold tracking-wider">
            Atelier
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            &copy; {currentYear} Atelier. All rights reserved.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-body">
          {footerLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;