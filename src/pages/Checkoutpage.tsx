import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Truck } from 'lucide-react';
import { toast } from 'sonner';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
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
import { Separator } from '@/components/ui/separator';

const checkoutSchema = z.object({
  // Shipping
  fullName: z.string().min(2, { message: 'Full name is required' }),
  address: z.string().min(5, { message: 'A valid address is required' }),
  city: z.string().min(2, { message: 'City is required' }),
  postalCode: z.string().min(4, { message: 'A valid postal code is required' }),
  country: z.string().min(2, { message: 'Country is required' }),

  // Payment
  cardName: z.string().min(2, { message: 'Name on card is required' }),
  cardNumber: z.string().refine((val) => /^\d{16}$/.test(val), { message: 'Enter a valid 16-digit card number' }),
  expiryDate: z.string().refine((val) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(val), { message: 'Use MM/YY format' }),
  cvc: z.string().refine((val) => /^\d{3,4}$/.test(val), { message: 'Invalid CVC' }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log('Checkout form submitted:', data);
    toast.success('Order Placed!', {
      description: 'Thank you for your purchase. A confirmation has been sent to your email.',
      duration: 5000,
    });
    // Redirect to a confirmation page or user dashboard after successful submission
    navigate('/userdashboardpage');
  };

  const orderItem = {
    name: 'Custom Italian Wool Blazer',
    details: 'Color: Midnight Blue, Cut: Slim',
    price: 750.00,
  };
  const shippingCost = 25.00;
  const total = orderItem.price + shippingCost;

  return (
    <div className="flex flex-col min-h-screen bg-background font-body text-foreground">
      <Header />
      <main className="flex-grow container py-28 md:py-32">
        <h1 className="text-4xl md:text-5xl font-heading mb-8 md:mb-12 text-center">Checkout</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
            
            {/* Left Column: Shipping & Payment */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-2xl flex items-center gap-3"><Truck className="h-6 w-6 text-primary"/>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem className="sm:col-span-2"><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem className="sm:col-span-2"><FormLabel>Street Address</FormLabel><FormControl><Input placeholder="123 Atelier Avenue" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Paris" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="postalCode" render={({ field }) => (
                    <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input placeholder="75001" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="country" render={({ field }) => (
                    <FormItem className="sm:col-span-2"><FormLabel>Country</FormLabel><FormControl><Input placeholder="France" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </CardContent>
              </Card>

              {/* Payment Details */}
              <Card>
                 <CardHeader>
                  <CardTitle className="font-heading text-2xl flex items-center gap-3"><CreditCard className="h-6 w-6 text-primary" />Payment Details</CardTitle>
                  <CardDescription>All transactions are secure and encrypted.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <FormField control={form.control} name="cardName" render={({ field }) => (
                    <FormItem className="sm:col-span-2"><FormLabel>Name on Card</FormLabel><FormControl><Input placeholder="Jane M. Doe" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="cardNumber" render={({ field }) => (
                    <FormItem className="sm:col-span-2"><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="expiryDate" render={({ field }) => (
                    <FormItem><FormLabel>Expiry Date</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="cvc" render={({ field }) => (
                    <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="lg:sticky lg:top-28">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{orderItem.name}</p>
                      <p className="text-sm text-muted-foreground">{orderItem.details}</p>
                    </div>
                    <p className="font-semibold">${orderItem.price.toFixed(2)}</p>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p>${orderItem.price.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-muted-foreground">Shipping</p>
                    <p>${shippingCost.toFixed(2)}</p>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                   <Button type="submit" size="lg" className="w-full">
                    <Lock className="mr-2 h-4 w-4" />
                    Place Order
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    By placing your order, you agree to our <Link to="/terms" className="underline hover:text-primary">Terms of Service</Link>.
                  </p>
                </CardFooter>
              </Card>
            </div>

          </form>
        </Form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;