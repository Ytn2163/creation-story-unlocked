import { CheckCircle, AlertTriangle, XCircle, Lightbulb, ListChecks, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScoreCircle from "./ScoreCircle";

export interface AnalysisData {
  score: number;
  summary: string;
  sections_found: string[];
  sections_missing: string[];
  issues: { type: "error" | "warning" | "info"; text: string }[];
  recommendations: string[];
  kpi_found: string[];
}

const AnalysisResults = ({ data }: { data: AnalysisData }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Score + Summary */}
      <div className="grid gap-6 md:grid-cols-[auto_1fr]">
        <Card className="shadow-card flex items-center justify-center p-6">
          <ScoreCircle score={data.score} />
        </Card>
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Общая оценка</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{data.summary}</p>
          </CardContent>
        </Card>
      </div>

      {/* Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ListChecks className="h-5 w-5 text-success" />
              Найденные разделы ({data.sections_found.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.sections_found.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-success shrink-0" />
                <span>{s}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <XCircle className="h-5 w-5 text-destructive" />
              Отсутствующие разделы ({data.sections_missing.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.sections_missing.length === 0 ? (
              <p className="text-sm text-muted-foreground">Все обязательные разделы присутствуют</p>
            ) : (
              data.sections_missing.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <XCircle className="h-4 w-4 text-destructive shrink-0" />
                  <span>{s}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Issues */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Выявленные проблемы ({data.issues.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.issues.map((issue, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border p-3">
              <Badge
                variant={issue.type === "error" ? "destructive" : "secondary"}
                className="mt-0.5 shrink-0"
              >
                {issue.type === "error" ? "Ошибка" : issue.type === "warning" ? "Внимание" : "Инфо"}
              </Badge>
              <p className="text-sm">{issue.text}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Lightbulb className="h-5 w-5 text-warning" />
            Рекомендации ({data.recommendations.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-3 text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {i + 1}
              </span>
              <p>{rec}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* KPIs */}
      {data.kpi_found.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-5 w-5 text-primary" />
              Выделенные KPI и показатели
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {data.kpi_found.map((kpi, i) => (
              <Badge key={i} variant="outline" className="text-sm">
                {kpi}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalysisResults;
