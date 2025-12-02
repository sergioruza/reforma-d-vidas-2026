import { ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Link {
  title: string;
  url: string;
}

interface AnswerCardProps {
  question: string;
  answer: string;
  links: Link[];
}

const AnswerCard = ({ question, answer, links }: AnswerCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full animate-slide-up shadow-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg font-semibold text-foreground">
            {question}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            className="h-8 w-8 shrink-0"
            aria-label="Copiar resposta"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="prose prose-sm max-w-none text-card-foreground">
          <p className="whitespace-pre-wrap leading-relaxed">{answer}</p>
        </div>

        {links.length > 0 && (
          <div className="border-t border-border pt-4">
            <h4 className="mb-3 text-sm font-medium text-muted-foreground">
              Links oficiais para mais informações:
            </h4>
            <div className="flex flex-wrap gap-2">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnswerCard;
