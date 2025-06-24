import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Pencil, Trash2, User, Ruler, Package } from "lucide-react";

// Custom Components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MeasurementInputFieldGroup from "@/components/MeasurementInputFieldGroup";

// shadcn/ui Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

// --- Placeholder Data ---

const orderHistory = [
  {
    id: "ORD-2024-A8B4",
    date: "2024-07-15",
    items: "Custom Linen Suit",
    total: "€749.99",
    status: "Shipped",
  },
  {
    id: "ORD-2024-C2D9",
    date: "2024-08-01",
    items: "Silk-Cashmere Blazer",
    total: "€599.00",
    status: "Processing",
  },
  {
    id: "ORD-2024-E1F6",
    date: "2024-08-10",
    items: "Two Egyptian Cotton Shirts",
    total: "€280.50",
    status: "Awaiting Production",
  },
];

const measurementProfiles = [
  {
    name: "My Standard Fit",
    data: { neck: 40, chest: 102, waist: 88, hips: 100, sleeve: 64, inseam: 80, shoulder: 46, thigh: 60 },
  },
  {
    name: "Relaxed Summer Fit",
    data: { neck: 40, chest: 106, waist: 92, hips: 104, sleeve: 63, inseam: 78, shoulder: 47, thigh: 62 },
  },
];

// --- Form Schema for User Profile ---

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

const UserDashboardPage = () => {
  console.log("UserDashboardPage loaded");
  const { toast } = useToast();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Alexandre Dubois",
      email: "alex.dubois@example.com",
    },
  });

  function onProfileSubmit(data: ProfileFormData) {
    console.log("Profile updated:", data);
    toast({
      title: "Profile Updated",
      description: "Your personal information has been saved successfully.",
    });
  }
  
  function onSaveMeasurements(profileName: string, data: any) {
    console.log("Saving new measurement profile:", profileName, data);
    // In a real app, you would add this to the `measurementProfiles` state
    toast({
        title: "Profile Saved!",
        description: `Measurement profile "${profileName}" has been successfully saved.`,
    });
  }

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
        case 'shipped': return 'default';
        case 'processing': return 'secondary';
        case 'awaiting production': return 'outline';
        default: return 'secondary';
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-24 md:py-28 lg:py-32">
        <div className="mb-8 md:mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
            My Dashboard
          </h1>
          <p className="mt-2 text-lg text-muted-foreground font-body">
            Manage your orders, measurements, and personal details.
          </p>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mb-8">
            <TabsTrigger value="orders"><Package className="mr-2 h-4 w-4" />Order History</TabsTrigger>
            <TabsTrigger value="measurements"><Ruler className="mr-2 h-4 w-4" />Measurement Profiles</TabsTrigger>
            <TabsTrigger value="profile"><User className="mr-2 h-4 w-4" />My Profile</TabsTrigger>
          </TabsList>

          {/* Order History Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Your Orders</CardTitle>
                <CardDescription className="font-body">
                  A complete list of your past and in-progress custom creations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-body">Order ID</TableHead>
                      <TableHead className="font-body">Date</TableHead>
                      <TableHead className="font-body">Items</TableHead>
                      <TableHead className="font-body">Total</TableHead>
                      <TableHead className="font-body text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderHistory.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium font-body">{order.id}</TableCell>
                        <TableCell className="font-body text-muted-foreground">{order.date}</TableCell>
                        <TableCell className="font-body">{order.items}</TableCell>
                        <TableCell className="font-body">{order.total}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Measurement Profiles Tab */}
          <TabsContent value="measurements">
             <div className="grid gap-8 lg:grid-cols-5">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-heading">Saved Profiles</CardTitle>
                             <CardDescription className="font-body">
                                Your saved measurements for quick checkouts.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {measurementProfiles.map((profile) => (
                                <div key={profile.name} className="p-4 border rounded-sm flex justify-between items-center">
                                    <p className="font-body font-semibold">{profile.name}</p>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                         <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-3">
                    <MeasurementInputFieldGroup onSaveProfile={onSaveMeasurements} />
                </div>
             </div>
          </TabsContent>

          {/* My Profile Tab */}
          <TabsContent value="profile">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="font-heading">Personal Information</CardTitle>
                <CardDescription className="font-body">
                  Update your name and email address.
                </CardDescription>
              </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onProfileSubmit)}>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body">Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="ml-auto">Save Changes</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboardPage;