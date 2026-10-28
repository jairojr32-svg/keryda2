export interface TreatmentItem {
  id: string;
  number: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  category: 'Estética' | 'Prevenção' | 'Restauração' | 'Reabilitação';
  summary: string;
  indications: string[];
  clinicalSteps: {
    step: string;
    detail: string;
  }[];
  benefits: string[];
  sessionInfo: string;
  whatsappSubject: string;
}

export interface SymptomOption {
  id: string;
  question: string;
  situation: string;
  recommendedTreatment: string;
  explanation: string;
  careNote: string;
  whatsappSubject: string;
}

export interface ComparisonRow {
  criterion: string;
  clareamento: string;
  resina: string;
  coroa: string;
  limpeza: string;
}

export const DOCTOR_INFO = {
  name: 'Dra. Kéryda Ramos',
  upperName: 'KÉRYDA RAMOS',
  role: 'Cirurgiã-Dentista',
  cro: 'CRO-GO 22911',
  fullCredential: 'CIRURGIÃ-DENTISTA | CRO-GO 22911',
  university: 'Universidade Federal de Goiás (UFG)',
  phoneDisplay: '62 98244 0962',
  phoneFormatted: '(62) 98244-0962',
  whatsappNumber: '5562982440962',
  instagramHandle: '@kerydaramos',
  instagramUrl: 'https://instagram.com/kerydaramos',
  email: 'drakerydaramos@gmail.com',
};

export const TREATMENTS_DATA: TreatmentItem[] = [
  {
    id: 'clareamento',
    number: '01',
    shortTitle: 'Clareamento Dental',
    title: 'Clareamento Dental Seguro & Individualizado',
    subtitle: 'Luminosidade natural com controle rigoroso de sensibilidade e preservação do esmalte.',
    category: 'Estética',
    summary:
      'O clareamento dental realizado sob supervisão clínica remove pigmentos profundos acumulados ao longo dos anos sem desgastar a estrutura dos dentes. A Dra. Kéryda Ramos ajusta a concentração do gel clareador e o protocolo (em consultório, supervisionado com moldeiras sob medida ou técnica combinada) de acordo com a sensibilidade e a rotina de cada paciente.',
    indications: [
      'Dentes amarelados ou escurecidos pelo tempo, café, chá, vinho ou pigmentos alimentares',
      'Pacientes que buscam rejuvenescer o sorriso mantendo 100% do formato original dos dentes',
      'Preparo prévio antes de trocar restaurações em resina ou confeccionar coroas/facetas',
      'Quem já tentou clarear antes e teve sensibilidade por falta de protocolo dessensibilizante',
    ],
    clinicalSteps: [
      {
        step: 'Avaliação & Profilaxia Prévia',
        detail: 'Exame de saúde gengival, verificação de trincas ou retrações e limpeza para máxima ação do gel.',
      },
      {
        step: 'Protocolo Dessensibilizante',
        detail: 'Aplicação de agentes remineralizantes e bloqueadores neurais para conforto durante todo o tratamento.',
      },
      {
        step: 'Sessões Clínicas / Moldeiras Personalizadas',
        detail: 'Aplicação controlada com barreira gengival protetora em consultório e/ou acompanhamento domiciliar seguro.',
      },
      {
        step: 'Polimento Final & Estabilização da Cor',
        detail: 'Hidratação do esmalte e orientações práticas para manter o branco natural por muito mais tempo.',
      },
    ],
    benefits: [
      'Preservação total da estrutura dentária (zero desgaste)',
      'Branco elegante, translúcido e harmônico com o rosto',
      'Controle ativo de sensibilidade antes, durante e após',
    ],
    sessionInfo: '1 a 3 sessões clínicas + protocolo personalizado',
    whatsappSubject: 'Avaliação para Clareamento Dental',
  },
  {
    id: 'limpeza-prevencao',
    number: '02',
    shortTitle: 'Limpeza & Prevenção',
    title: 'Profilaxia Profunda, Remoção de Tártaro & Saúde Gengival',
    subtitle: 'A base de todo sorriso saudável, hálito puro e longevidade para seus dentes e restaurações.',
    category: 'Prevenção',
    summary:
      'Muito além de uma limpeza comum, a profilaxia odontológica profissional remove o biofilme bacteriano invisível e o cálculo dental (tártaro) que a escovação diária não alcança. É o procedimento essencial para prevenir gengivite, sangramentos, perda óssea, cáries ocultas e manchas superficiais.',
    indications: [
      'Prevenção periódica recomendada a cada 6 meses para todas as idades',
      'Presença de tártaro, placas aderidas ou manchas extrínsecas de alimentação',
      'Sangramento gengival ao escovar ou passar o fio dental (gengivite)',
      'Manutenção obrigatória de resinas, coroas, próteses e tratamentos anteriores',
    ],
    clinicalSteps: [
      {
        step: 'Check-up Clínico & Mapeamento Periodontal',
        detail: 'Inspeção minuciosa de cada dente, gengivas e restaurações antigas para diagnóstico precoce.',
      },
      {
        step: 'Raspagem Ultrassônica Delicada',
        detail: 'Remoção precisa de tártaro supragengival e subgengival com pontas ultrassônicas de baixa vibração.',
      },
      {
        step: 'Jato Profilático & Polimento Coronário',
        detail: 'Remoção de manchas superficiais e alisamento do esmalte com pastas profiláticas de granulação decrescente.',
      },
      {
        step: 'Fluorterapia & Orientação de Higiene Individualizada',
        detail: 'Reforço mineral do esmalte e ajuste prático dos hábitos de escovação e fio dental.',
      },
    ],
    benefits: [
      'Sensação imediata de dentes lisos, limpos e hálito renovado',
      'Interrupção de sangramentos e inflamações na gengiva',
      'Prevenção de tratamentos complexos no futuro',
    ],
    sessionInfo: 'Sessão completa e confortável (45 a 60 min)',
    whatsappSubject: 'Agendamento de Limpeza e Check-up Odontológico',
  },
  {
    id: 'resinas',
    number: '03',
    shortTitle: 'Resinas & Restaurações',
    title: 'Restaurações Estéticas & Facetas em Resina Composta',
    subtitle: 'Arte e mimetismo óptico para reconstruir dentes, fechar espaços e devolver anatomia natural.',
    category: 'Restauração',
    summary:
      'Com resinas compostas nanoparticuladas de última geração e técnica de estratificação anatômica, reconstruímos dentes afetados por cáries, fraturas, desgastes ou restaurações antigas escurecidas. O material reproduz fielmente a cor, a opalescência e o brilho do dente natural, tornando a restauração praticamente invisível.',
    indications: [
      'Dentes com cáries, infiltrações ou restaurações antigas manchadas / em amálgama escuro',
      'Pequenas fraturas, bordas lascadas ou desgaste nos dentes anteriores e posteriores',
      'Fechamento de espaços entre os dentes (diastemas) e correção de formato com facetas em resina',
      'Recobrimento de raízes expostas (lesões cervicais não cariosas) que causam sensibilidade',
    ],
    clinicalSteps: [
      {
        step: 'Seleção Óptica de Cor e Estratificação',
        detail: 'Escolha precisa dos matizes de dentina e esmalte sob iluminação calibrada antes do isolamento.',
      },
      {
        step: 'Preparo Minimamente Invasivo',
        detail: 'Remoção exclusiva do tecido comprometido ou resina antiga deficiente, preservando o dente sadio.',
      },
      {
        step: 'Escultura Anatômica Camada por Camada',
        detail: 'Devolução dos pontos de contato, cúspides de mastigação e textura natural da superfície.',
      },
      {
        step: 'Acabamento & Polimento de Alto Brilho',
        detail: 'Sequência de discos, borrachas diamantadas e feltros para lisura idêntica ao esmalte natural.',
      },
    ],
    benefits: [
      'Resultado estético imediato em sessão única na maioria dos casos',
      'Adesão segura e preservação máxima da estrutura dental',
      'Conforto mastigatório e facilidade de passagem do fio dental',
    ],
    sessionInfo: 'Realizado em 1 sessão por região planejada',
    whatsappSubject: 'Avaliação para Restauração ou Faceta em Resina',
  },
  {
    id: 'coroas-proteses',
    number: '04',
    shortTitle: 'Coroas & Porcelanas',
    title: 'Coroas em Porcelana Pura, Blocos (Inlays/Onlays) & Próteses',
    subtitle: 'Resistência biomecânica superior e estética cerâmica para dentes que precisam de reforço estrutural.',
    category: 'Reabilitação',
    summary:
      'Quando um dente sofre grande perda de estrutura (após tratamento de canal, fraturas extensas ou restaurações muito amplas), uma simples resina pode não oferecer a resistência necessária. As coroas e blocos cerâmicos (em dissilicato de lítio ou zircônia translúcida) devolvem a integridade estrutural, protegendo o remanescente dentário com estética impecável.',
    indications: [
      'Dentes fragilizados após tratamento de canal (endodontia) ou com grandes destruições coronárias',
      'Substituição de coroas antigas com borda metálica escura aparente próxima à gengiva',
      'Blocos cerâmicos (Onlays/Inlays) para dentes posteriores que precisam de alta resistência à mastigação',
      'Lentes e facetas em porcelana para reabilitação estética de longa durabilidade e estabilidade de cor',
    ],
    clinicalSteps: [
      {
        step: 'Diagnóstico Estrutural & Planejamento',
        detail: 'Avaliação clínica e radiográfica da raiz, suporte ósseo e oclusão (encaixe da mordida).',
      },
      {
        step: 'Preparo Conservador & Provisório Estético',
        detail: 'Adequação delicada do dente e instalação imediata de provisório confortável e estético.',
      },
      {
        step: 'Moldagem de Alta Precisão & Cerâmica Personalizada',
        detail: 'Registro fiel dos detalhes gengivais e confecção laboratorial com caracterização individual de cor.',
      },
      {
        step: 'Prova Estética & Cimentação Adesiva Definitiva',
        detail: 'Verificação rigorosa de adaptação marginal, ponto de contato e aprovação do paciente antes da fixação.',
      },
    ],
    benefits: [
      'Altíssima durabilidade e estabilidade de brilho (não mancha com o tempo)',
      'Livre de metal: bordas gengivais naturais e translúcidas',
      'Segurança total ao mastigar alimentos firmes',
    ],
    sessionInfo: 'Planejamento + etapas clínicas com provisório estético',
    whatsappSubject: 'Avaliação para Coroa em Porcelana ou Prótese',
  },
  {
    id: 'recuperacao-reabilitacao',
    number: '05',
    shortTitle: 'Recuperação & Cuidado Integral',
    title: 'Recuperação Dentária, Reabilitação da Mordida & Urgências',
    subtitle: 'Devolver função, aliviar dores e reconstruir a saúde bucal com acolhimento e transparência.',
    category: 'Reabilitação',
    summary:
      'Muitos pacientes adiam a ida ao dentista por receio de dor ou por acharem que seu caso é complexo demais. Nosso atendimento de recuperação oral é estruturado passo a passo: primeiro eliminamos qualquer desconforto ou urgência, estabilizamos a saúde gengival e dentária e, em seguida, reabilitamos a função mastigatória e a estética no seu ritmo.',
    indications: [
      'Sensibilidade aguda ao frio/quente, dor ao mastigar ou desconforto odontológico súbito',
      'Desgaste dentário acentuado por bruxismo ou apertamento (indicação de placa miorrelaxante)',
      'Pacientes que estão há anos sem ir ao dentista e desejam um plano organizado de recuperação',
      'Reabilitação combinada integrando limpeza, restaurações, coroas e clareamento em etapas claras',
    ],
    clinicalSteps: [
      {
        step: 'Escuta Acolhedora & Alívio Imediato',
        detail: 'Atendimento sem julgamentos, focado em resolver a queixa principal e proporcionar alívio desde a 1ª consulta.',
      },
      {
        step: 'Plano de Recuperação por Prioridades',
        detail: 'Organização clara do tratamento: 1º Saúde e Urgência, 2º Estrutura e Função, 3º Estética Final.',
      },
      {
        step: 'Reconstrução Funcional & Proteção Oclusal',
        detail: 'Restauração dos dentes comprometidos, ajuste da mordida e confecção de placa de bruxismo quando indicada.',
      },
      {
        step: 'Acompanhamento Preventivo Contínuo',
        detail: 'Retornos programados para garantir que sua saúde bucal permaneça estável e protegida.',
      },
    ],
    benefits: [
      'Atendimento humanizado, anestesia cuidadosa e ritmo respeitoso',
      'Planejamento transparente sem surpresas',
      'Recuperação da confiança para sorrir e alimentar-se com conforto',
    ],
    sessionInfo: 'Cronograma flexível adaptado à necessidade do paciente',
    whatsappSubject: 'Avaliação para Recuperação Odontológica Completa',
  },
];

export const SYMPTOM_GUIDE: SymptomOption[] = [
  {
    id: 'dentes-amarelados',
    question: '“Quero meus dentes mais claros e um sorriso mais iluminado”',
    situation: 'Sinto que meus dentes escureceram com o tempo (café, rotina) mas gosto do formato deles.',
    recommendedTreatment: 'Clareamento Dental Supervisionado + Profilaxia Prévia',
    explanation:
      'Iniciamos com uma limpeza detalhada para remover pigmentos superficiais e aplicamos o protocolo clareador ajustado à sensibilidade do seu esmalte, conquistando um branco natural e luminoso sem desgaste.',
    careNote: 'Importante: restaurações antigas não clareiam com o gel; se houver alguma visível, planejamos sua troca após estabilizar a nova cor.',
    whatsappSubject: 'Quero avaliar Clareamento Dental',
  },
  {
    id: 'dente-quebrado-manchado',
    question: '“Tenho um dente lascado, cariado ou com restauração escura”',
    situation: 'Percebo uma falha, mancha, espaço entre os dentes ou uma restauração antiga que incomoda ao sorrir ou passar o fio.',
    recommendedTreatment: 'Restauração Estética Estratificada em Resina Composta',
    explanation:
      'Removemos apenas o tecido cariado ou a resina antiga comprometida e esculpimos a anatomia original do dente com resinas de alta fidelidade estética e polimento espelhado.',
    careNote: 'Procedimento conservador, geralmente concluído em uma única sessão clínica com resultado imediato.',
    whatsappSubject: 'Quero avaliar Restauração em Resina / Dente Lascado',
  },
  {
    id: 'dente-fragil-canal',
    question: '“Preciso recuperar um dente muito desgastado, fraturado ou com canal”',
    situation: 'Tenho um dente com grande perda de estrutura, uma coroa antiga desadaptada ou preciso reforçar a mastigação.',
    recommendedTreatment: 'Coroa ou Bloco (Onlay) em Porcelana Pura',
    explanation:
      'Quando a perda estrutural é extensa, a porcelana odontológica devolve a resistência mecânica necessária para mastigar com segurança, protegendo a raiz e reproduzindo a translucidez de um dente natural.',
    careNote: 'Você permanece com um dente provisório estético e confortável durante toda a confecção da peça definitiva.',
    whatsappSubject: 'Quero avaliar Coroa em Porcelana / Recuperação de Dente',
  },
  {
    id: 'limpeza-gengiva',
    question: '“Preciso fazer limpeza, remover tártaro ou minha gengiva sangra”',
    situation: 'Faz mais de 6 meses que não faço limpeza ou noto sangramento ao escovar e passar fio dental.',
    recommendedTreatment: 'Profilaxia Profunda por Ultrassom & Check-up Preventivo',
    explanation:
      'A remoção delicada do tártaro e do biofilme bacteriano devolve a saúde da gengiva, elimina o sangramento, renova o hálito e protege todos os seus dentes contra cáries e perda óssea.',
    careNote: 'É a consulta ideal para quem deseja iniciar um acompanhamento odontológico com tranquilidade.',
    whatsappSubject: 'Quero agendar Limpeza (Profilaxia) e Check-up',
  },
  {
    id: 'dor-bruxismo-geral',
    question: '“Sinto sensibilidade, dor ou aperto os dentes à noite (bruxismo)”',
    situation: 'Acordo com a musculatura da face cansada, noto desgaste nas pontas dos dentes ou sinto desconforto ao mastigar.',
    recommendedTreatment: 'Avaliação Diagnóstica + Reabilitação / Placa Miorrelaxante',
    explanation:
      'Identificamos a causa exata da dor ou do desgaste dental, tratamos os pontos sensíveis e protegemos o sorriso contra a sobrecarga muscular e oclusal.',
    careNote: 'Priorizamos o alívio imediato do desconforto logo na primeira sessão.',
    whatsappSubject: 'Quero agendar Avaliação (Dor / Sensibilidade / Bruxismo)',
  },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    criterion: 'Objetivo Principal',
    clareamento: 'Devolver o branco e a luminosidade natural do esmalte',
    resina: 'Restaurar cáries, fraturas, trocas de restaurações e fechar espaços',
    coroa: 'Reconstruir e proteger dentes com grande perda estrutural',
    limpeza: 'Remover tártaro, placa bacteriana, manchas externas e tratar a gengiva',
  },
  {
    criterion: 'Preservação do Dente',
    clareamento: '100% conservador (nenhum desgaste na estrutura)',
    resina: 'Minimamente invasivo (atua apenas na área comprometida)',
    coroa: 'Reforço estrutural completo sobre o remanescente dentário',
    limpeza: '100% preventivo e protetor do esmalte e periodonto',
  },
  {
    criterion: 'Tempo Médio',
    clareamento: '1 a 3 sessões clínicas + protocolo personalizado',
    resina: 'Sessão única por dente ou região planejada',
    coroa: '2 a 3 sessões (com provisório estético imediato)',
    limpeza: 'Sessão única de 45 a 60 minutos (recomendada a cada 6 meses)',
  },
  {
    criterion: 'Quando Escolher',
    clareamento: 'Formato dos dentes está bom, mas a cor está amarelada/opaca',
    resina: 'Há falhas de formato, lascas, cáries ou restaurações antigas visíveis',
    coroa: 'Dente pós-canal, fratura extensa ou coroa antiga com cinta metálica',
    limpeza: 'Início de qualquer tratamento e manutenção semestral da saúde bucal',
  },
];

export const JOURNEY_STEPS = [
  {
    number: '01',
    title: 'Consulta Diagnóstica & Escuta Atenta',
    description:
      'Você é atendido diretamente pela Dra. Kéryda Ramos, sem pressa. Avaliamos detalhadamente seus dentes, gengivas, mordida e ouvimos suas expectativas e prioridades.',
    highlight: 'Atendimento individualizado e acolhedor',
  },
  {
    number: '02',
    title: 'Plano de Tratamento Transparente',
    description:
      'Explicamos de forma clara e visual o que realmente precisa ser feito — diferenciando o que é prioridade de saúde, recuperação funcional e aperfeiçoamento estético.',
    highlight: 'Clareza absoluta em cada etapa',
  },
  {
    number: '03',
    title: 'Execução Clínica Confortável & Precisa',
    description:
      'Procedimentos realizados com técnicas anestésicas cuidadosas, materiais restauradores e cerâmicos de padrão superior e respeito rigoroso à biologia do seu sorriso.',
    highlight: 'Mãos leves, biossegurança e naturalidade',
  },
  {
    number: '04',
    title: 'Acabamento, Polimento & Prevenção',
    description:
      'Refinamento minucioso de brilho e encaixe da mordida, seguido de orientações personalizadas e acompanhamento preventivo para que o resultado dure por muitos anos.',
    highlight: 'Longevidade funcional e estética',
  },
];

export const TESTIMONIALS_DATA = [
  {
    name: 'Mariana S.',
    procedure: 'Clareamento Dental & Restaurações em Resina',
    quote:
      'Eu tinha muito receio de sentir sensibilidade no clareamento e de que as resinas ficassem artificiais. A Dra. Kéryda explicou cada detalhe, preparou meus dentes antes e o resultado ficou extremamente natural. Ninguém diz onde tem restauração.',
  },
  {
    name: 'Carlos Eduardo M.',
    procedure: 'Coroa em Porcelana & Recuperação Oral',
    quote:
      'Precisava substituir uma coroa antiga que mostrava uma linha escura na gengiva e recuperar dois dentes posteriores. O cuidado na adaptação e a delicadeza durante as consultas fizeram toda a diferença. Voltei a mastigar e sorrir com segurança.',
  },
  {
    name: 'Fernanda L.',
    procedure: 'Profilaxia Completa & Prevenção Periodontal',
    quote:
      'A limpeza mais cuidadosa que já fiz. A Dra. Kéryda tem a mão muito leve, avaliou cada dente com calma e me orientou sem pressa. Hoje faço meu acompanhamento semestral religiosamente com ela.',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'O clareamento dental enfraquece o esmalte ou causa muita sensibilidade?',
    answer:
      'Não enfraquece o esmalte quando realizado com géis aprovados e sob supervisão clínica. O clareador atua apenas quebrando as moléculas de pigmento dentro do dente. Para evitar ou minimizar a sensibilidade, realizamos uma avaliação prévia de trincas e retrações gengivais e aplicamos protocolos dessensibilizantes específicos antes e durante o tratamento.',
  },
  {
    question: 'Qual a diferença entre restauração/faceta em resina e coroa em porcelana?',
    answer:
      'A resina composta é esculpida diretamente sobre o dente no consultório (em uma única sessão), sendo excelente para tratar cáries, reconstruir bordas quebradas, fechar espaços e melhorar a estética com mínimo desgaste. Já a coroa ou bloco em porcelana é confeccionado sob medida em laboratório quando o dente perdeu grande parte de sua estrutura e precisa de reforço mecânico superior e estabilidade de cor por muitos anos.',
  },
  {
    question: 'De quanto em quanto tempo devo fazer a limpeza profissional (profilaxia)?',
    answer:
      'Para a maioria dos pacientes, o intervalo ideal é de 6 em 6 meses. Mesmo com uma ótima escovação e uso diário do fio dental em casa, o biofilme mineraliza em áreas de difícil acesso formando o tártaro, que só pode ser removido com instrumentos ultrassônicos profissionais sem agredir a gengiva.',
  },
  {
    question: 'Tenho restaurações antigas nos dentes da frente. Posso fazer clareamento?',
    answer:
      'Sim! O protocolo correto é realizar primeiro o clareamento dos dentes naturais e, após a estabilização da nova cor (cerca de 7 a 14 dias após o término), substituir apenas as restaurações antigas que ficaram mais escuras, igualando perfeitamente a resina ao novo tom iluminado do seu sorriso.',
  },
  {
    question: 'Como funciona a primeira consulta de avaliação com a Dra. Kéryda Ramos?',
    answer:
      'Na consulta inicial, realizamos um exame clínico detalhado de todos os dentes, gengivas, restaurações existentes e encaixe da mordida. Conversamos sobre o que incomoda você (seja estética, sensibilidade, limpeza ou recuperação de algum dente) e apresentamos um plano de tratamento claro, organizado por prioridades.',
  },
  {
    question: 'Como faço para agendar meu horário?',
    answer:
      'O atendimento é realizado com hora marcada para garantir exclusividade e pontualidade. Basta clicar em qualquer botão de agendamento do site ou enviar uma mensagem diretamente para o WhatsApp (62) 98244-0962 para escolher o melhor dia e período para você.',
  },
];
