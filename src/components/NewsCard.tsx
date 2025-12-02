import { Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NewsCardProps {
  title: string;
  summary: string;
  date: string;
  url: string;
}

const NewsCard = ({ title, summary, date, url }: NewsCardProps) => {
  return (
    <Card className="group h-full transition-all duration-300 hover:shadow-hover border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <time>{date}</time>
        </div>
        <CardTitle className="text-base font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">{summary}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
        >
          Ler mais
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
