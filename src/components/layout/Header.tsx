import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, ShoppingBag } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `font-body text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
            <span className="font-heading text-2xl font-semibold tracking-wider">Atelier</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/customizationstudiopage" className={navLinkClasses}>
                Studio
            </NavLink>
            <NavLink to="/collectionpage" className={navLinkClasses}>
                Collections
            </NavLink>
            </nav>
        </div>

        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
                <Link to="/userdashboardpage">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User Dashboard</span>
                </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <Link to="/checkoutpage">
                    <ShoppingBag className="h-5 w-5" />
                    <span className="sr-only">Open Cart</span>
                </Link>
            </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;