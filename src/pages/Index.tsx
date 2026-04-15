import { Link } from "react-router-dom";
import { FileSearch, Sparkles, BarChart3, MessageSquare, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";

const features = [
  {
    icon: FileSearch,
    title: "Анализ структуры",
    description: "Автоматическая проверка наличия обязательных разделов ТЗ",
  },
  {
    icon: Sparkles,
    title: "AI-проверка текста",
    description: "Выявление размытых формулировок, ошибок и несоответствий",
  },
  {
    icon: BarChart3,
    title: "Оценка качества",
    description: "Балльная оценка от 0 до 100 с детальной разбивкой",
  },
  {
    icon: MessageSquare,
    title: "AI-ассистент",
    description: "Чат-бот для помощи в написании и улучшении ТЗ",
  },
];

const capabilities = [
  "Загрузка PDF, DOCX и TXT файлов",
  "Проверка полноты и структуры документа",
  "Выявление размытых формулировок и ошибок",
  "Генерация рекомендаций по улучшению",
  "Оценка качества по шкале от 0 до 100",
  "Формирование итогового отчёта",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="gradient-hero px-4 py-20 text-center">
        <div className="container max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-foreground mb-6">
            <Sparkles className="h-4 w-4" />
            AI-powered анализ
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            Анализ и улучшение
            <br />
            технических заданий
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/70">
            Интеллектуальная система на основе ИИ для проверки качества ТЗ научных проектов, грантовых заявок и НИОКР
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/analyze" className="flex items-center gap-2">
                Начать анализ <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/chat">AI-ассистент</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <h2 className="text-center text-3xl font-bold text-foreground">Возможности системы</h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
          Комплексный анализ технических заданий с применением технологий ИИ
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} className="shadow-card hover:shadow-elevated transition-shadow border-0 bg-card">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Capabilities List */}
      <section className="bg-card py-20">
        <div className="container max-w-2xl">
          <h2 className="text-center text-3xl font-bold text-foreground">Что умеет система</h2>
          <div className="mt-10 space-y-4">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border bg-background p-4 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CheckCircle className="h-5 w-5 text-success shrink-0" />
                <span className="text-foreground">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <div className="container">
          R&D Project Analyzer — AI-система анализа технических заданий
        </div>
      </footer>
    </div>
  );
};

export default Index;
