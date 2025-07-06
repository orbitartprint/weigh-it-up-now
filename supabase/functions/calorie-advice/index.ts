
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
    const { age, gender, tdeeValue, weightGoal } = await req.json();
    
    console.log('Calorie advice request:', { age, gender, tdeeValue, weightGoal });

    // Get the API key from environment
    const apiKey = Deno.env.get('OPENROUTER_API_KEY');
    
    if (!apiKey) {
      console.error('No API key found. Please set OPENROUTER_API_KEY in Supabase secrets.');
      throw new Error('API key not configured');
    }

    console.log('Making request to OpenRouter API for calorie advice...');

    const messages = [
      {
        "role": "user",
        "content": `For a ${age}-year-old ${gender} with a Total Daily Energy Expenditure (TDEE) of ${Math.round(tdeeValue)} calories, aiming to "${weightGoal.toLowerCase()}" their weight: Suggest 3 general, healthy meal or snack ideas OR 2 concise, non-intensive exercise types that could contribute to their goal. Focus on practical, easy-to-understand suggestions. Emphasize that this is general advice and not a personalized diet or exercise plan. Keep it under 120 words. Respond directly with the advice text.`
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
        "model": "deepseek/deepseek-r1:free",
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 200,
        "top_p": 1.0,
        "frequency_penalty": 0,
        "presence_penalty": 0
      })
    });

    console.log('OpenRouter API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('OpenRouter API response received for calorie advice');
    
    const advice = data.choices[0]?.message?.content || "Could not generate personalized advice.";

    return new Response(JSON.stringify({ advice }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in calorie-advice function:', error);
    return new Response(
      JSON.stringify({ 
        advice: "Sorry, we couldn't generate personalized advice at the moment. Please try again later." 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
