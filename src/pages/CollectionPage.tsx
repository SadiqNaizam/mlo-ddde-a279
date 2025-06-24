import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LookbookEntryCard from '@/components/LookbookEntryCard';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const collections = [
  {
    title: "The Minimalist Edit",
    imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&h=1067&fit=crop",
    linkTo: "/customizationstudiopage?collection=minimalist"
  },
  {
    title: "Autumnal Hues",
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&h=1067&fit=crop",
    linkTo: "/customizationstudiopage?collection=autumn"
  },
  {
    title: "The Boardroom Collection",
    imageUrl: "https://images.unsplash.com/photo-1618568949350-38c2fee45641?q=80&w=800&h=1067&fit=crop",
    linkTo: "/customizationstudiopage?collection=boardroom"
  },
  {
    title: "Casual Weekend",
    imageUrl: "https://images.unsplash.com/photo-1542318859-25f0eb1a7266?q=80&w=800&h=1067&fit=crop",
    linkTo: "/customizationstudiopage?collection=weekend"
  },
  {
    title: "Evening Elegance",
    imageUrl: "https://images.unsplash.com/photo-1590242484391-77884518b577?q=80&w=800&h=1067&fit=crop",
    linkTo: "/customizationstudiopage?collection=evening"
  },
  {
    title: "Linen & Light",
    imageUrl: "https://images.unsplash.com/photo-1621210110385-685c2e171f15?q=80&w=800&h=1067&fit=crop",
    linkTo: "/customizationstudiopage?collection=linen"
  }
];

const CollectionPage = () => {
    console.log('CollectionPage loaded');

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow pt-20">
                <section className="container py-16 md:py-24 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-semibold text-foreground tracking-tight">
                        Our Curated Collections
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground font-body">
                        Begin your creative journey here. Each piece is a canvas for your unique style, ready to be customized to perfection.
                    </p>
                </section>

                <section className="container pb-16 md:pb-24">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {collections.map((collection, index) => (
                            <LookbookEntryCard 
                                key={index}
                                title={collection.title}
                                imageUrl={collection.imageUrl}
                                linkTo={collection.linkTo}
                            />
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Button variant="outline" size="lg">
                           Load More
                           <ArrowDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default CollectionPage;