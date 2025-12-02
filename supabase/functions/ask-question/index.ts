import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question } = await req.json();
    console.log("Received question:", question);

    if (!question || typeof question !== 'string') {
      throw new Error('Question is required');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch knowledge base content
    const { data: knowledgeBase, error: dbError } = await supabase
      .from('knowledge_base')
      .select('*');

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error('Failed to fetch knowledge base');
    }

    console.log("Knowledge base entries:", knowledgeBase?.length);

    // Simple keyword matching for semantic search
    const questionLower = question.toLowerCase();
    const keywords = questionLower.split(/\s+/).filter(w => w.length > 3);
    
    const relevantDocs = knowledgeBase?.filter(doc => {
      const contentLower = (doc.title + ' ' + doc.content).toLowerCase();
      return keywords.some(keyword => contentLower.includes(keyword));
    }).slice(0, 3) || [];

    console.log("Relevant docs found:", relevantDocs.length);

    // Build context from relevant documents
    const context = relevantDocs.map(doc => 
      `Título: ${doc.title}\nConteúdo: ${doc.content}\nFonte: ${doc.source_url}`
    ).join('\n\n');

    // Call Lovable AI Gateway
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Você é um especialista em Reforma Tributária brasileira (2026). Responda perguntas de forma clara e objetiva, baseando-se nas informações fornecidas.

Contexto da base de conhecimento:
${context || 'Nenhum documento relevante encontrado na base de conhecimento.'}

Regras:
1. Responda em português brasileiro
2. Seja claro e objetivo
3. Mencione as fontes quando relevante
4. Se não souber algo com certeza, diga que recomenda consultar as fontes oficiais
5. Foque em informações práticas sobre IBS, CBS, alíquotas-teste de 2026, DTE, e LC 214/2025`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: "Muitas requisições. Por favor, aguarde alguns segundos e tente novamente." 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error('Failed to get AI response');
    }

    const aiResponse = await response.json();
    const answer = aiResponse.choices?.[0]?.message?.content || 'Desculpe, não consegui processar sua pergunta.';

    console.log("AI response received successfully");

    // Get relevant links
    const links = relevantDocs.map(doc => ({
      title: doc.title,
      url: doc.source_url
    }));

    return new Response(JSON.stringify({ 
      answer,
      links: links.length > 0 ? links : [
        { title: 'Portal da Reforma Tributária', url: 'https://www.gov.br/fazenda/pt-br/assuntos/reforma-tributaria' },
        { title: 'Lei Complementar 214/2025', url: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/Lcp214.htm' }
      ]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ask-question function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Erro ao processar pergunta' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
