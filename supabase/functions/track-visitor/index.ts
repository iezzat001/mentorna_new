
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Simple IP geolocation function (you can enhance this with a proper service)
const getCountryFromIP = async (ip: string): Promise<string | null> => {
  try {
    // Using a free IP geolocation service
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country`);
    const data = await response.json();
    return data.country || null;
  } catch (error) {
    console.error('Geolocation error:', error);
    return null;
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { sessionId, pagePath, referrer, userAgent, deviceType } = await req.json()

    // Get client IP
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('cf-connecting-ip') || 
                    req.headers.get('x-real-ip') || 
                    'unknown'

    // Hash IP for privacy
    const ipHash = clientIP !== 'unknown' ? await crypto.subtle.digest('SHA-256', new TextEncoder().encode(clientIP)).then(
      buffer => Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('')
    ) : null

    // Get country information
    const country = clientIP !== 'unknown' ? await getCountryFromIP(clientIP.split(',')[0].trim()) : null;

    // Insert visitor data
    const { error } = await supabase
      .from('visitor_analytics')
      .insert({
        session_id: sessionId,
        page_path: pagePath,
        referrer: referrer || null,
        user_agent: userAgent || null,
        device_type: deviceType || null,
        ip_hash: ipHash,
        country: country
      })

    if (error) {
      console.error('Error inserting visitor data:', error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Track visitor error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
