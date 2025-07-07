
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { bmiValue, bmiCategory, age, gender } = await req.json();
    
    console.log('BMI insight request:', { bmiValue, bmiCategory, age, gender });

    // Get the API key from environment
    const apiKey = Deno.env.get('OPENROUTER_API_KEY');
    
    if (!apiKey) {
      console.error('No API key found. Please set OPENROUTER_API_KEY in Supabase secrets.');
      throw new Error('API key not configured');
    }

    console.log('Making request to OpenRouter API for BMI insight...');

    const messages = [
      {
        "role": "user",
        "content": `Analyze a user's BMI result: ${bmiValue.toFixed(1)} (${bmiCategory}). ${age ? `The user is a ${age}-year-old.` : ''} ${gender ? `The user identifies as ${gender}.` : ''} Provide a concise, encouraging, and informative interpretation of this BMI, explaining what it generally means and suggesting 2-3 general, non-medical next steps (e.g., consult a doctor, maintain healthy habits, consider diet/exercise adjustments). Emphasize that this is not medical advice. Keep it under 100 words. Respond directly with the interpretation text.`
      }
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://www.weightvs.com",
        "X-Title": "WeightVs.com",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "anthropic/claude-3-haiku:beta",
        "messages": messages,
        "temperature": 0.3,
        "max_tokens": 200,
        "top_p": 0.9,
        "frequency_penalty": 0.1,
        "presence_penalty": 0.1
      })
    });

    console.log('OpenRouter API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('OpenRouter API response received for BMI insight');
    
    let insight = data.choices?.[0]?.message?.content;
    
    if (!insight || insight.trim().length === 0) {
      console.error('Empty or missing insight content:', data);
      insight = "Sorry, we couldn't generate a personalized insight at the moment. Please try again later.";
    } else {
      // Clean up the insight text
      insight = insight.trim();
      console.log('Generated insight length:', insight.length);
    }

    return new Response(JSON.stringify({ insight }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in bmi-insight function:', error);
    return new Response(
      JSON.stringify({ 
        insight: "Sorry, we couldn't generate a personalized insight at the moment. Please try again later." 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
