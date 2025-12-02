import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";

const newsData = [
  {
    title: "Regulamentação da Reforma Tributária é sancionada",
    summary: "Presidente sanciona Lei Complementar 214/2025 que regulamenta a Reforma Tributária. Nova legislação define regras para IBS e CBS que entram em vigor em 2026.",
    date: "16 de janeiro de 2025",
    url: "https://www.gov.br/fazenda/pt-br/assuntos/reforma-tributaria",
  },
  {
    title: "Alíquotas-teste definidas para 2026",
    summary: "Governo confirma alíquotas-teste de 0,1% para IBS e 0,9% para CBS durante o período de transição. Objetivo é testar o novo sistema antes da implementação plena.",
    date: "10 de janeiro de 2025",
    url: "https://www.gov.br/fazenda/pt-br/assuntos/reforma-tributaria",
  },
  {
    title: "DTE será obrigatório a partir de janeiro de 2026",
    summary: "Contribuintes deverão cadastrar Domicílio Tributário Eletrônico para receber comunicações sobre IBS e CBS. Sistema será o canal oficial entre Fisco e contribuinte.",
    date: "20 de dezembro de 2024",
    url: "https://www.gov.br/fazenda/pt-br/assuntos/reforma-tributaria",
  },
  {
    title: "Comitê Gestor do IBS inicia atividades",
    summary: "Comitê responsável pela administração do IBS começa a definir regras operacionais. Órgão terá representantes de Estados e Municípios.",
    date: "15 de dezembro de 2024",
    url: "https://www.gov.br/fazenda/pt-br/assuntos/reforma-tributaria",
  },
  {
    title: "Cesta básica terá alíquota zero confirmada",
    summary: "Lista de produtos com alíquota zero incluirá arroz, feijão, leite, carnes e outros itens essenciais. Medida visa reduzir impacto nos consumidores de baixa renda.",
    date: "10 de dezembro de 2024",
    url: "https://www.gov.br/fazenda/pt-br/assuntos/reforma-tributaria",
  },
];

const Noticias = () => {
  return (
    <>
      <Helmet>
        <title>Notícias - ReformaDúvidas | Atualizações da Reforma Tributária 2026</title>
        <meta name="description" content="Últimas notícias e atualizações sobre a Reforma Tributária brasileira de 2026. IBS, CBS, LC 214/2025 e mais." />
        <meta name="keywords" content="notícias reforma tributária, 2026, IBS, CBS, atualizações, Brasil" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8 md:py-12">
          <section className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Notícias
            </h1>
            <p className="text-muted-foreground">
              Últimas atualizações sobre a Reforma Tributária 2026
            </p>
          </section>

          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsData.map((news, index) => (
              <div
                key={index}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <NewsCard
                  title={news.title}
                  summary={news.summary}
                  date={news.date}
                  url={news.url}
                />
              </div>
            ))}
          </section>

          <section className="mt-12 rounded-xl border border-border bg-card p-6 text-center">
            <h2 className="mb-2 text-lg font-semibold text-card-foreground">
              Quer receber atualizações?
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Acompanhe o portal oficial da Receita Federal e do Ministério da Fazenda para informações atualizadas.
            </p>
            <a
              href="https://www.gov.br/fazenda/pt-br/assuntos/reforma-tributaria"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Acessar Portal Oficial
            </a>
          </section>
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

export default Noticias;
