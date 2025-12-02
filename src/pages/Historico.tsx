import { Helmet } from "react-helmet-async";
import { Trash2, Clock, Search } from "lucide-react";
import Header from "@/components/Header";
import AnswerCard from "@/components/AnswerCard";
import { Button } from "@/components/ui/button";
import { useSearchHistory } from "@/hooks/useSearchHistory";

const Historico = () => {
  const { history, removeFromHistory, clearHistory } = useSearchHistory();

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(timestamp));
  };

  return (
    <>
      <Helmet>
        <title>Histórico - ReformaDúvidas | Suas buscas sobre Reforma Tributária</title>
        <meta name="description" content="Veja seu histórico de buscas sobre a Reforma Tributária brasileira de 2026." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8 md:py-12">
          <section className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Histórico
              </h1>
              <p className="text-muted-foreground">
                Suas buscas recentes ({history.length} {history.length === 1 ? "item" : "itens"})
              </p>
            </div>
            {history.length > 0 && (
              <Button
                variant="outline"
                onClick={clearHistory}
                className="shrink-0"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Limpar histórico
              </Button>
            )}
          </section>

          {history.length === 0 ? (
            <section className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent">
                <Search className="h-8 w-8 text-accent-foreground" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                Nenhuma busca ainda
              </h2>
              <p className="max-w-md text-muted-foreground">
                Suas buscas sobre a Reforma Tributária aparecerão aqui. Vá para a página inicial e faça sua primeira pergunta!
              </p>
              <Button asChild className="mt-6 gradient-primary text-primary-foreground">
                <a href="/">Fazer uma pergunta</a>
              </Button>
            </section>
          ) : (
            <section className="space-y-6">
              {history.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <time>{formatDate(item.timestamp)}</time>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromHistory(item.id)}
                      className="h-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <AnswerCard
                    question={item.question}
                    answer={item.answer}
                    links={item.links}
                  />
                </div>
              ))}
            </section>
          )}
        </main>

        <footer className="border-t border-border bg-card py-8 mt-16">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>© 2025 ReformaDúvidas. Informações baseadas na legislação oficial.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Historico;
