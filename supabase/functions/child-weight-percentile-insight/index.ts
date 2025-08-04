import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { 
      ageInMonths, 
      weightKg, 
      heightCm, 
      gender, 
      weightPercentile,
      heightPercentile 
    } = await req.json()

    const openrouterApiKey = Deno.env.get('OPENROUTER_API_KEY')
    if (!openrouterApiKey) {
      throw new Error('OpenRouter API key not configured')
    }

    const prompt = `You are a pediatric health educator providing insights about child growth percentiles for parents. 

Child Information:
- Age: ${ageInMonths} months old
- Weight: ${weightKg} kg
- Height: ${heightCm} cm
- Gender: ${gender}
- Weight Percentile: ${weightPercentile.toFixed(1)}%
- Height Percentile: ${heightPercentile.toFixed(1)}%

Please provide a helpful, reassuring, and educational insight about these growth percentiles in 2-3 sentences. Focus on:
1. What these percentiles mean in simple terms for parents
2. Whether the growth pattern appears typical or if it suggests monitoring
3. General advice about healthy growth for children this age

Keep the tone warm, informative, and avoid causing unnecessary worry. Remember that most children grow within a wide range of normal patterns.
Avoid greetings at the beginning like OK, Hello, Yes, or Absolutely. Start with the answer right away`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openrouterApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful pediatric health educator who explains child growth percentiles to parents in a clear, reassuring way.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    const insight = data.choices?.[0]?.message?.content

    if (!insight) {
      throw new Error('No insight generated')
    }

    return new Response(
      JSON.stringify({ insight }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in child-weight-percentile-insight function:', error)
    
    return new Response(
      JSON.stringify({ 
        insight: "Your child's growth measurements have been recorded. For specific guidance about your child's growth and development, please consult with your pediatrician who can provide personalized advice based on your child's complete health picture." 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 200
      }
    )
  }
})
