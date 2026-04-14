interface ScoreCircleProps {
  score: number;
  size?: number;
}

const ScoreCircle = ({ score, size = 160 }: ScoreCircleProps) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return "hsl(var(--success))";
    if (score >= 50) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  const getLabel = () => {
    if (score >= 80) return "Отлично";
    if (score >= 60) return "Хорошо";
    if (score >= 40) return "Удовлетворительно";
    return "Требует доработки";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 100 100" className="animate-score-fill">
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="8"
        />
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          className="transition-all duration-1000"
        />
        <text
          x="50" y="46"
          textAnchor="middle"
          className="text-2xl font-bold"
          fill="hsl(var(--foreground))"
          fontSize="22"
          fontWeight="700"
        >
          {score}
        </text>
        <text
          x="50" y="60"
          textAnchor="middle"
          fill="hsl(var(--muted-foreground))"
          fontSize="8"
        >
          из 100
        </text>
      </svg>
      <span className="text-sm font-medium" style={{ color: getColor() }}>
        {getLabel()}
      </span>
    </div>
  );
};

export default ScoreCircle;
