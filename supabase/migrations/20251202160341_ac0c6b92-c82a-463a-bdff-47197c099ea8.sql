-- Create knowledge base table for tax reform content
CREATE TABLE public.knowledge_base (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public read access
ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read knowledge base
CREATE POLICY "Knowledge base is publicly readable" 
ON public.knowledge_base 
FOR SELECT 
USING (true);

-- Insert initial knowledge base content about tax reform
INSERT INTO public.knowledge_base (title, content, category, source_url) VALUES
('Lei Complementar 214/2025 - Visão Geral', 'A LC 214/2025 regulamenta a Reforma Tributária aprovada pela EC 132/2023. Institui o Imposto sobre Bens e Serviços (IBS) e a Contribuição sobre Bens e Serviços (CBS), que substituirão gradualmente ICMS, ISS, PIS, Cofins e IPI. O período de transição vai de 2026 a 2033.', 'legislacao', 'https://www.planalto.gov.br/ccivil_03/leis/lcp/Lcp214.htm'),
('Alíquotas Teste 2026', 'Em 2026, entram em vigor as alíquotas-teste: 0,1% para o IBS (Imposto sobre Bens e Serviços) e 0,9% para a CBS (Contribuição sobre Bens e Serviços). Essas alíquotas reduzidas servem para testar o novo sistema tributário antes da implementação plena.', 'aliquotas', 'https://www.gov.br/fazenda/pt-br/assuntos/reforma-tributaria'),
('Domicílio Tributário Eletrônico (DTE)', 'A partir de janeiro de 2026, contribuintes deverão cadastrar seu Domicílio Tributário Eletrônico (DTE) para receber comunicações oficiais sobre IBS e CBS. O DTE será o canal oficial de comunicação entre Fisco e contribuinte no novo sistema.', 'obrigacoes', 'https://www.gov.br/fazenda/pt-br/assuntos/reforma-tributaria'),
('IBS - Imposto sobre Bens e Serviços', 'O IBS é um imposto de competência compartilhada entre Estados e Municípios, que substituirá o ICMS e o ISS. Será não-cumulativo, com crédito amplo, cobrado no destino e terá alíquota uniforme definida pelo Comitê Gestor do IBS.', 'tributos', 'https://www.gov.br/fazenda/pt-br/assuntos/reforma-tributaria'),
('CBS - Contribuição sobre Bens e Serviços', 'A CBS é uma contribuição federal que substituirá PIS e Cofins. Incidirá sobre operações com bens e serviços, será não-cumulativa com direito a crédito amplo, e terá alíquota única definida por lei federal.', 'tributos', 'https://www.gov.br/fazenda/pt-br/assuntos/reforma-tributaria'),
('Regime Específico - Combustíveis', 'Combustíveis terão regime específico com alíquota ad rem (por quantidade) e monofasia. A cobrança será concentrada em uma única etapa da cadeia produtiva, simplificando a tributação do setor.', 'regimes_especificos', 'https://www.gov.br/fazenda/pt-br/assuntos/reforma-tributaria'),
('Cesta Básica Nacional', 'A Reforma Tributária prevê alíquota zero para produtos da Cesta Básica Nacional de Alimentos. A lista de produtos será definida em lei complementar, incluindo itens essenciais como arroz, feijão, leite e carnes.', 'beneficios', 'https://www.gov.br/fazenda/pt-br/assuntos/reforma-tributaria'),
('Cashback para Baixa Renda', 'O sistema de cashback devolverá parte dos tributos pagos por famílias de baixa renda cadastradas no CadÚnico. A devolução será feita diretamente na conta do beneficiário, reduzindo a regressividade do sistema tributário.', 'beneficios', 'https://www.gov.br/fazenda/pt-br/assuntos/reforma-tributaria'),
('Split Payment', 'O split payment é o mecanismo de divisão automática do pagamento no momento da transação. Parte do valor vai diretamente para o Fisco, reduzindo a sonegação e inadimplência tributária.', 'mecanismos', 'https://www.gov.br/fazenda/pt-br/assuntos/reforma-tributaria'),
('Comitê Gestor do IBS', 'O Comitê Gestor do IBS será responsável pela administração, arrecadação e fiscalização do imposto. Terá representantes de Estados e Municípios e definirá regras uniformes para todo o país.', 'governanca', 'https://www.gov.br/fazenda/pt-br/assuntos/reforma-tributaria');