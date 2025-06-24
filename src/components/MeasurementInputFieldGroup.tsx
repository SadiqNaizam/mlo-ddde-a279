import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { HelpCircle, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from "@/components/ui/use-toast";

const measurementSchema = z.object({
  neck: z.coerce.number().min(20, "Must be at least 20cm").max(60, "Must be at most 60cm"),
  chest: z.coerce.number().min(60, "Must be at least 60cm").max(160, "Must be at most 160cm"),
  waist: z.coerce.number().min(50, "Must be at least 50cm").max(150, "Must be at most 150cm"),
  hips: z.coerce.number().min(60, "Must be at least 60cm").max(160, "Must be at most 160cm"),
  sleeve: z.coerce.number().min(40, "Must be at least 40cm").max(100, "Must be at most 100cm"),
  inseam: z.coerce.number().min(50, "Must be at least 50cm").max(120, "Must be at most 120cm"),
  shoulder: z.coerce.number().min(30, "Must be at least 30cm").max(70, "Must be at most 70cm"),
  thigh: z.coerce.number().min(40, "Must be at least 40cm").max(100, "Must be at most 100cm"),
});

type MeasurementData = z.infer<typeof measurementSchema>;

const measurementFields: { id: keyof MeasurementData; label: string; description: string }[] = [
    { id: 'neck', label: 'Neck', description: 'Measure around the base of your neck, where a collar would sit.' },
    { id: 'chest', label: 'Chest', description: 'Measure around the fullest part of your chest, under your armpits.' },
    { id: 'waist', label: 'Waist', description: 'Measure around your natural waistline, the narrowest part of your torso.' },
    { id: 'hips', label: 'Hips', description: 'Measure around the fullest part of your hips and seat.' },
    { id: 'sleeve', label: 'Sleeve', description: 'Measure from the top of your shoulder down to your wrist bone.' },
    { id: 'inseam', label: 'Inseam', description: 'Measure from your crotch to the bottom of your ankle.' },
    { id: 'shoulder', label: 'Shoulder Width', description: 'Measure from the edge of one shoulder to the other across your back.' },
    { id: 'thigh', label: 'Thigh', description: 'Measure around the fullest part of your thigh.' },
];

interface MeasurementInputFieldGroupProps {
  onSaveProfile: (profileName: string, data: MeasurementData) => void;
  initialData?: Partial<MeasurementData>;
}

const MeasurementInputFieldGroup: React.FC<MeasurementInputFieldGroupProps> = ({ onSaveProfile, initialData }) => {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [profileName, setProfileName] = useState('');
  const { toast } = useToast();

  console.log('MeasurementInputFieldGroup loaded');

  const form = useForm<MeasurementData>({
    resolver: zodResolver(measurementSchema),
    defaultValues: initialData || {
      neck: undefined,
      chest: undefined,
      waist: undefined,
      hips: undefined,
      sleeve: undefined,
      inseam: undefined,
      shoulder: undefined,
      thigh: undefined,
    },
    mode: 'onBlur',
  });

  const handleOpenSaveDialog = () => {
    form.trigger().then((isValid) => {
      if (isValid) {
        setIsSaveDialogOpen(true);
      } else {
        toast({
          title: "Incomplete Measurements",
          description: "Please fill in all fields correctly before saving.",
          variant: "destructive",
        });
      }
    });
  };

  const handleSaveProfile = () => {
    if (profileName.trim() === '') {
        toast({
            title: "Profile Name Required",
            description: "Please enter a name for your measurement profile.",
            variant: "destructive",
        });
        return;
    }
    const data = form.getValues();
    onSaveProfile(profileName, data);
    setIsSaveDialogOpen(false);
    setProfileName('');
    toast({
        title: "Profile Saved!",
        description: `Your measurement profile "${profileName}" has been saved.`,
    });
  };

  return (
    <TooltipProvider>
      <Card className="w-full max-w-2xl mx-auto bg-card">
        <CardHeader>
          <CardTitle className="font-heading text-3xl">Body Measurements</CardTitle>
          <CardDescription className="font-body">
            Enter your measurements for a perfect fit. All measurements should be in centimeters (cm).
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {measurementFields.map((field) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={field.id}
                    render={({ field: formField }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel className="font-body font-semibold">{field.label}</FormLabel>
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{field.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <FormControl>
                            <div className="relative">
                                <Input
                                    type="number"
                                    placeholder={`e.g. ${field.id === 'chest' ? '98' : '38'}`}
                                    {...formField}
                                    className="pr-12"
                                    onChange={e => formField.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-muted-foreground">cm</span>
                            </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="button" onClick={handleOpenSaveDialog} className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Measurements
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-heading">Save Measurement Profile</DialogTitle>
            <DialogDescription className="font-body">
              Give this set of measurements a name for future use (e.g., "My Standard Fit").
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profile-name" className="text-right font-body">
                Profile Name
              </Label>
              <Input
                id="profile-name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="col-span-3"
                placeholder="e.g. My Profile"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveProfile}>Save Profile</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default MeasurementInputFieldGroup;