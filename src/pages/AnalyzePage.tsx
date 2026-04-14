import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import AnalysisResults from "@/components/AnalysisResults";
import type { AnalysisData } from "@/components/AnalysisResults";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AnalyzePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisData | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setResults(null);

    try {
      const text = await file.text();

      const { data, error } = await supabase.functions.invoke("analyze-tz", {
        body: { text, filename: file.name },
      });

      if (error) throw error;

      setResults(data as AnalysisData);
    } catch (err: any) {
      console.error("Analysis error:", err);
      toast({
        variant: "destructive",
        title: "Ошибка анализа",
        description: err.message || "Не удалось выполнить анализ. Попробуйте ещё раз.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-4xl py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Анализ технического задания</h1>
          <p className="mt-2 text-muted-foreground">
            Загрузите документ для автоматического анализа качества
          </p>
        </div>

        <FileUpload file={file} onFileSelect={setFile} onFileClear={() => { setFile(null); setResults(null); }} />

        {file && !results && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="hero"
              size="lg"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Анализируем...
                </>
              ) : (
                "Начать анализ"
              )}
            </Button>
          </div>
        )}

        {isAnalyzing && (
          <div className="mt-12 flex flex-col items-center gap-4 animate-fade-in">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-primary/20" />
              <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
            <p className="text-muted-foreground">AI анализирует ваш документ...</p>
          </div>
        )}

        {results && (
          <div className="mt-8">
            <AnalysisResults data={results} />
          </div>
        )}
      </main>
    </div>
  );
};

export default AnalyzePage;
