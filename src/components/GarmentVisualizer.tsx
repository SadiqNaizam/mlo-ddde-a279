import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shirt, Scissors, Palette, DraftingCompass } from 'lucide-react';

export type GarmentCut = 'slim' | 'classic' | 'relaxed';

interface GarmentVisualizerProps {
  fabric: string;
  color: string;
  cut: GarmentCut;
  style: string;
}

const GarmentSvg = ({ color, pathD }: { color: string; pathD: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-4/5 h-4/5 max-w-sm max-h-sm text-gray-300"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
  >
    <motion.path
      d={pathD}
      fill={color}
      stroke="hsl(var(--foreground) / 0.5)"
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    />
  </svg>
);

const cutPaths = {
  classic: "M12 2l-4 4v14h8V6l-4-4z M10 7h4v12h-4V7z",
  slim: "M12 2l-3 4v14h6V6l-3-4z M10.5 7h3v12h-3V7z",
  relaxed: "M12 2l-5 4v14h10V6l-5-4z M9 7h6v12H9V7z",
};

const GarmentVisualizer: React.FC<GarmentVisualizerProps> = ({
  fabric = 'Cotton',
  color = '#ffffff',
  cut = 'classic',
  style = 'Crewneck',
}) => {
  console.log('GarmentVisualizer loaded');

  return (
    <Card className="w-full h-full flex flex-col bg-card shadow-lg rounded-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="font-heading text-2xl text-foreground">Your Creation</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow flex items-center justify-center bg-muted/30 p-4 min-h-[300px] md:min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={cut}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full flex items-center justify-center"
          >
            <GarmentSvg color={color} pathD={cutPaths[cut]} />
          </motion.div>
        </AnimatePresence>
      </CardContent>

      <CardFooter className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 p-6 text-sm border-t bg-card-foreground/5">
        <div className="flex items-center gap-3">
          <Palette className="h-6 w-6 text-primary" />
          <div>
            <p className="text-muted-foreground font-body text-xs uppercase tracking-wider">Color</p>
            <p className="font-semibold font-body text-foreground capitalize">{color}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Shirt className="h-6 w-6 text-primary" />
          <div>
            <p className="text-muted-foreground font-body text-xs uppercase tracking-wider">Fabric</p>
            <p className="font-semibold font-body text-foreground capitalize">{fabric}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Scissors className="h-6 w-6 text-primary" />
          <div>
            <p className="text-muted-foreground font-body text-xs uppercase tracking-wider">Cut</p>
            <p className="font-semibold font-body text-foreground capitalize">{cut}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DraftingCompass className="h-6 w-6 text-primary" />
          <div>
            <p className="text-muted-foreground font-body text-xs uppercase tracking-wider">Style</p>
            <p className="font-semibold font-body text-foreground capitalize">{style}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GarmentVisualizer;