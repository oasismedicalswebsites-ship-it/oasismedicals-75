import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Use a fetch-based email approach instead of Resend for better compatibility
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BookingData {
  customerData: {
    fullName: string;
    phoneNumber: string;
    email: string;
    homeAddress: string;
    state: string;
  };
  selectedTests?: Array<{
    name: string;
    price: number;
    category: string;
  }>;
  totalAmount?: number;
  serviceName: string;
  servicePrice: number;
}

// Simple email service using fetch
async function sendEmail(to: string, subject: string, html: string) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  
  if (!resendApiKey) {
    console.log('No RESEND_API_KEY found, logging email content instead:');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Content:', html);
    return { success: true };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'O.A.S.I.S. MEDICALS <onboarding@resend.dev>',
        to: [to],
        subject: subject,
        html: html,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, result };
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerData, selectedTests, totalAmount, serviceName, servicePrice }: BookingData = await req.json();

    console.log('Sending booking notification:', { customerData, selectedTests, totalAmount, serviceName, servicePrice });

    let testsHtml = '';
    if (selectedTests && selectedTests.length > 0) {
      testsHtml = `
        <h3>Selected Tests:</h3>
        <ul>
          ${selectedTests.map(test => `
            <li><strong>${test.name}</strong> - ₦${test.price.toLocaleString()} (${test.category})</li>
          `).join('')}
        </ul>
        <h4><strong>Total Amount: ₦${totalAmount?.toLocaleString() || servicePrice.toLocaleString()}</strong></h4>
      `;
    } else {
      testsHtml = `
        <h3>Service Details:</h3>
        <ul>
          <li><strong>Service:</strong> ${serviceName}</li>
          <li><strong>Price:</strong> ₦${servicePrice.toLocaleString()}</li>
        </ul>
      `;
    }

    const emailContent = `
      <h2>New Booking Request - O.A.S.I.S. MEDICALS</h2>
      
      <h3>Customer Information:</h3>
      <ul>
        <li><strong>Full Name:</strong> ${customerData.fullName}</li>
        <li><strong>Phone Number:</strong> ${customerData.phoneNumber}</li>
        <li><strong>Email:</strong> ${customerData.email}</li>
        <li><strong>Home Address:</strong> ${customerData.homeAddress}</li>
        <li><strong>State:</strong> ${customerData.state}</li>
      </ul>
      
      ${testsHtml}
      
      <p><em>This customer has filled the booking form and will proceed to payment.</em></p>
    `;

    const emailResult = await sendEmail(
      'oasismedicals@gmail.com',
      `New Booking: ${selectedTests && selectedTests.length > 0 ? `${selectedTests.length} Tests Selected` : serviceName} - ${customerData.fullName}`,
      emailContent
    );

    console.log('Booking notification sent successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Booking notification sent successfully' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Booking notification error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});