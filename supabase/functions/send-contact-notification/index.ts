import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactData {
  fullName: string;
  phone: string;
  email?: string;
  testType: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
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
    const contactData: ContactData = await req.json();

    console.log('Sending contact notification:', contactData);

    const emailContent = `
      <h2>New Contact Form Submission - O.A.S.I.S. MEDICALS</h2>
      
      <h3>Customer Information:</h3>
      <ul>
        <li><strong>Full Name:</strong> ${contactData.fullName}</li>
        <li><strong>Phone Number:</strong> ${contactData.phone}</li>
        ${contactData.email ? `<li><strong>Email:</strong> ${contactData.email}</li>` : ''}
      </ul>
      
      <h3>Test Information:</h3>
      <ul>
        <li><strong>Selected Test:</strong> ${contactData.testType}</li>
        ${contactData.preferredDate ? `<li><strong>Preferred Date:</strong> ${contactData.preferredDate}</li>` : ''}
        ${contactData.preferredTime ? `<li><strong>Preferred Time:</strong> ${contactData.preferredTime}</li>` : ''}
      </ul>
      
      ${contactData.notes ? `
        <h3>Additional Notes:</h3>
        <p>${contactData.notes}</p>
      ` : ''}
      
      <p><em>This customer has submitted a contact form request and is waiting for confirmation.</em></p>
    `;

    const emailResult = await sendEmail(
      'oasismedicals@gmail.com',
      `New Contact Form: ${contactData.testType} - ${contactData.fullName}`,
      emailContent
    );

    console.log('Contact notification sent successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact notification sent successfully' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Contact notification error:', error);
    
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