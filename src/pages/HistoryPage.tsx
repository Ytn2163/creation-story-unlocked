import { FileText, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";

const HistoryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-4xl py-10">
        <h1 className="text-3xl font-bold text-foreground">История анализов</h1>
        <p className="mt-2 text-muted-foreground mb-8">
          Здесь будут отображаться ваши предыдущие анализы
        </p>

        <Card className="shadow-card">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Пока нет анализов</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              Загрузите техническое задание на странице анализа, и результат появится здесь
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default HistoryPage;
