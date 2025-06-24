import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GarmentVisualizer, { GarmentCut } from '@/components/GarmentVisualizer';
import FabricSwatchSelector, { Fabric } from '@/components/FabricSwatchSelector';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingBag, Palette, Scissors, Shirt } from 'lucide-react';

// Mock data for initial state
const initialFabric: Fabric = {
  id: 'f003',
  name: 'Egyptian Cotton',
  texture: 'Crisp & Breathable',
  sheen: 'Low',
  drape: 'Structured',
  imageUrl: 'https://images.unsplash.com/photo-1618173690434-3c6f91490226?q=80&w=300&h=300&fit=crop',
  detailedImageUrl: 'https://images.unsplash.com/photo-1618173690434-3c6f91490226?q=80&w=600&h=600&fit=crop'
};

const CustomizationStudioPage = () => {
  console.log('CustomizationStudioPage loaded');
  const { toast } = useToast();

  const [selectedFabric, setSelectedFabric] = useState<Fabric>(initialFabric);
  const [selectedColor, setSelectedColor] = useState<string>('#EAE6E1'); // A neutral off-white
  const [selectedCut, setSelectedCut] = useState<GarmentCut>('classic');
  const [selectedStyle, setSelectedStyle] = useState<string>('Crewneck');
  
  const handleAddToBag = () => {
    toast({
      title: "Added to Bag!",
      description: `${selectedFabric.name} ${selectedStyle} in ${selectedCut} cut has been added to your bag.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Pane: Customization Controls */}
            <ScrollArea className="h-full max-h-[calc(100vh-10rem)] pr-4">
              <div className="flex flex-col gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h1 className="font-heading text-4xl md:text-5xl font-semibold">Design Studio</h1>
                  <p className="text-muted-foreground mt-2">Craft your unique piece. Every selection is reflected instantly.</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-xl font-heading"><Palette className="mr-2 h-5 w-5 text-primary"/>Fabric & Color</AccordionTrigger>
                      <AccordionContent className="pt-4 space-y-6">
                        <FabricSwatchSelector onSelectFabric={setSelectedFabric} selectedFabricId={selectedFabric.id} />
                        <div>
                          <Label htmlFor="color-picker" className="text-lg font-heading mb-2 block">Color</Label>
                           <div className="relative">
                            <Input 
                                id="color-picker" 
                                type="text" 
                                value={selectedColor} 
                                onChange={(e) => setSelectedColor(e.target.value)}
                                className="w-full pl-12 h-12"
                                placeholder="#ffffff"
                            />
                            <Input 
                                type="color" 
                                value={selectedColor} 
                                onChange={(e) => setSelectedColor(e.target.value)}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 border-none bg-transparent cursor-pointer"
                            />
                           </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-xl font-heading"><Scissors className="mr-2 h-5 w-5 text-primary"/>Fit & Style</AccordionTrigger>
                      <AccordionContent className="pt-4 space-y-6">
                        <div>
                          <h3 className="text-lg font-heading mb-4">Garment Cut</h3>
                          <RadioGroup defaultValue={selectedCut} onValueChange={(value: GarmentCut) => setSelectedCut(value)} className="flex gap-4">
                            <Label htmlFor="cut-classic" className="flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer hover:bg-accent has-[:checked]:bg-accent has-[:checked]:border-primary transition-colors flex-1">
                                <RadioGroupItem value="classic" id="cut-classic" className="sr-only" />
                                <span className="font-medium">Classic Fit</span>
                            </Label>
                             <Label htmlFor="cut-slim" className="flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer hover:bg-accent has-[:checked]:bg-accent has-[:checked]:border-primary transition-colors flex-1">
                                <RadioGroupItem value="slim" id="cut-slim" className="sr-only" />
                                <span className="font-medium">Slim Fit</span>
                            </Label>
                             <Label htmlFor="cut-relaxed" className="flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer hover:bg-accent has-[:checked]:bg-accent has-[:checked]:border-primary transition-colors flex-1">
                                <RadioGroupItem value="relaxed" id="cut-relaxed" className="sr-only" />
                                <span className="font-medium">Relaxed Fit</span>
                            </Label>
                          </RadioGroup>
                        </div>
                         <div>
                          <h3 className="text-lg font-heading mb-4">Collar Style</h3>
                           <Select onValueChange={setSelectedStyle} defaultValue={selectedStyle}>
                            <SelectTrigger className="w-full h-12">
                                <SelectValue placeholder="Select a style" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Crewneck">Crewneck</SelectItem>
                                <SelectItem value="V-Neck">V-Neck</SelectItem>
                                <SelectItem value="Polo">Polo</SelectItem>
                                <SelectItem value="Henley">Henley</SelectItem>
                            </SelectContent>
                           </Select>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
                
                <motion.div
                   initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 mt-4"
                >
                    <Button onClick={handleAddToBag} size="lg" className="flex-1">
                      <ShoppingBag className="mr-2 h-5 w-5" /> Add to Bag
                    </Button>
                    <Button asChild variant="outline" size="lg" className="flex-1">
                        <Link to="/checkoutpage">Proceed to Checkout</Link>
                    </Button>
                </motion.div>

              </div>
            </ScrollArea>
            
            {/* Right Pane: Garment Visualizer */}
            <motion.div 
              className="sticky top-24 h-[calc(100vh-8rem)]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              <GarmentVisualizer 
                fabric={selectedFabric.name}
                color={selectedColor}
                cut={selectedCut}
                style={selectedStyle}
              />
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomizationStudioPage;