import { useState, useEffect } from "react";
import { X, MessageSquare, Lightbulb, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const OnboardingModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("reformaduvidas-onboarding");
    if (!hasSeenOnboarding) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("reformaduvidas-onboarding", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm animate-fade-in">
      <div className="relative mx-4 w-full max-w-md rounded-2xl bg-card p-6 shadow-hover animate-slide-up">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary">
            <MessageSquare className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>

        <h2 className="mb-2 text-center text-xl font-bold text-card-foreground">
          Bem-vindo ao ReformaDúvidas!
        </h2>
        <p className="mb-6 text-center text-muted-foreground">
          Tire suas dúvidas sobre a Reforma Tributária 2026 de forma rápida e fácil.
        </p>

        <div className="mb-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent">
              <MessageSquare className="h-4 w-4 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-card-foreground">Digite sua dúvida</h3>
              <p className="text-sm text-muted-foreground">
                Pergunte sobre IBS, CBS, alíquotas ou qualquer tema da reforma.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent">
              <Lightbulb className="h-4 w-4 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-card-foreground">Receba explicações claras</h3>
              <p className="text-sm text-muted-foreground">
                Nossa IA explica de forma simples e objetiva.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent">
              <BookOpen className="h-4 w-4 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-card-foreground">Acesse fontes oficiais</h3>
              <p className="text-sm text-muted-foreground">
                Links para documentos e portais do governo.
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleClose}
          className="w-full gradient-primary text-primary-foreground"
        >
          Começar a usar
        </Button>
      </div>
    </div>
  );
};

export default OnboardingModal;
