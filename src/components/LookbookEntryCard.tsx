import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface LookbookEntryCardProps {
  imageUrl: string;
  title: string;
  linkTo?: string;
}

const LookbookEntryCard: React.FC<LookbookEntryCardProps> = ({
  imageUrl,
  title,
  linkTo = '/customizationstudiopage', // Default from App.tsx routes
}) => {
  console.log('LookbookEntryCard loaded:', title);

  return (
    <Link
      to={linkTo}
      className="block relative group aspect-[3/4] w-full overflow-hidden rounded-sm shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Background Image/Video */}
      <img
        src={imageUrl}
        alt={`A lookbook example of ${title}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />

      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
        aria-hidden="true"
      />

      {/* Content container */}
      <div className="relative h-full p-6 md:p-8 flex flex-col justify-end text-primary-foreground">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold drop-shadow-md">
          {title}
        </h3>

        {/* 'Customize' button that reveals on hover */}
        <div className="mt-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
          <Button variant="secondary" tabIndex={-1}>
            Customize
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default LookbookEntryCard;