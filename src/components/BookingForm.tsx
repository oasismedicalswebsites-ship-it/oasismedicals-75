import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Test categories and data - Exact pricing from website
const testCategories = {
  'Fever Packages': [
    { name: 'Basic Package (FBC, Malaria, Widal, Urinalysis)', price: 15000 },
    { name: 'Comprehensive Package (ESR, FBC, Malaria, Widal, Stool, Urinalysis, TB test)', price: 30000 },
  ],
  'Men Packages': [
    { name: 'Full Body Checkup (Opal)', price: 45000 },
    { name: 'Full Body Checkup (Ruby)', price: 80000 },
    { name: 'Full Body Checkup (Diamond)', price: 180000 },
    { name: 'Fertility/Hormonal Tests (Basic)', price: 15000 },
    { name: 'Fertility/Hormonal Tests (Standard)', price: 60000 },
    { name: 'Erectile Dysfunction Package', price: 100000 },
  ],
  'Women Packages': [
    { name: 'Full Body Checkup (Opal)', price: 45000 },
    { name: 'Full Body Checkup (Ruby)', price: 70000 },
    { name: 'Full Body Checkup (Diamond)', price: 200000 },
    { name: 'Fertility/Hormonal Tests (Basic)', price: 40000 },
    { name: 'Fertility/Hormonal Tests (Standard)', price: 55000 },
    { name: 'Fertility/Hormonal Tests (Comprehensive)', price: 150000 },
  ],
  'Domestic Staff Screening': [
    { name: 'Basic Screening Package', price: 20000 },
    { name: 'Standard Screening Package', price: 30000 },
  ],
  'Pre-marital Screening': [
    { name: 'Pre-marital Test (Basic) - Male and Female', price: 12000 },
    { name: 'Pre-marital Test (Standard) - Female', price: 20000 },
    { name: 'Pre-marital Test (Comprehensive) - Female', price: 100000 },
    { name: 'Pre-marital Test (Comprehensive) - Male', price: 120000 },
  ],
  'Ultrasound Scan': [
    { name: 'Pelvic/Obstetrics', price: 3000 },
    { name: 'Abdominal', price: 7000 },
    { name: 'Abdominopelvic', price: 10000 },
    { name: 'Upper Abdominal', price: 5000 },
    { name: 'Lower Abdominal', price: 5000 },
    { name: 'Breast', price: 7000 },
    { name: 'Neck/Thyroid', price: 10000 },
    { name: 'Transvaginal Pelvic Scan (TVS)', price: 10000 },
    { name: 'Prostate scan (Transrectal)', price: 10000 },
    { name: 'Folliculometry', price: 30000 },
    { name: 'Scrotal Scan', price: 7000 },
  ],
  'Haematology': [
    { name: 'Full Blood count (Automation)', price: 7000 },
    { name: 'Haemoglobin (HB)', price: 2000 },
    { name: 'Pack cell volume (PCV)', price: 2000 },
    { name: 'WBC (Total)', price: 3000 },
    { name: 'WBC (Differential)', price: 4000 },
    { name: 'Platelet Count', price: 5000 },
    { name: 'E.S.R', price: 3000 },
    { name: 'HB Genotype', price: 2000 },
    { name: 'Bleeding time (BT)', price: 5000 },
    { name: 'Clotting Time', price: 5000 },
    { name: 'Thrombin time (TT)', price: 10000 },
    { name: 'Prothrombin time (PT)', price: 10000 },
    { name: 'Blood Grouping (ABO & Rh)', price: 2000 },
  ],
  'Chemistry': [
    { name: 'Fasting blood sugar', price: 2000 },
    { name: 'Random blood sugar', price: 2000 },
    { name: '2Hr Post-P blood sugar', price: 5000 },
    { name: 'Glucose tolerance test G.T.T', price: 10000 },
    { name: 'HbA1c', price: 10000 },
    { name: 'E/U/Cr', price: 18000 },
    { name: 'Urea', price: 5000 },
    { name: 'Full electrolytes', price: 10000 },
    { name: 'Creatinine', price: 5000 },
    { name: 'Liver Function Test (LFT)', price: 18000 },
    { name: 'Total Billirubin', price: 5000 },
    { name: 'Direct Billirubin', price: 5000 },
    { name: 'Full Lipid Profile', price: 18000 },
    { name: 'Total Cholesterol', price: 5000 },
  ],
  'Microbiology & Serology': [
    { name: 'STOOL: Microscopy', price: 3000 },
    { name: 'STOOL: M/C/S', price: 7000 },
    { name: 'STOOL: Occult Blood', price: 7000 },
    { name: 'BLOOD: Malaria Parasites', price: 2000 },
    { name: 'BLOOD: Widal Reaction', price: 2000 },
    { name: 'BLOOD: V.D.R.L', price: 2000 },
    { name: 'BLOOD: Culture & Sensitivity', price: 12000 },
    { name: 'BLOOD: H.Pylori', price: 5000 },
    { name: 'BLOOD: TB (Serum)', price: 5000 },
    { name: 'BLOOD: Microfilaria', price: 5000 },
    { name: 'BLOOD: Trypanosome', price: 5000 },
    { name: 'BLOOD: Leishmania', price: 5000 },
    { name: 'URINE: Microscopy for Shistosoma oval', price: 3000 },
    { name: 'URINE: Urinalysis', price: 2000 },
    { name: 'URINE: M/C/S', price: 7000 },
    { name: 'SPUTUM: ZN Stain (A-AFB) x 1', price: 5000 },
    { name: 'SPUTUM: M/C/S', price: 10000 },
    { name: 'SPUTUM: GenXpert', price: 7000 },
    { name: 'SEMINAL FLUID: Analysis', price: 10000 },
    { name: 'SEMINAL FLUID: M/C/S', price: 15000 },
    { name: 'SKIN: Snips For Microfilaria', price: 10000 },
    { name: 'SKIN: Fungal Element', price: 10000 },
    { name: 'SWAB: HVS M/C/S', price: 6000 },
    { name: 'SWAB: Urethral M/C/S', price: 8000 },
    { name: 'SWAB: OTHERS M/C/S', price: 10000 },
    { name: 'HIV Screening test', price: 4000 },
    { name: 'Hepatitis \'A\' Screening', price: 5000 },
    { name: 'Hepatitis \'B\' Screening', price: 2000 },
    { name: 'Hepatitis \'C\' Screening', price: 3000 },
    { name: 'PREGNANCY TEST: Blood (for early detection)', price: 2000 },
  ],
  'Hormonal/Endocrine Profiles': [
    { name: 'Male Infertility/erectile dysfunction (FSH, LH, PRL, Test/Prog, E2)', price: 50000 },
    { name: 'Female Infertility/Hirsutism (FSH, LH, PRL, Test/Prog, E2)', price: 50000 },
    { name: 'FSH', price: 10000 },
    { name: 'LH', price: 10000 },
    { name: 'PROL', price: 10000 },
    { name: 'TEST.', price: 10000 },
    { name: 'PROG', price: 10000 },
    { name: 'E2', price: 10000 },
    { name: 'PSA', price: 10000 },
    { name: 'TFT', price: 50000 },
    { name: 'TSH', price: 15000 },
  ],
  'Histology & Cytology': [
    { name: 'Histology studies (Small)', price: 30000 },
    { name: 'Histology studies (Medium)', price: 35000 },
    { name: 'Histology studies (Large)', price: 40000 },
    { name: 'Histology studies (Complex)', price: 45000 },
  ],
  'Electrocardiograph (ECG)': [
    { name: 'Pre & Post Exercise', price: 12000 },
  ],
  'X-Ray with Radiological Report': [
    { name: 'Skull(AP & Lat)', price: 12000 },
    { name: 'Skull(All views)', price: 15000 },
    { name: 'Mandibles', price: 10000 },
    { name: 'Mastoids', price: 10000 },
    { name: 'Sinuses', price: 10000 },
    { name: 'Post Nasal Space', price: 10000 },
    { name: 'Cervical Spine (AP & lat)', price: 10000 },
    { name: 'Cervical Spine(with Obliges)', price: 10000 },
    { name: 'Chest (PA)', price: 10000 },
    { name: 'Chest (AP & Lat)', price: 12000 },
    { name: 'Thoracic Inlet', price: 12000 },
    { name: 'Clavicle', price: 10000 },
    { name: 'Abdomen (AP & Lat)', price: 15000 },
    { name: 'Pelvis', price: 15000 },
    { name: 'Hips', price: 15000 },
    { name: 'Lumbosacral (AP & Lat)', price: 15000 },
    { name: 'Thoracic Spine (AP & Lat)', price: 15000 },
    { name: 'Abdomen for missing ICUD', price: 15000 },
    { name: 'Shoulder joint (Ap & lat)', price: 10000 },
    { name: 'Arm (Humerus) (AP & Lat)', price: 10000 },
    { name: 'Elbow Joint (Ap & lat)', price: 10000 },
    { name: 'Forearm (Radius & Ulna)', price: 10000 },
    { name: 'Wrist Joint', price: 10000 },
    { name: 'Hands/Fingers & Palm', price: 10000 },
    { name: 'Knee (AP & Lat)', price: 10000 },
    { name: 'Leg (Tibia & fibular)(AP & Lat)', price: 10000 },
    { name: 'Ankle Joint', price: 10000 },
    { name: 'Foot (AP & Oblique)', price: 10000 },
    { name: 'Femur or Thigh (AP & Lat)', price: 12000 },
  ],
};

type SelectedTest = {
  name: string;
  price: number;
  category: string;
};

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  homeAddress: z.string().min(5, 'Please enter your home address'),
  state: z.string().min(2, 'Please enter your state'),
});

type FormData = z.infer<typeof formSchema>;

interface BookingFormProps {
  serviceName?: string;
  servicePrice?: number;
}

const BookingForm: React.FC<BookingFormProps> = ({ serviceName, servicePrice }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTests, setSelectedTests] = useState<SelectedTest[]>([]);
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});
  const [totalAmount, setTotalAmount] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      homeAddress: '',
      state: '',
    },
  });

  // Calculate total amount whenever selected tests change
  useEffect(() => {
    const total = selectedTests.reduce((sum, test) => sum + test.price, 0);
    setTotalAmount(total);
  }, [selectedTests]);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleTestSelection = (test: { name: string; price: number }, category: string, checked: boolean) => {
    if (checked) {
      setSelectedTests(prev => [...prev, { ...test, category }]);
    } else {
      setSelectedTests(prev => prev.filter(t => t.name !== test.name));
    }
  };

  const isTestSelected = (testName: string) => {
    return selectedTests.some(test => test.name === testName);
  };

  const onSubmit = async (data: FormData) => {
    if (selectedTests.length === 0) {
      toast.error('Please select at least one test before proceeding.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send email notification with selected tests
      const { error: emailError } = await supabase.functions.invoke('send-booking-notification', {
        body: {
          customerData: data,
          selectedTests,
          totalAmount,
          serviceName: selectedTests.map(test => test.name).join(', '),
          servicePrice: totalAmount,
        },
      });

      if (emailError) {
        console.error('Email error:', emailError);
        toast.error('Failed to send booking notification. Please try again.');
        return;
      }

      toast.success('Booking details submitted successfully!');
      
      // Navigate to payment with all the data
      navigate('/payment', {
        state: {
          serviceName: selectedTests.map(test => test.name).join(', '),
          servicePrice: totalAmount,
          customerData: data,
          selectedTests,
        },
      });
    } catch (error) {
      console.error('Booking submission error:', error);
      toast.error('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Test Selection Section */}
      <Card>
        <CardHeader>
          <CardTitle>Select Medical Tests</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose from our comprehensive range of medical tests and services
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(testCategories).map(([category, tests]) => (
            <Collapsible 
              key={category} 
              open={openCategories[category]} 
              onOpenChange={() => toggleCategory(category)}
            >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-secondary/20 hover:bg-secondary/30 rounded-lg border transition-colors z-10 relative">
              <span className="font-semibold text-foreground">{category}</span>
              {openCategories[category] ? 
                <ChevronDown className="h-4 w-4" /> : 
                <ChevronRight className="h-4 w-4" />
              }
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2 bg-background border border-border rounded-lg p-2 shadow-md z-20 relative">
              {tests.map((test) => (
                <div key={test.name} className="flex items-center space-x-3 p-3 bg-card rounded border hover:bg-secondary/10 transition-colors">
                  <Checkbox
                    id={test.name}
                    checked={isTestSelected(test.name)}
                    onCheckedChange={(checked) => 
                      handleTestSelection(test, category, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={test.name}
                    className="flex-1 cursor-pointer flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1"
                  >
                    <span className="text-sm font-medium text-foreground">{test.name}</span>
                    <span className="text-sm font-bold text-primary">
                      ₦{test.price.toLocaleString()}
                    </span>
                  </label>
                </div>
              ))}
            </CollapsibleContent>
            </Collapsible>
          ))}
          
          {/* Selected Tests Summary */}
          {selectedTests.length > 0 && (
            <div className="sticky bottom-0 mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20 shadow-lg z-30">
              <h3 className="font-semibold text-foreground mb-3">Selected Tests ({selectedTests.length})</h3>
              <div className="space-y-2 max-h-32 md:max-h-40 overflow-y-auto">
                {selectedTests.map((test, index) => (
                  <div key={index} className="flex justify-between items-center text-sm gap-2">
                    <span className="truncate flex-1">{test.name}</span>
                    <span className="font-semibold text-primary flex-shrink-0">₦{test.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-primary/20 mt-3 pt-3">
                <div className="flex justify-between items-center text-lg font-bold text-primary">
                  <span>Total Amount:</span>
                  <span>₦{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Patient Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
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
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email address" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="homeAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Home Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your home address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your state" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Final Total Display - Mobile Sticky */}
              {selectedTests.length > 0 && (
                <div className="sticky bottom-0 p-4 bg-primary/10 rounded-lg border border-primary/30 shadow-lg z-30">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Final Total:</span>
                    <span className="text-2xl font-bold text-primary">₦{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || selectedTests.length === 0}
              >
                {isSubmitting ? 'Submitting...' : 
                 selectedTests.length === 0 ? 'Please Select Tests' :
                 `Continue to Payment (₦${totalAmount.toLocaleString()})`
                }
              </Button>
              
              {/* Call-to-notice for sample collection */}
              <div className="flex items-start space-x-2 p-3 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex-shrink-0 mt-0.5">
                  <span className="text-accent">⚠️</span>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  Sample collection at home or office attracts an extra charge based on distance. This will be discussed with you before confirmation.
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;