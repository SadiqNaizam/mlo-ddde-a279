import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for fabric options
const fabrics = [
  {
    id: 'f001',
    name: 'Italian Wool',
    texture: 'Smooth & Soft',
    sheen: 'Matte',
    drape: 'Excellent',
    imageUrl: 'https://images.unsplash.com/photo-1593489392349-5a22c5e53cec?q=80&w=300&h=300&fit=crop',
    detailedImageUrl: 'https://images.unsplash.com/photo-1593489392349-5a22c5e53cec?q=80&w=600&h=600&fit=crop'
  },
  {
    id: 'f002',
    name: 'Cashmere Silk',
    texture: 'Ultra-soft & Lustrous',
    sheen: 'Subtle',
    drape: 'Fluid',
    imageUrl: 'https://images.unsplash.com/photo-1620755938829-2ee788e285e6?q=80&w=300&h=300&fit=crop',
    detailedImageUrl: 'https://images.unsplash.com/photo-1620755938829-2ee788e285e6?q=80&w=600&h=600&fit=crop'
  },
  {
    id: 'f003',
    name: 'Egyptian Cotton',
    texture: 'Crisp & Breathable',
    sheen: 'Low',
    drape: 'Structured',
    imageUrl: 'https://images.unsplash.com/photo-1618173690434-3c6f91490226?q=80&w=300&h=300&fit=crop',
    detailedImageUrl: 'https://images.unsplash.com/photo-1618173690434-3c6f91490226?q=80&w=600&h=600&fit=crop'
  },
  {
    id: 'f004',
    name: 'Belgian Linen',
    texture: 'Naturally Textured',
    sheen: 'None',
    drape: 'Relaxed',
    imageUrl: 'https://images.unsplash.com/photo-1600096195700-4b93b3a7b545?q=80&w=300&h=300&fit=crop',
    detailedImageUrl: 'https://images.unsplash.com/photo-1600096195700-4b93b3a7b545?q=80&w=600&h=600&fit=crop'
  },
  {
    id: 'f005',
    name: 'Tweed Herringbone',
    texture: 'Rich & Textured',
    sheen: 'Matte',
    drape: 'Heavy',
    imageUrl: 'https://images.unsplash.com/photo-1519758965879-3436e4a6a57e?q=80&w=300&h=300&fit=crop',
    detailedImageUrl: 'https://images.unsplash.com/photo-1519758965879-3436e4a6a57e?q=80&w=600&h=600&fit=crop'
  },
  {
    id: 'f006',
    name: 'Satin Charmeuse',
    texture: 'Glossy & Smooth',
    sheen: 'High',
    drape: 'Liquid',
    imageUrl: 'https://images.unsplash.com/photo-1595431678888-c70973a90666?q=80&w=300&h=300&fit=crop',
    detailedImageUrl: 'https://images.unsplash.com/photo-1595431678888-c70973a90666?q=80&w=600&h=600&fit=crop'
  }
];

export interface Fabric {
  id: string;
  name: string;
  texture: string;
  sheen: string;
  drape: string;
  imageUrl: string;
  detailedImageUrl: string;
}

interface FabricSwatchSelectorProps {
  onSelectFabric: (fabric: Fabric) => void;
  selectedFabricId?: string;
}

const FabricSwatchSelector: React.FC<FabricSwatchSelectorProps> = ({
  onSelectFabric,
  selectedFabricId: initialSelectedId
}) => {
  console.log('FabricSwatchSelector loaded');
  const [selectedFabricId, setSelectedFabricId] = useState<string | undefined>(initialSelectedId);

  const handleSelect = (fabric: Fabric) => {
    setSelectedFabricId(fabric.id);
    onSelectFabric(fabric);
  };

  return (
    <div className="w-full">
      <h3 className="text-2xl font-heading mb-4 text-foreground">Choose Your Fabric</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {fabrics.map((fabric) => (
          <Popover key={fabric.id}>
            <PopoverTrigger asChild>
              <motion.button
                onClick={() => handleSelect(fabric)}
                className={cn(
                  'relative aspect-square rounded-md overflow-hidden cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring',
                  'ring-2 ring-offset-2 ring-offset-background',
                  selectedFabricId === fabric.id ? 'ring-primary' : 'ring-transparent'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Select ${fabric.name}`}
              >
                <img src={fabric.imageUrl} alt={fabric.name} className="w-full h-full object-cover" />
                {selectedFabricId === fabric.id && (
                  <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-card border-border shadow-xl">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-heading text-xl font-semibold text-card-foreground">{fabric.name}</h4>
                  <img src={fabric.detailedImageUrl} alt={`Detailed view of ${fabric.name}`} className="rounded-md w-full aspect-square object-cover" />
                </div>
                <div className="grid gap-2 font-body text-sm">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="text-muted-foreground">Texture</span>
                    <span className="col-span-2 font-medium text-card-foreground">{fabric.texture}</span>
                  </div>
                   <div className="grid grid-cols-3 items-center gap-4">
                    <span className="text-muted-foreground">Sheen</span>
                    <span className="col-span-2 font-medium text-card-foreground">{fabric.sheen}</span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="text-muted-foreground">Drape</span>
                    <span className="col-span-2 font-medium text-card-foreground">{fabric.drape}</span>
                  </div>
                </div>
                 <Button onClick={() => handleSelect(fabric)} size="sm">Select this Fabric</Button>
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
};

export default FabricSwatchSelector;