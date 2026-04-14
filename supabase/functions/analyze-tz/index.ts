import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { text, filename } = await req.json();
    if (!text || typeof text !== "string") {
      return new Response(JSON.stringify({ error: "No text provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const truncatedText = text.slice(0, 15000);

    const systemPrompt = `Ты — эксперт по анализу технических заданий (ТЗ) научных проектов, грантовых заявок и НИОКР. 
Проанализируй предоставленное техническое задание и верни результат СТРОГО в формате JSON с помощью вызова функции.

Оцени документ по следующим критериям:
- Полнота структуры (наличие обязательных разделов)
- Чёткость формулировок (отсутствие размытых фраз)
- Наличие KPI, сроков, ожидаемых результатов
- Логическая согласованность
- Соответствие стандартам ТЗ для научных проектов

Обязательные разделы ТЗ: Общее описание, Цели, Задачи, Требования, Сроки, Ожидаемые результаты, KPI/Показатели, Ресурсы, Архитектура/Методология.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Проанализируй следующее техническое задание (файл: ${filename || "unknown"}):\n\n${truncatedText}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "submit_analysis",
              description: "Submit the TZ analysis results",
              parameters: {
                type: "object",
                properties: {
                  score: { type: "number", description: "Quality score from 0 to 100" },
                  summary: { type: "string", description: "Brief summary of the analysis in Russian" },
                  sections_found: { type: "array", items: { type: "string" }, description: "List of found sections" },
                  sections_missing: { type: "array", items: { type: "string" }, description: "List of missing sections" },
                  issues: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        type: { type: "string", enum: ["error", "warning", "info"] },
                        text: { type: "string" },
                      },
                      required: ["type", "text"],
                    },
                    description: "List of identified issues",
                  },
                  recommendations: { type: "array", items: { type: "string" }, description: "List of recommendations in Russian" },
                  kpi_found: { type: "array", items: { type: "string" }, description: "List of KPIs and metrics found" },
                },
                required: ["score", "summary", "sections_found", "sections_missing", "issues", "recommendations", "kpi_found"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "submit_analysis" } },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI gateway error: " + response.status);
    }

    const aiResult = await response.json();
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in response");

    const analysisData = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(analysisData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-tz error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
