import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, MessageCircle, Clock, Navigation } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Center",
      details: ["Lagos/Abeokuta Expressway, Iyana Ilogbo Bus Stop", "Ifo LGA, Ogun State"],
      action: "Get Directions"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["08058135226", "07033600770"],
      action: "Call Now"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: ["Quick booking", "Instant responses"],
      action: "Chat Now"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon-Fri: 7:30am-7:30pm, Sat: 8:00am-7:00pm", "Sun: 1:00pm-6:00pm, Holidays: 9:00am-5:00pm"],
      action: "Book Now"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      
      // Build WhatsApp message
      const fullName = formData.get('fullName') as string;
      const phone = formData.get('phone') as string;
      const email = formData.get('email') as string;
      const testType = formData.get('testType') as string;
      const preferredDate = formData.get('preferredDate') as string;
      const preferredTime = formData.get('preferredTime') as string;
      const notes = formData.get('notes') as string;
      
      let message = `*New Booking Request*\n\n`;
      message += `Name: ${fullName}\n`;
      message += `Phone: ${phone}\n`;
      if (email) message += `Email: ${email}\n`;
      message += `Test: ${testType}\n`;
      if (preferredDate) message += `Preferred Date: ${preferredDate}\n`;
      if (preferredTime) message += `Preferred Time: ${preferredTime}\n`;
      if (notes) message += `\nNotes: ${notes}`;
      
      // Open WhatsApp
      window.open(`https://wa.me/2347033600770?text=${encodeURIComponent(message)}`, '_blank');
      
      toast({
        title: "Redirecting to WhatsApp",
        description: "You'll be connected with us on WhatsApp to confirm your appointment.",
      });
      
      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to open WhatsApp. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/2347033600770', '_blank');
  };

  const makeCall = () => {
    window.open('tel:+2347033600770', '_self');
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Contact <span className="bg-gradient-to-r from-medical-cyan to-medical-magenta bg-clip-text text-transparent">Us</span>
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Ready to book your test? Get in touch with us for professional diagnostic services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              const handleAction = () => {
                if (info.title === "WhatsApp") openWhatsApp();
                else if (info.title === "Call Us") makeCall();
                else if (info.title === "Visit Our Center") {
                  window.open('https://maps.app.goo.gl/QLUwoTxUVJYSWKRdA', '_blank');
                }
              };

              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-medical-cyan to-medical-magenta rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-xs sm:text-sm text-muted-foreground break-words">{detail}</p>
                        ))}
                        <Button 
                          onClick={handleAction}
                          variant="outline" 
                          size="sm" 
                          className="mt-3 text-primary border-primary hover:bg-primary hover:text-white text-xs sm:text-sm"
                        >
                          {info.action}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-2 border-primary/20">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-2xl flex items-center">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-primary" />
                  Book Your Test Online
                </CardTitle>
                <p className="text-muted-foreground text-sm sm:text-base">Fill out this form and we'll contact you to confirm your appointment</p>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                     <div className="space-y-1 sm:space-y-2">
                       <Label htmlFor="fullName" className="text-xs sm:text-sm">Full Name *</Label>
                       <Input id="fullName" name="fullName" placeholder="Enter your full name" required className="text-sm sm:text-base" />
                     </div>
                     <div className="space-y-1 sm:space-y-2">
                       <Label htmlFor="phone" className="text-xs sm:text-sm">Phone Number *</Label>
                       <Input id="phone" name="phone" type="tel" placeholder="08012345678" required className="text-sm sm:text-base" />
                     </div>
                  </div>

                   <div className="space-y-1 sm:space-y-2">
                     <Label htmlFor="email" className="text-xs sm:text-sm">Email Address</Label>
                     <Input id="email" name="email" type="email" placeholder="your.email@example.com" className="text-sm sm:text-base" />
                   </div>

                   <div className="space-y-1 sm:space-y-2">
                     <Label htmlFor="testType" className="text-xs sm:text-sm">Select Test *</Label>
                     <Select name="testType" required>
                       <SelectTrigger className="text-sm sm:text-base bg-background z-50">
                         <SelectValue placeholder="Select test type" />
                       </SelectTrigger>
                      <SelectContent className="bg-background border shadow-lg z-50 max-h-[300px] overflow-y-auto">
                        {/* Fever Tests */}
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-secondary/50">Fever Tests</div>
                        <SelectItem value="fever-basic">Basic Fever Package - ₦15,000</SelectItem>
                        <SelectItem value="fever-comprehensive">Comprehensive Fever Package - ₦30,000</SelectItem>
                        
                        {/* Men's Health */}
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-secondary/50">Men's Health</div>
                        <SelectItem value="men-opal">Men's Full Body Checkup (Opal) - ₦45,000</SelectItem>
                        <SelectItem value="men-ruby">Men's Full Body Checkup (Ruby) - ₦80,000</SelectItem>
                        <SelectItem value="men-diamond">Men's Full Body Checkup (Diamond) - ₦180,000</SelectItem>
                        <SelectItem value="men-fertility-basic">Men's Fertility Tests (Basic) - ₦15,000</SelectItem>
                        <SelectItem value="men-fertility-standard">Men's Fertility Tests (Standard) - ₦60,000</SelectItem>
                        <SelectItem value="erectile-dysfunction">Erectile Dysfunction Package - ₦100,000</SelectItem>
                        
                        {/* Women's Health */}
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-secondary/50">Women's Health</div>
                        <SelectItem value="women-opal">Women's Full Body Checkup (Opal) - ₦45,000</SelectItem>
                        <SelectItem value="women-ruby">Women's Full Body Checkup (Ruby) - ₦70,000</SelectItem>
                        <SelectItem value="women-diamond">Women's Full Body Checkup (Diamond) - ₦200,000</SelectItem>
                        <SelectItem value="women-fertility-basic">Women's Fertility Tests (Basic) - ₦40,000</SelectItem>
                        <SelectItem value="women-fertility-standard">Women's Fertility Tests (Standard) - ₦55,000</SelectItem>
                        <SelectItem value="women-fertility-comprehensive">Women's Fertility Tests (Comprehensive) - ₦150,000</SelectItem>
                        
                        {/* Ultrasound Scans */}
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-secondary/50">Ultrasound Scans</div>
                        <SelectItem value="pelvic-obstetrics">Pelvic/Obstetrics - ₦3,000</SelectItem>
                        <SelectItem value="abdominal">Abdominal - ₦7,000</SelectItem>
                        <SelectItem value="abdominopelvic">Abdominopelvic - ₦10,000</SelectItem>
                        <SelectItem value="upper-abdominal">Upper Abdominal - ₦5,000</SelectItem>
                        <SelectItem value="lower-abdominal">Lower Abdominal - ₦5,000</SelectItem>
                        <SelectItem value="breast">Breast - ₦7,000</SelectItem>
                        <SelectItem value="neck-thyroid">Neck/Thyroid - ₦10,000</SelectItem>
                        <SelectItem value="transvaginal">Transvaginal Pelvic Scan (TVS) - ₦10,000</SelectItem>
                        <SelectItem value="prostate">Prostate scan (Transrectal) - ₦10,000</SelectItem>
                        <SelectItem value="folliculometry">Folliculometry - ₦30,000</SelectItem>
                        <SelectItem value="scrotal">Scrotal Scan - ₦7,000</SelectItem>
                        
                        {/* Pre-marital Screening */}
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-secondary/50">Pre-marital Screening</div>
                        <SelectItem value="premarital-basic">Pre-marital Test (Basic) - ₦12,000</SelectItem>
                        <SelectItem value="premarital-standard-female">Pre-marital Test (Standard) - Female - ₦20,000</SelectItem>
                        <SelectItem value="premarital-comprehensive-female">Pre-marital Test (Comprehensive) - Female - ₦100,000</SelectItem>
                        <SelectItem value="premarital-comprehensive-male">Pre-marital Test (Comprehensive) - Male - ₦120,000</SelectItem>
                        
                        {/* Domestic Staff Screening */}
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-secondary/50">Domestic Staff Screening</div>
                        <SelectItem value="domestic-basic">Basic Screening Package - ₦20,000</SelectItem>
                        <SelectItem value="domestic-standard">Standard Screening Package - ₦30,000</SelectItem>
                        
                        {/* Blood Tests */}
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-secondary/50">Blood Tests (Haematology)</div>
                        <SelectItem value="full-blood-count">Full Blood Count - ₦7,000</SelectItem>
                        <SelectItem value="haemoglobin">Haemoglobin (HB) - ₦2,000</SelectItem>
                        <SelectItem value="pcv">Pack Cell Volume (PCV) - ₦2,000</SelectItem>
                        <SelectItem value="blood-grouping">Blood Grouping (ABO & Rh) - ₦2,000</SelectItem>
                        <SelectItem value="genotype">HB Genotype - ₦2,000</SelectItem>
                        
                        {/* Chemistry Tests */}
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-secondary/50">Chemistry Tests</div>
                        <SelectItem value="fasting-blood-sugar">Fasting Blood Sugar - ₦2,000</SelectItem>
                        <SelectItem value="random-blood-sugar">Random Blood Sugar - ₦2,000</SelectItem>
                        <SelectItem value="hba1c">HbA1c - ₦10,000</SelectItem>
                        <SelectItem value="liver-function">Liver Function Test (LFT) - ₦18,000</SelectItem>
                        <SelectItem value="kidney-function">E/U/Cr (Kidney Function) - ₦18,000</SelectItem>
                        <SelectItem value="lipid-profile">Full Lipid Profile - ₦18,000</SelectItem>
                        <SelectItem value="total-cholesterol">Total Cholesterol - ₦5,000</SelectItem>
                        
                        {/* Infection Screening */}
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-secondary/50">Infection Screening</div>
                        <SelectItem value="hiv-screening">HIV Screening Test - ₦4,000</SelectItem>
                        <SelectItem value="hepatitis-b">Hepatitis B Screening - ₦2,000</SelectItem>
                        <SelectItem value="hepatitis-c">Hepatitis C Screening - ₦3,000</SelectItem>
                        <SelectItem value="malaria-test">Malaria Parasites - ₦2,000</SelectItem>
                        <SelectItem value="typhoid-test">Widal Reaction (Typhoid) - ₦2,000</SelectItem>
                        
                        {/* Hormonal Tests */}
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-secondary/50">Hormonal Tests</div>
                        <SelectItem value="thyroid-function">Thyroid Function Test (TFT) - ₦50,000</SelectItem>
                        <SelectItem value="tsh">TSH - ₦15,000</SelectItem>
                        <SelectItem value="psa">PSA (Prostate Specific Antigen) - ₦10,000</SelectItem>
                        <SelectItem value="pregnancy-test">Pregnancy Test (Blood) - ₦2,000</SelectItem>
                        
                        {/* X-Ray Services */}
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-secondary/50">X-Ray Services</div>
                        <SelectItem value="chest-xray">Chest X-Ray (PA) - ₦10,000</SelectItem>
                        <SelectItem value="chest-xray-lateral">Chest X-Ray (AP & Lat) - ₦12,000</SelectItem>
                        <SelectItem value="skull-xray">Skull X-Ray - ₦12,000</SelectItem>
                        
                        {/* ECG */}
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-secondary/50">ECG</div>
                        <SelectItem value="ecg">ECG (Pre & Post Exercise) - ₦12,000</SelectItem>
                        
                        {/* Other Services */}
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-secondary/50">Other Services</div>
                        <SelectItem value="urinalysis">Urinalysis - ₦2,000</SelectItem>
                        <SelectItem value="stool-test">Stool Microscopy - ₦3,000</SelectItem>
                        <SelectItem value="multiple">Multiple Tests</SelectItem>
                        <SelectItem value="consultation">Consultation Only</SelectItem>
                        <SelectItem value="other">Other (Please specify in notes)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                     <div className="space-y-1 sm:space-y-2">
                       <Label htmlFor="preferredDate" className="text-xs sm:text-sm">Preferred Date</Label>
                       <Input id="preferredDate" name="preferredDate" type="date" className="text-sm sm:text-base" />
                     </div>
                     <div className="space-y-1 sm:space-y-2">
                       <Label htmlFor="preferredTime" className="text-xs sm:text-sm">Preferred Time</Label>
                       <Select name="preferredTime">
                         <SelectTrigger className="text-sm sm:text-base">
                           <SelectValue placeholder="Select time" />
                         </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                          <SelectItem value="evening">Evening (4PM - 8PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                   <div className="space-y-1 sm:space-y-2">
                     <Label htmlFor="notes" className="text-xs sm:text-sm">Additional Notes</Label>
                     <Textarea 
                       id="notes" 
                       name="notes"
                       placeholder="Any specific requirements or questions..."
                       rows={3}
                       className="text-sm sm:text-base"
                     />
                   </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-medical-cyan to-medical-magenta hover:opacity-90 text-sm sm:text-base py-2.5 sm:py-3"
                    >
                      {isSubmitting ? "Sending..." : "Book Appointment"}
                      <Navigation className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                    </Button>
                    <Button 
                      type="button"
                      onClick={openWhatsApp}
                      variant="outline" 
                      className="flex-1 text-sm sm:text-base py-2.5 sm:py-3"
                    >
                      <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Quick WhatsApp
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Location Section - Responsive layout */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-48 sm:h-64 lg:h-80">
              <img 
                src="/lovable-uploads/8047a331-d422-41ec-9a8a-ca357f059dd9.png" 
                alt="OASIS Medical Center building exterior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                <div className="text-center text-white">
                  <MapPin className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4" />
                  <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Visit Our Diagnostic Center</h3>
                  <p className="text-white/90 mb-3 sm:mb-4 text-sm sm:text-base">Located in Ifo, Ogun State</p>
                  <Button 
                    onClick={() => window.open('https://maps.app.goo.gl/QLUwoTxUVJYSWKRdA', '_blank')}
                    className="bg-gradient-to-r from-medical-cyan to-medical-magenta hover:opacity-90 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;