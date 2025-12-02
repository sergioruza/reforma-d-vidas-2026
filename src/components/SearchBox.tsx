import { useState } from "react";
import { Search, Mic, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const SearchBox = ({ onSearch, isLoading = false, placeholder = "Digite sua dúvida sobre a Reforma Tributária 2026..." }: SearchBoxProps) => {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Seu navegador não suporta reconhecimento de voz. Tente usar o Chrome.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };

    recognition.start();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className={cn(
              "w-full rounded-xl border border-input bg-card py-4 pl-12 pr-28 text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              "transition-all duration-200 shadow-card hover:shadow-hover",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          />
        </div>
        <div className="absolute right-2 flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={startVoiceRecognition}
            disabled={isLoading || isListening}
            className={cn(
              "h-10 w-10 rounded-lg",
              isListening && "text-primary animate-pulse-soft"
            )}
            aria-label="Busca por voz"
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="h-10 rounded-lg px-4 gradient-primary text-primary-foreground"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Buscar"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBox;
