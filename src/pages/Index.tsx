import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import SearchBox from "@/components/SearchBox";
import AnswerCard from "@/components/AnswerCard";
import OnboardingModal from "@/components/OnboardingModal";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

interface SearchResult {
  question: string;
  answer: string;
  links: { title: string; url: string }[];
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const { addToHistory } = useSearchHistory();
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("ask-question", {
        body: { question: query },
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      const searchResult: SearchResult = {
        question: query,
        answer: data.answer,
        links: data.links || [],
      };

      setResult(searchResult);
      addToHistory(searchResult);
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Erro na busca",
        description: error instanceof Error ? error.message : "Não foi possível processar sua pergunta. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "O que é o IBS?",
    "Quais são as alíquotas-teste de 2026?",
    "Como funciona o DTE?",
    "O que muda com a CBS?",
  ];

  return (
    <>
      <Helmet>
        <title>ReformaDúvidas - Tire suas dúvidas sobre a Reforma Tributária 2026</title>
        <meta name="description" content="Tire suas dúvidas sobre a Reforma Tributária brasileira de 2026. Informações sobre IBS, CBS, alíquotas, DTE e LC 214/2025." />
        <meta name="keywords" content="reforma tributária, 2026, IBS, CBS, imposto, contribuição, Brasil, LC 214/2025, DTE" />
        <link rel="canonical" href="https://reformaduvidas.com.br" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <OnboardingModal />

        <main className="container mx-auto px-4 py-8 md:py-12">
          {/* Hero Section */}
          <section className="mx-auto max-w-3xl text-center mb-8 md:mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
              <Sparkles className="h-4 w-4" />
              Powered by IA
            </div>
            <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Tire suas dúvidas sobre a{" "}
              <span className="text-primary">Reforma Tributária 2026</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Pergunte sobre IBS, CBS, alíquotas, DTE e tudo sobre a nova legislação tributária brasileira.
            </p>

            <SearchBox onSearch={handleSearch} isLoading={isLoading} />

            {/* Suggested Questions */}
            {!result && (
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSearch(question)}
                    disabled={isLoading}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Result Section */}
          {result && (
            <section className="mx-auto max-w-3xl">
              <AnswerCard
                question={result.question}
                answer={result.answer}
                links={result.links}
              />
              <div className="mt-6 text-center">
                <button
                  onClick={() => setResult(null)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Fazer outra pergunta
                </button>
              </div>
            </section>
          )}

          {/* Info Section */}
          <section className="mx-auto max-w-4xl mt-16">
            <div className="grid gap-6 md:grid-cols-3">
              <article className="rounded-xl border border-border bg-card p-6 text-center">
                <div className="mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="mb-2 font-semibold text-card-foreground">LC 214/2025</h3>
                <p className="text-sm text-muted-foreground">
                  Base legal completa da Reforma Tributária com regulamentações atualizadas.
                </p>
              </article>
              <article className="rounded-xl border border-border bg-card p-6 text-center">
                <div className="mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="mb-2 font-semibold text-card-foreground">Alíquotas 2026</h3>
                <p className="text-sm text-muted-foreground">
                  IBS 0,1% e CBS 0,9% - alíquotas-teste do período de transição.
                </p>
              </article>
              <article className="rounded-xl border border-border bg-card p-6 text-center">
                <div className="mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                  <span className="text-2xl">📧</span>
                </div>
                <h3 className="mb-2 font-semibold text-card-foreground">DTE Jan/2026</h3>
                <p className="text-sm text-muted-foreground">
                  Domicílio Tributário Eletrônico obrigatório a partir de janeiro.
                </p>
              </article>
            </div>
          </section>
        </main>

        <footer className="border-t border-border bg-card py-8 mt-16">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>© 2025 ReformaDúvidas. Informações baseadas na legislação oficial.</p>
            <p className="mt-2">
              Este site não substitui consultoria jurídica ou contábil profissional.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
