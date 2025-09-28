import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigationWithLoading } from '@/hooks/useNavigationWithLoading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, FileText, User, Phone, Mail, MapPin, LogOut, Stethoscope, Activity, TestTube } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PremiumLoadingScreen from '@/components/PremiumLoadingScreen';

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  date_of_birth: string | null;
  gender: string | null;
}

interface MedicalRecord {
  id: string;
  record_type: string;
  test_date: string;
  notes: string | null;
  test_results: string | null;
  file_url: string | null;
  patient_name: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface Booking {
  id: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  status: string;
  patient_name: string;
  email: string;
  phone: string;
  message: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const { navigateWithLoading, isNavigating, targetSection } = useNavigationWithLoading();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigateWithLoading('/auth', 'Patient Login');
    }
  }, [user, loading, navigateWithLoading]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user!.id)
        .maybeSingle();
      
      setProfile(profileData);

      // Fetch medical records
      const { data: recordsData } = await supabase
        .from('medical_records')
        .select('*')
        .eq('user_id', user!.id)
        .order('test_date', { ascending: false });
      
      setMedicalRecords(recordsData || []);

      // Fetch bookings
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user!.id)
        .order('booking_date', { ascending: false });
      
      setBookings(bookingsData || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } else {
      navigateWithLoading('/', 'Home');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      pending: 'secondary',
      confirmed: 'default',
      completed: 'default',
      cancelled: 'destructive',
      ready: 'default',
      paid: 'default',
      failed: 'destructive',
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  if (loading || dataLoading) {
    return <PremiumLoadingScreen isVisible={true} message="Loading your dashboard" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20">
        <div className="bg-gradient-to-r from-medical-cyan/10 to-medical-magenta/10 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Patient Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                  Welcome back, {profile?.first_name || user?.email?.split('@')[0]}
                </p>
              </div>
              <Button variant="outline" onClick={handleSignOut} className="hover-scale">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Records</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{medicalRecords.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Results</CardTitle>
                  <TestTube className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                   <div className="text-2xl font-bold">
                     {medicalRecords.filter(r => r.test_results === null).length}
                   </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Medical Records</CardTitle>
                </CardHeader>
                <CardContent>
                   {medicalRecords.slice(0, 3).map((record) => (
                     <div key={record.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                       <div>
                         <p className="font-medium">{record.record_type}</p>
                         <p className="text-sm text-muted-foreground">
                           {new Date(record.test_date).toLocaleDateString()}
                         </p>
                       </div>
                       <Badge variant="outline">Record</Badge>
                     </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                   {bookings.slice(0, 3).map((booking) => (
                     <div key={booking.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                       <div>
                         <p className="font-medium">{booking.service}</p>
                         <p className="text-sm text-muted-foreground">
                           {new Date(booking.preferred_date).toLocaleDateString()} at {booking.preferred_time}
                         </p>
                       </div>
                       {getStatusBadge(booking.status)}
                     </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="records" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Medical Records</CardTitle>
                <CardDescription>View all your test results and medical records</CardDescription>
              </CardHeader>
              <CardContent>
                {medicalRecords.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No medical records found</p>
                ) : (
                  <div className="space-y-4">
                    {medicalRecords.map((record) => (
                      <Card key={record.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="p-2 bg-medical-cyan/10 rounded-full">
                                <TestTube className="h-4 w-4 text-medical-cyan" />
                              </div>
                               <div>
                                 <h3 className="font-semibold">{record.record_type}</h3>
                                 <p className="text-sm text-muted-foreground">
                                   {new Date(record.test_date).toLocaleDateString()}
                                 </p>
                                 {record.notes && (
                                   <p className="text-sm mt-1">{record.notes}</p>
                                 )}
                               </div>
                            </div>
                            <Badge variant="outline">Record</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Bookings</CardTitle>
                <CardDescription>View and manage your test bookings</CardDescription>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No bookings found</p>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="p-2 bg-medical-magenta/10 rounded-full">
                                <Calendar className="h-4 w-4 text-medical-magenta" />
                              </div>
                               <div>
                                 <h3 className="font-semibold">{booking.service}</h3>
                                 <p className="text-sm text-muted-foreground">
                                   {new Date(booking.preferred_date).toLocaleDateString()} at {booking.preferred_time}
                                 </p>
                               </div>
                             </div>
                             {getStatusBadge(booking.status)}
                           </div>
                         </CardContent>
                       </Card>
                     ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    <p className="text-sm text-muted-foreground">{profile?.first_name || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <p className="text-sm text-muted-foreground">{profile?.last_name || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <p className="text-sm text-muted-foreground">{profile?.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Date of Birth</label>
                    <p className="text-sm text-muted-foreground">
                      {profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Gender</label>
                    <p className="text-sm text-muted-foreground">{profile?.gender || 'Not provided'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
      </div>
      
      <PremiumLoadingScreen 
        isVisible={isNavigating}
        message={`Navigating to ${targetSection}`}
      />
    </div>
  );
};

export default Dashboard;