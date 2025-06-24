import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Ruler, SewingPin } from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LookbookEntryCard from '@/components/LookbookEntryCard';
import { Button } from '@/components/ui/button';

const lookbookItems = [
  {
    title: "The Autumnal Collection",
    imageUrl: "https://images.unsplash.com/photo-1552317892-1c25dd442d85?q=80&w=1887&auto=format&fit=crop",
    linkTo: "/collectionpage"
  },
  {
    title: "Essential Shirting",
    imageUrl: "https://images.unsplash.com/photo-1603252109612-24fa63d0a76a?q=80&w=1887&auto=format&fit=crop",
    linkTo: "/customizationstudiopage"
  },
  {
    title: "Modern Formalwear",
    imageUrl: "https://images.unsplash.com/photo-1521577352947-2c45e0214928?q=80&w=1887&auto=format&fit=crop",
    linkTo: "/collectionpage"
  }
];

const featureItems = [
    {
        icon: <SewingPin className="h-8 w-8 text-primary" />,
        title: "Design Your Vision",
        description: "Select from the finest fabrics and customize every detail to match your personal style."
    },
    {
        icon: <Ruler className="h-8 w-8 text-primary" />,
        title: "Perfect Your Fit",
        description: "Use our intuitive guide to provide your precise measurements for a truly bespoke garment."
    },
    {
        icon: <ArrowRight className="h-8 w-8 text-primary" />,
        title: "Delivered to You",
        description: "Your unique creation is masterfully crafted and delivered directly to your doorstep."
    }
]

const Homepage = () => {
  console.log('Homepage loaded');

  return (
    <div className="bg-background text-foreground font-body">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative flex items-center justify-center h-screen min-h-[700px] text-center text-white">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
              alt="Fashion model in a custom-made suit" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <motion.div 
            className="relative z-10 p-6 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-semibold tracking-tight">
              Where Style is Personal
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/80 font-body">
              Craft your unique identity with our bespoke tailoring service. Begin your design journey today and wear something that is truly yours.
            </p>
            <Button asChild size="lg" className="mt-8 font-semibold text-base">
              <Link to="/customizationstudiopage">
                Start Designing <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </section>

        {/* Lookbook Section */}
        <section className="container py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-heading text-center font-semibold">Our Lookbook</h2>
            <p className="mt-4 max-w-2xl mx-auto text-center text-lg text-muted-foreground">
              Discover inspiration in our curated collections, each piece a testament to timeless style and impeccable craftsmanship.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lookbookItems.map((item, index) => (
                <LookbookEntryCard key={index} {...item} />
              ))}
            </div>
             <div className="text-center mt-12">
                <Button asChild variant="outline">
                    <Link to="/collectionpage">
                        View All Collections
                    </Link>
                </Button>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="bg-secondary/50">
            <div className="container py-20 md:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-3xl md:text-5xl font-heading text-center font-semibold">A Seamless Experience</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-center text-lg text-muted-foreground">
                        From digital design to your doorstep in three simple steps.
                    </p>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {featureItems.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center">
                                {feature.icon}
                                <h3 className="mt-4 text-2xl font-heading font-medium">{feature.title}</h3>
                                <p className="mt-2 text-muted-foreground max-w-xs">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Homepage;