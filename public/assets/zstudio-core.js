/**
 * Z.studio Core Engine
 * - 3-Language System (PT-BR default, EN, ES) with persistence
 * - Direct WhatsApp integration (+55 11 91440-6822) with contextual pre-filled messages
 * - Complete removal of external social links
 * - Integrated, discrete language switcher in header/navigation
 */

(function() {
  // The Home page's word-row ("Aplicativos", "Design de produtos", ...)
  // ships as two mutually exclusive Framer breakpoint variants: a
  // Desktop-only absolute-positioned scatter ("Gravity") and a
  // Tablet/Mobile continuous ticker row. React's hydration unmounts
  // whichever variant doesn't match the real viewport within ~300ms of
  // DOMContentLoaded, so on Desktop the ticker row is gone from the DOM
  // long before any post-hydration repair pass could run. Capture its
  // markup here, synchronously, at script-parse time — this script is
  // deferred, so it always executes before DOMContentLoaded/hydration.
  let capturedWordTickerHTML = null;
  const earlyWordTicker = document.querySelector(".framer-nksdxl");
  if (earlyWordTicker) capturedWordTickerHTML = earlyWordTicker.outerHTML;

  // Framer's own runtime sets document.title on every page after
  // hydration, independent of anything in this file — but on the top-level
  // pages (Home/About/Contact/Projects) it only knows the site's internal
  // project name ("Asher Vale", never renamed to Z.studio) and overwrites
  // the correct per-page <title> from the static HTML with that generic
  // value, repeatedly, for as long as the page stays open. Capture the
  // correct title here at script-parse time (before hydration can touch
  // it) so applyTranslations() below can keep restoring it.
  const originalTitle = document.title;

  const WA_NUMBER = "5511914406822";

  const WA_MESSAGES = {
    general: {
      pt: "Olá! Conheci a Z.studio e gostaria de conversar sobre um projeto.",
      en: "Hello! I found Z.studio and would like to talk about a project.",
      es: "¡Hola! Conocí Z.studio y me gustaría hablar sobre un proyecto."
    },
    website: {
      pt: "Olá! Gostaria de conversar sobre um projeto de website.",
      en: "Hello! I would like to talk about a website project.",
      es: "¡Hola! Me gustaría hablar sobre un proyecto de sitio web."
    },
    brand: {
      pt: "Olá! Gostaria de conversar sobre um projeto de identidade e marca.",
      en: "Hello! I would like to talk about a brand identity project.",
      es: "¡Hola! Me gustaría hablar sobre un proyecto de identidad y marca."
    },
    saas: {
      pt: "Olá! Gostaria de conversar sobre um projeto de SaaS e produto.",
      en: "Hello! I would like to talk about a SaaS and product project.",
      es: "¡Hola! Me gustaría hablar sobre un proyecto de SaaS y producto."
    },
    creative: {
      pt: "Olá! Gostaria de conversar sobre um projeto de criativo e performance.",
      en: "Hello! I would like to talk about a creative and ads project.",
      es: "¡Hola! Me gustaría hablar sobre un proyecto de creativos y performance."
    }
  };

  const DICTIONARY = {
    // Navigation & Header
    "Entre em contato agora": {
      en: "Get in touch now",
      es: "Ponte en contacto ahora"
    },
    "São Paulo, SP": {
      en: "São Paulo, Brazil",
      es: "São Paulo, Brasil"
    },
    "Menu": {
      en: "Menu",
      es: "Menú"
    },
    "Sobre": {
      en: "About",
      es: "Sobre mí"
    },
    "Projetos": {
      en: "Projects",
      es: "Proyectos"
    },
    "Contato": {
      en: "Contact",
      es: "Contacto"
    },

    // Home Page
    "Do que você precisa hoje?": {
      en: "What does your business need today?",
      es: "¿Qué necesita tu negocio hoy?"
    },
    "Me mostre como você trabalha hoje.": {
      en: "Show me how you work today.",
      es: "Muéstrame cómo trabajas hoy."
    },
    "E eu encontro onde melhorar.": {
      en: "And I will find where to improve.",
      es: "Y encontraré dónde mejorar."
    },
    "Seu negócio, só que melhor.": {
      en: "Your business, only better.",
      es: "Tu negocio, solo que mejor."
    },
    "Serviços": {
      en: "Services",
      es: "Servicios"
    },
    "Eu observo": {
      en: "I observe",
      es: "Observo"
    },
    "Eu encontro": {
      en: "I discover",
      es: "Descubro"
    },
    "Eu simplifico": {
      en: "I simplify",
      es: "Simplifico"
    },
    "Eu encontro o que está travando sua operação e transformo processos complexos em soluções simples, eficientes e feitas para a realidade do seu negócio.": {
      en: "I identify what is bottlenecking your operation and transform complex processes into simple, efficient solutions tailored to your business reality.",
      es: "Identifico lo que está frenando tu operación y transformo procesos complejos en soluciones simples, eficientes y adaptadas a la realidad de tu negocio."
    },
    "O que pode ter na sua operação": {
      en: "What we can build for your operation",
      es: "Lo que podemos construir para tu operación"
    },
    "O que  pode ter na sua operação": {
      en: "What we can build for your operation",
      es: "Lo que podemos construir para tu operación"
    },
    "Criativos": {
      en: "Creatives",
      es: "Creativos"
    },
    "Sistemas": {
      en: "Systems",
      es: "Sistemas"
    },
    "Estratégias": {
      en: "Strategies",
      es: "Estrategias"
    },
    "Identidades visuais": {
      en: "Visual identities",
      es: "Identidades visuales"
    },
    "Aplicativos": {
      en: "Applications",
      es: "Aplicaciones"
    },
    "Design de produtos": {
      en: "Product design",
      es: "Diseño de producto"
    },
    "Otimizações": {
      en: "Optimizations",
      es: "Optimizaciones"
    },
    "Ver todos os trabalhos": {
      en: "View all projects",
      es: "Ver todos los proyectos"
    },
    "Quem sou eu": {
      en: "Who I am",
      es: "Quién soy"
    },
    "Quem  sou eu": {
      en: "Who I am",
      es: "Quién soy"
    },
    "Eu trabalho entre design, tecnologia e estratégia para encontrar formas melhores de fazer um negócio funcionar.": {
      en: "I work across design, technology, and strategy to build better ways for businesses to operate and thrive.",
      es: "Trabajo entre diseño, tecnología y estrategia para crear mejores formas de hacer funcionar un negocio."
    },
    "Gosto de entender como as coisas funcionam de verdade: onde você perde tempo, onde existe retrabalho, o que poderia ser mais simples e o que está impedindo sua operação de ser mais eficiente.": {
      en: "I love understanding how things truly work: where time is lost, where friction happens, what could be simpler, and what is preventing your operation from achieving peak efficiency.",
      es: "Me gusta entender cómo funcionan las cosas en profundidad: dónde se pierde tiempo, dónde hay fricciones, qué podría ser más simple y qué impide que tu operación sea más eficiente."
    },
    "A partir disso, eu penso, desenho e construo soluções sob medida para você.": {
      en: "From there, I strategize, design, and engineer tailor-made solutions for you.",
      es: "A partir de ahí, pienso, diseño y construyo soluciones a medida para ti."
    },
    "Soluções criadas": {
      en: "Solutions created",
      es: "Soluciones creadas"
    },
    "Possibilidades de melhorar": {
      en: "Opportunities explored",
      es: "Oportunidades exploradas"
    },
    "Melhorias implementadas": {
      en: "Improvements deployed",
      es: "Mejoras implementadas"
    },

    // About Page
    "Sobre mim": {
      en: "About me",
      es: "Sobre mí"
    },
    "Começar": {
      en: "Get started",
      es: "Empezar"
    },
    "Minha experiência": {
      en: "My experience",
      es: "Mi experiencia"
    },
    "Zack Rodrigues": {
      en: "Zack Rodrigues",
      es: "Zack Rodrigues"
    },
    "Zack   Rodrigues": {
      en: "Zack Rodrigues",
      es: "Zack Rodrigues"
    },
    "Eu sou o Zack, criador da Z.studio.": {
      en: "I'm Zack, founder of Z.studio.",
      es: "Soy Zack, fundador de Z.studio."
    },
    "Gosto de transformar ideias em coisas que realmente funcionam. Meu trabalho mistura design, tecnologia e criatividade , do conceito até a execução.": {
      en: "I love turning ideas into things that actually work. My work blends design, technology, and creativity—from early concept to final execution.",
      es: "Me apasiona transformar ideas en cosas que realmente funcionan. Mi trabajo combina diseño, tecnología y creatividad, desde el concepto hasta la ejecución."
    },
    "Gosto de transformar ideias em coisas que realmente funcionam. Meu trabalho mistura design, tecnologia e criatividade, do conceito até a execução.": {
      en: "I love turning ideas into things that actually work. My work blends design, technology, and creativity—from early concept to final execution.",
      es: "Me apasiona transformar ideas en cosas que realmente funcionan. Mi trabajo combina diseño, tecnología y creatividad, desde el concepto hasta la ejecución."
    },
    "Gosto de aprender fazendo, testar possibilidades e encontrar maneiras diferentes de resolver problemas.": {
      en: "I believe in learning by doing, exploring possibilities, and discovering unconventional ways to solve real problems.",
      es: "Creo en aprender haciendo, explorar posibilidades y descubrir formas diferentes de resolver problemas reales."
    },
    "E, principalmente, gosto de construir tudo de forma próxima e transparente. Você não precisa chegar sabendo exatamente o que precisa , eu te ajudo a entender o caminho e encontrar uma solução que faça sentido para você.": {
      en: "Above all, I work closely and transparently. You don't need to arrive knowing every technical detail—I guide you through the journey to craft a solution that makes complete sense for your business.",
      es: "Y, sobre todo, me gusta construir todo de forma cercana y transparente. No necesitas saber con exactitud cada detalle técnico: te ayudo a trazar el camino y encontrar una solución que tenga pleno sentido para ti."
    },
    "E, principalmente, gosto de construir tudo de forma próxima e transparente. Você não precisa chegar sabendo exatamente o que precisa, eu te ajudo a entender o caminho e encontrar uma solução que faça sentido para você.": {
      en: "Above all, I work closely and transparently. You don't need to arrive knowing every technical detail—I guide you through the journey to craft a solution that makes complete sense for your business.",
      es: "Y, sobre todo, me gusta construir todo de forma cercana y transparente. No necesitas saber con exactitud cada detalle técnico: te ayudo a trazar el camino y encontrar una solución que tenga pleno sentido para ti."
    },
    "A Z.studio nasceu justamente disso: da vontade de criar, experimentar e construir algo que tenha impacto de verdade.": {
      en: "Z.studio was born from this exact drive: the passion to create, experiment, and build experiences that deliver genuine impact.",
      es: "Z.studio nació justamente de eso: de las ganas de crear, experimentar y construir soluciones que generen un impacto real."
    },
    "Vamos conversar": {
      en: "Let's talk",
      es: "Hablemos"
    },
    "Design e Desenvolvimento": {
      en: "Design & Development",
      es: "Diseño y Desarrollo"
    },
    "Criação de sites, produtos digitais e experiências para transformar ideias em projetos funcionais e bem apresentados.": {
      en: "Crafting websites, digital products, and experiences that transform concepts into high-performing, elegant projects.",
      es: "Creación de sitios web, productos digitales y experiencias que transforman ideas en proyectos funcionales y sofisticados."
    },
    "Fundador e Desenvolvedor Criativo": {
      en: "Founder & Creative Developer",
      es: "Fundador y Desarrollador Creativo"
    },
    "Construção da Z.studio unindo design, tecnologia, desenvolvimento e motion para criar experiências digitais sob medida.": {
      en: "Building Z.studio by fusing design, technology, engineering, and motion to deliver bespoke digital experiences.",
      es: "Construcción de Z.studio uniendo diseño, tecnología, desarrollo y animación para crear experiencias digitales a medida."
    },
    "SaaS e Automação": {
      en: "SaaS & Automation",
      es: "SaaS y Automatización"
    },
    "Desenvolvimento de produtos digitais, automações e ferramentas próprias, cuidando desde a ideia e experiência até a implementação.": {
      en: "Developing digital products, custom automations, and proprietary tools, managing everything from UX architecture to technical deployment.",
      es: "Desarrollo de productos digitales, automatizaciones y herramientas propias, cuidando desde la idea y UX hasta la implementación técnica."
    },
    "Design, Desenvolvimento e Criatividade": {
      en: "Design, Development & Creativity",
      es: "Diseño, Desarrollo y Creatividad"
    },
    "Projetos envolvendo sites, interfaces, identidade visual, conteúdo e soluções digitais.": {
      en: "Holistic projects spanning web platforms, UI/UX interfaces, brand systems, and interactive digital solutions.",
      es: "Proyectos integrales que abarcan sitios web, interfaces, identidad de marca, contenido y soluciones digitales."
    },

    // Contact Page
    "Todo projeto começa com uma boa conversa. Me conte o que você está pensando, o que precisa melhorar ou até mesmo aquilo que ainda não sabe exatamente como resolver. A partir daí, eu mergulho no contexto do seu negócio, entendo os desafios e encontro formas de transformar suas ideias em soluções que façam sentido.": {
      en: "Every great project begins with a conversation. Tell me what you have in mind, what needs improvement, or what challenges you're facing. From there, I dive into your business context, understand the friction, and engineer solutions that truly work.",
      es: "Todo gran proyecto empieza con una buena conversación. Cuéntame qué tienes en mente, qué necesitas mejorar o qué desafíos quieres resolver. A partir de ahí, profundizo en el contexto de tu negocio, entiendo las fricciones y construyo soluciones que realmente funcionen."
    },
    "Todo projeto começa com uma boa conversa. Me conte o que você está pensando, o que precisa melhorar ou até mesmo aquilo que ainda não sabe exatamente como resolver.": {
      en: "Every great project begins with a conversation. Tell me what you have in mind, what needs improvement, or what challenges you're facing.",
      es: "Todo gran proyecto empieza con una buena conversación. Cuéntame qué tienes en mente, qué necesitas mejorar o qué desafíos quieres resolver."
    },
    "A partir daí, eu mergulho no contexto do seu negócio, entendo os desafios e encontro formas de transformar suas ideias em soluções que façam sentido.": {
      en: "From there, I dive into your business context, understand the friction, and engineer solutions that truly work.",
      es: "A partir de ahí, profundizo en el contexto de tu negocio, entiendo las fricciones y construyo soluciones que realmente funcionen."
    },
    "Seja uma nova ideia, um projeto que precisa sair do papel ou algo que simplesmente pode funcionar melhor, podemos começar por aqui.": {
      en: "Whether it's a bold new vision, a project waiting to launch, or an existing system that needs to perform better, let's start right here.",
      es: "Ya sea una nueva idea, un proyecto listo para despegar o algo que simplemente puede funcionar mejor, podemos empezar por aquí."
    },
    "Nome": {
      en: "Name",
      es: "Nombre"
    },
    "Nome completo": {
      en: "Full name",
      es: "Nombre completo"
    },
    "Email*": {
      en: "Email*",
      es: "Correo electrónico*"
    },
    "Email": {
      en: "Email address",
      es: "Correo electrónico"
    },
    "Faixa de investimento": {
      en: "Investment range",
      es: "Rango de inversión"
    },
    "Selecionar um valor": {
      en: "Select a range",
      es: "Seleccionar un rango"
    },
    "Até R$ 1.000": {
      en: "Up to $1,000",
      es: "Hasta $1.000"
    },
    "R$ 1.000 – R$ 3.000": {
      en: "$1,000 – $3,000",
      es: "$1.000 – $3.000"
    },
    "R$ 3.000 – R$ 5.000": {
      en: "$3,000 – $5,000",
      es: "$3.000 – $5.000"
    },
    "Acima de R$ 10.000": {
      en: "Above $10,000",
      es: "Más de $10.000"
    },
    "Ainda não sei": {
      en: "Not sure yet",
      es: "Aún no lo sé"
    },
    "Message": {
      en: "Message",
      es: "Mensaje"
    },
    "Mensagem": {
      en: "Message",
      es: "Mensaje"
    },
    "Escreva sua mensagem": {
      en: "Write your message",
      es: "Escribe tu mensaje"
    },
    "Fale comigo": {
      en: "Send message",
      es: "Enviar mensaje"
    },
    "Conversar no WhatsApp": {
      en: "Chat on WhatsApp",
      es: "Chatear por WhatsApp"
    },
    "Iniciar conversa no WhatsApp": {
      en: "Start chat on WhatsApp",
      es: "Iniciar chat en WhatsApp"
    },
    "Fale direto pelo WhatsApp": {
      en: "Reach out directly via WhatsApp",
      es: "Habla directamente por WhatsApp"
    },

    // Projects & Details
    "Mais projetos": {
      en: "More projects",
      es: "Más proyectos"
    },
    "Voltar": {
      en: "Back",
      es: "Volver"
    },
    "Categoria": {
      en: "Category",
      es: "Categoría"
    },
    "Prazo": {
      en: "Timeline",
      es: "Plazo"
    },
    "Sob consulta": {
      en: "Upon request",
      es: "Bajo consulta"
    },
    "Autação": {
      en: "Automation",
      es: "Automatización"
    },
    "Ver todos os projetos": {
      en: "View all projects",
      es: "Ver todos los proyectos"
    },
    "Websites": {
      en: "Websites",
      es: "Sitios Web"
    },
    "Um bom site precisa ir além da aparência, muitas vezes ele é o primeiro contato com sua marca  e precisa transmitir confiança, deixar sua proposta clara, e transformar visitantes em oportunidades.": {
      en: "A great website goes far beyond visuals—it is often the first impression of your brand, engineered to inspire trust, clarify your value, and turn visitors into clients.",
      es: "Un buen sitio web debe ir mucho más allá de la estética: a menudo es el primer contacto con tu marca, diseñado para generar confianza, clarificar tu propuesta y convertir visitantes en clientes."
    },
    "Um bom site precisa ir além da aparência, muitas vezes ele é o primeiro contato com sua marca e precisa transmitir confiança, deixar sua proposta clara, e transformar visitantes em oportunidades.": {
      en: "A great website goes far beyond visuals—it is often the first impression of your brand, engineered to inspire trust, clarify your value, and turn visitors into clients.",
      es: "Un buen sitio web debe ir mucho más allá de la estética: a menudo es el primer contacto con tu marca, diseñado para generar confianza, clarificar tu propuesta y convertir visitantes en clientes."
    },
    "Identidade de Marca": {
      en: "Brand Identity",
      es: "Identidad de Marca"
    },
    "Identidade e Marca": {
      en: "Brand Identity",
      es: "Identidad de Marca"
    },
    "Uma marca precisa transmitir quem ela é antes mesmo de alguém conhecer seu produto. Por isso, começo entendendo sua essência, seu público e a forma como ela quer ser percebida.": {
      en: "A brand must communicate who it is before someone even touches the product. I begin by understanding your core essence, audience, and the lasting perception you want to build.",
      es: "Una marca debe transmitir quién es antes incluso de que alguien pruebe su producto. Por eso, comienzo entendiendo su esencia, su público y la percepción duradera que desea proyectar."
    },
    "Criativo & Ads": {
      en: "Creative & Ads",
      es: "Creatividad & Ads"
    },
    "Criativo e Ads": {
      en: "Creative & Ads",
      es: "Creatividad & Ads"
    },
    "Cada criativo parte de uma mensagem. Eu combino direção visual, composição, movimento e narrativa para transformar essa mensagem em uma peça que faça sentido para o público.": {
      en: "Every creative asset starts with a strong core message. I combine visual direction, composition, motion, and storytelling into high-converting assets that captivate audiences.",
      es: "Cada creativo parte de un mensaje poderoso. Combino dirección visual, composición, movimiento y narrativa para transformar ese mensaje en una pieza que cautive al público."
    },
    "SaaS / Produto": {
      en: "SaaS / Product",
      es: "SaaS / Producto"
    },
    "Antes de construir, eu procuro entender o problema, quem vai usar o produto e o que realmente precisa ser resolvido. A partir disso, penso na estrutura, na experiência e na tecnologia necessária.": {
      en: "Before writing code, I analyze the problem, the end users, and the core pain point. From there, I architect the user experience, interface system, and modern technology stack.",
      es: "Antes de construir, analizo a fondo el problema, los usuarios finales y el valor principal a resolver. A partir de ahí, estructuro la experiencia, el diseño y la tecnología necesaria."
    },
    "Direção Criativa e Design": {
      en: "Creative Direction & Design",
      es: "Dirección Creativa y Diseño"
    },
    "Direção Criativa e Motion": {
      en: "Creative Direction & Motion",
      es: "Dirección Creativa y Motion"
    },
    "Produto, Design e Desenvolvimento": {
      en: "Product, Design & Development",
      es: "Producto, Diseño y Desarrollo"
    },

    // Footer & Common
    "Pronto para melhorar seu negócio? Vamos começar.": {
      en: "Ready to elevate your business? Let's begin.",
      es: "¿Listo para impulsar tu negocio? Empecemos."
    },
    "© 2026  - Z.studio": {
      en: "© 2026 - Z.studio",
      es: "© 2026 - Z.studio"
    },
    "© 2026 - Z.studio": {
      en: "© 2026 - Z.studio",
      es: "© 2026 - Z.studio"
    },
    "Built in Zack  Rodrigues": {
      en: "Crafted by Zack Rodrigues",
      es: "Creado por Zack Rodrigues"
    },
    "Built in Zack Rodrigues": {
      en: "Crafted by Zack Rodrigues",
      es: "Creado por Zack Rodrigues"
    }
  };

  // Build reverse lookup index for translating between en/es and pt
  const REVERSE_LOOKUP = {};
  for (const [ptKey, trans] of Object.entries(DICTIONARY)) {
    if (trans.en) REVERSE_LOOKUP[trans.en.trim()] = ptKey;
    if (trans.es) REVERSE_LOOKUP[trans.es.trim()] = ptKey;
  }

  function getActiveLang() {
    try {
      const saved = localStorage.getItem("zstudio_lang");
      if (saved && (saved === "pt" || saved === "en" || saved === "es")) {
        return saved;
      }
    } catch(e) {}
    return "pt";
  }

  function setActiveLang(lang) {
    if (lang !== "pt" && lang !== "en" && lang !== "es") return;
    try {
      localStorage.setItem("zstudio_lang", lang);
    } catch(e) {}
    document.documentElement.setAttribute("data-zstudio-lang", lang);
    document.documentElement.setAttribute("lang", lang === "pt" ? "pt-BR" : lang);
    applyTranslations();
    updateWhatsAppLinks();
    updateSwitcherUI();
  }

  function getPageContext() {
    const p = window.location.pathname.toLowerCase();
    if (p.includes("website")) return "website";
    if (p.includes("sistemas-de-marca") || p.includes("marca")) return "brand";
    if (p.includes("produto-completo") || p.includes("saas")) return "saas";
    if (p.includes("criativo-de-performance") || p.includes("criativo")) return "creative";
    return "general";
  }

  function getWhatsAppUrl(context) {
    const lang = getActiveLang();
    const ctx = context || getPageContext();
    const msg = (WA_MESSAGES[ctx] && WA_MESSAGES[ctx][lang]) || WA_MESSAGES.general[lang] || WA_MESSAGES.general.pt;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  function translateText(text, targetLang) {
    if (!text) return text;
    const clean = text.trim();
    if (!clean) return text;

    // Direct match with PT original
    if (DICTIONARY[clean]) {
      if (targetLang === "pt") return clean;
      return DICTIONARY[clean][targetLang] || clean;
    }

    // Match via reverse lookup if text was previously translated
    if (REVERSE_LOOKUP[clean]) {
      const ptOriginal = REVERSE_LOOKUP[clean];
      if (targetLang === "pt") return ptOriginal;
      return (DICTIONARY[ptOriginal] && DICTIONARY[ptOriginal][targetLang]) || clean;
    }

    return null;
  }

  function applyTranslations() {
    const lang = getActiveLang();

    // 1. Document Title
    // Framer's runtime doesn't reliably include page-identifying text when
    // it overwrites document.title (see the originalTitle capture at the
    // top of this file for why) — Home/About/Contact/Projects just get the
    // generic site name, not something safely pattern-matchable. Instead,
    // always resolve from the captured original PT-BR title, translating
    // it only if this exact title is a known one and the active language
    // isn't PT. This self-corrects regardless of what Framer's runtime did
    // to document.title in between, and needs no per-page URL matching.
    const titleTranslations = {
      "Z.studio - Design, tecnologia e desenvolvimento": { en: "Z.studio - Design, technology and development", es: "Z.studio - Diseño, tecnología y desarrollo" },
      "Sobre - Z.studio": { en: "About - Z.studio", es: "Sobre mí - Z.studio" },
      "Contato - Z.studio": { en: "Contact - Z.studio", es: "Contacto - Z.studio" },
      "Projetos - Z.studio": { en: "Projects - Z.studio", es: "Proyectos - Z.studio" },
      "Websites - Z.studio": { en: "Websites - Z.studio", es: "Sitios Web - Z.studio" },
      "Identidade de Marca - Z.studio": { en: "Brand Identity - Z.studio", es: "Identidad de Marca - Z.studio" },
      "SaaS / Produto - Z.studio": { en: "SaaS / Product - Z.studio", es: "SaaS / Producto - Z.studio" },
      "Criativo & Ads - Z.studio": { en: "Creative & Ads - Z.studio", es: "Creatividad & Ads - Z.studio" }
    };
    const translated = titleTranslations[originalTitle];
    const desiredTitle = (lang !== "pt" && translated && translated[lang]) ? translated[lang] : originalTitle;
    if (originalTitle && document.title !== desiredTitle) {
      document.title = desiredTitle;
    }

    // 2. Walk text nodes and elements
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (tag === "script" || tag === "style" || tag === "noscript") return NodeFilter.FILTER_REJECT;
          if (parent.closest("#zstudio-lang-switcher")) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node;
    while ((node = walker.nextNode())) {
      const translated = translateText(node.nodeValue, lang);
      if (translated && translated !== node.nodeValue.trim()) {
        const leadingSpace = node.nodeValue.match(/^\s*/)[0];
        const trailingSpace = node.nodeValue.match(/\s*$/)[0];
        node.nodeValue = leadingSpace + translated + trailingSpace;
      }
    }

    // 3. Form Placeholders and Values
    document.querySelectorAll("input, textarea").forEach(el => {
      if (el.placeholder) {
        const trans = translateText(el.placeholder, lang);
        if (trans) el.placeholder = trans;
      }
    });

    // 4. Select dropdown options
    document.querySelectorAll("select option").forEach(opt => {
      const trans = translateText(opt.textContent, lang);
      if (trans) opt.textContent = trans;
    });

    // 5. Custom elements containing composite phrases
    document.querySelectorAll("p, h1, h2, h3, h4, span, button, a").forEach(el => {
      if (el.closest("#zstudio-lang-switcher")) return;
      if (el.children.length === 0) {
        const trans = translateText(el.textContent, lang);
        if (trans && el.textContent.trim() !== trans) {
          el.textContent = trans;
        }
      }
    });
  }

  function updateWhatsAppLinks() {
    const lang = getActiveLang();
    const generalWaUrl = getWhatsAppUrl("general");

    // 1. Replace all mailto: links with WhatsApp
    document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
      a.href = generalWaUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("data-wa-cta", "true");
    });

    // 2. Identify contact CTAs and point to WhatsApp
    document.querySelectorAll("a, button, div").forEach(el => {
      const text = el.textContent ? el.textContent.trim().toLowerCase() : "";
      const isContactCTA = 
        text === "entre em contato agora" ||
        text === "get in touch now" ||
        text === "ponte en contacto ahora" ||
        text === "vamos conversar" ||
        text === "let's talk" ||
        text === "hablemos" ||
        text === "fale comigo" ||
        text === "fale direto pelo whatsapp" ||
        text === "conversar no whatsapp" ||
        text === "start a project" ||
        text === "começar um projeto" ||
        text === "start chat on whatsapp";

      if (isContactCTA && !el.closest("#zstudio-lang-switcher") && !el.closest("form") && !el.closest(".framer-1o4ffb9") && !el.closest(".framer-qu44xm") && !el.closest(".framer-al9wyy-container")) {
        const context = getPageContext();
        const url = getWhatsAppUrl(context);

        if (el.tagName.toLowerCase() === "a") {
          el.href = url;
          el.target = "_blank";
          el.rel = "noopener noreferrer";
        } else {
          el.style.cursor = "pointer";
          el.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.open(url, "_blank");
          };
        }
      }
    });

    // 3. Specific header "Entre em contato agora" container
    const headerPill = document.querySelector(".framer-9nc42h");
    if (headerPill) {
      headerPill.style.cursor = "pointer";
      headerPill.title = "WhatsApp: +55 11 91440-6822";
      headerPill.onclick = function(e) {
        e.preventDefault();
        window.open(generalWaUrl, "_blank");
      };
    }

    // 4. Update WhatsApp card on /contact if present
    const contactWaBtn = document.getElementById("zstudio-contact-wa-btn");
    if (contactWaBtn) {
      contactWaBtn.href = generalWaUrl;
    }
  }

  function removeSocialLinks() {
    // Completely remove any external social media links
    const socialPatterns = [
      /instagram\.com/i,
      /facebook\.com/i,
      /tiktok\.com/i,
      /twitter\.com/i,
      /x\.com/i,
      /linkedin\.com/i,
      /behance\.net/i,
      /dribbble\.com/i,
      /pinterest\.com/i,
      /youtube\.com/i,
      /framer\.link/i,
      /framer\.com\/templates/i
    ];

    document.querySelectorAll("a").forEach(a => {
      const href = a.href || "";
      const isSocial = socialPatterns.some(pattern => pattern.test(href));
      if (isSocial) {
        // Remove or hide the social link and its parent container if dedicated
        const parent = a.closest("li, [data-framer-name*='social' i], [data-framer-name*='Social' i]");
        if (parent) {
          parent.remove();
        } else {
          a.remove();
        }
      }
    });
  }

  // Remove incorrect location and time ("London, UK", "5:29 PM", "6:39 PM")
  function removeLocationAndTime() {
    document.querySelectorAll('[data-framer-name="Time"]').forEach(el => {
      const text = el.textContent || "";
      if (text.includes("London") || text.includes("PM") || text.includes("AM") || text.includes(":") || el.closest("footer")) {
        el.remove();
      }
    });

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodesToRemove = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const val = node.nodeValue || "";
      if (val.includes("London, UK") || /\b\d{1,2}:\d{2}\s*(?:AM|PM)\b/i.test(val)) {
        const parent = node.parentElement;
        if (parent && !parent.closest('.framer-1j95pa0')) {
          const container = parent.closest('.framer-1d6zz8o, .framer-wbse0e-container, [data-framer-name="Time"]') || parent;
          if (container && container !== document.body && container.id !== "main") {
            nodesToRemove.push(container);
          } else {
            node.nodeValue = "";
          }
        }
      }
    }
    nodesToRemove.forEach(el => {
      try { el.remove(); } catch(e) {}
    });
  }

  // Cleanup structural duplicates: ensures strictly 1 Header, 1 Main, 1 Footer, 1 "Mais projetos", 1 "Ver todos os projetos"
  function cleanupStructuralDuplicates() {
    // A) Footers: Ensure only 1 visible footer exists on the page
    const footers = Array.from(document.querySelectorAll("footer"));
    if (footers.length > 1) {
      let primaryFooter = footers.find(f => f.closest("#main"));
      if (!primaryFooter) primaryFooter = footers[0];

      footers.forEach(f => {
        if (f !== primaryFooter) {
          const wrapper = f.closest(".framer-16znbqb-container, .framer-v2nfsr-container") || f;
          if (wrapper && wrapper.id !== "main" && wrapper !== document.body) {
            wrapper.remove();
          } else {
            f.remove();
          }
        }
      });
    }

    // B) "Mais projetos" sections: Ensure only 1 exists
    const headings = Array.from(document.querySelectorAll("h2"));
    const moreProjectHeadings = headings.filter(h => {
      const t = (h.textContent || "").trim().toLowerCase();
      return t === "mais projetos" || t === "more projects" || t === "más proyectos";
    });

    if (moreProjectHeadings.length > 1) {
      for (let i = 1; i < moreProjectHeadings.length; i++) {
        const section = moreProjectHeadings[i].closest("section, .framer-1ngrvxa, .framer-12cxqdm");
        if (section && section.id !== "main") {
          section.remove();
        } else {
          moreProjectHeadings[i].remove();
        }
      }
    }

    // C) "Ver todos os projetos" duplicate buttons in the same view
    const allProjectBtns = Array.from(document.querySelectorAll("a, button")).filter(el => {
      const t = (el.textContent || "").trim().toLowerCase();
      return t.includes("ver todos os projetos") || t.includes("view all projects") || t.includes("ver todos los proyectos");
    });
    if (allProjectBtns.length > 2) {
      for (let i = 2; i < allProjectBtns.length; i++) {
        const p = allProjectBtns[i].closest(".framer-ctde4c-container") || allProjectBtns[i];
        p.remove();
      }
    }
  }

  // On project detail pages, the "Mais projetos" block repeats the same
  // related-project cards already shown throughout the site. Per request,
  // strip it down to just the "Ver todos os projetos" link, centered, and
  // drop the heading + preview cards entirely.
  function simplifyMoreProjectsSection() {
    const headings = Array.from(document.querySelectorAll("h1, h2, h3, p, span, div")).filter(el => {
      if (el.children.length > 0) return false;
      const t = (el.textContent || "").trim().toLowerCase();
      return t === "mais projetos" || t === "more projects" || t === "más proyectos";
    });

    headings.forEach(heading => {
      const section = heading.closest("section") || heading.closest(".framer-1ngrvxa, .framer-12cxqdm");
      if (!section || !section.isConnected) return;

      const btn = Array.from(section.querySelectorAll("a, button")).find(el => {
        const t = (el.textContent || "").trim().toLowerCase();
        return t.includes("ver todos os projetos") || t.includes("view all projects") || t.includes("ver todos los proyectos");
      });

      if (btn) {
        while (section.firstChild) section.removeChild(section.firstChild);
        section.appendChild(btn);
        section.classList.add("zstudio-more-projects-cta");
      } else {
        section.remove();
      }
    });
  }

  // The "Websites" project card only exists in the static HTML export; it
  // was never part of the underlying Framer collection the other 3 cards
  // (Identidade de Marca, Criativo & Ads, SaaS / Produto) are bound to. The
  // moment React hydrates and reconciles that collection-backed grid, the
  // extra hand-added card has no matching client data and gets pruned.
  // Re-create it by cloning a surviving card and swapping its link/image/
  // title, on every page where the grid appears (home + /projects).
  function ensureWebsitesProjectCard() {
    const WEBSITES_HREF = "/projects/websites";
    const WEBSITES_IMG = "/assets/framerusercontent.com/images/HUTn1SLesaIuorSfHOln147tsA.0xnxfmu.jpg";

    const cards = Array.from(document.querySelectorAll('a.framer-JqWh3[data-framer-name^="Variant"]'));
    if (cards.length === 0) return;

    const grids = new Map();
    cards.forEach(a => {
      const container = a.parentElement;
      const grid = container ? container.parentElement : null;
      if (!grid) return;
      if (!grids.has(grid)) grids.set(grid, []);
      grids.get(grid).push(a);
    });

    grids.forEach((groupCards, grid) => {
      const websitesMatches = groupCards.filter(a => a.textContent.trim() === "Websites");
      if (websitesMatches.length > 1) {
        // Under real network timing (slower than a local build), React's
        // reconciliation of the 3-item bound collection against this
        // hand-added card can race with the clone/replace below and leave
        // two "Websites" cells in the same grid instead of one. Collapse
        // back to a single card, keeping the first (top-left) and dropping
        // the extra cell(s) entirely so the grid re-flows to the correct
        // item count.
        websitesMatches.slice(1).forEach(dup => {
          const dupContainer = dup.parentElement;
          (dupContainer || dup).remove();
        });
      }

      const websitesCard = websitesMatches[0];
      if (websitesCard) {
        // Card survived hydration, but on some pages React keeps resetting
        // its href back to a stale "/projects" prop baked into the
        // component instance itself (not fixable by editing the static
        // HTML, since hydration overwrites it on every re-render).
        const href = (websitesCard.getAttribute("href") || "").replace(/\.$/, "");
        if (href !== WEBSITES_HREF && !href.endsWith("/projects/websites")) {
          websitesCard.setAttribute("href", WEBSITES_HREF);
        }
        return;
      }

      const template = groupCards[0];
      const templateContainer = template.parentElement;
      if (!templateContainer || !templateContainer.parentElement) return;
      const gridParent = templateContainer.parentElement;

      // Hydration doesn't just drop the Websites card's content — on the
      // grid (a plain CSS Grid with auto-placement, no explicit
      // grid-column/row per card), it leaves behind the original empty
      // "-container" wrapper as a zero-content grid item. That phantom
      // item still claims a cell (the first one, top-left) and silently
      // shifts every real card's auto-placed position over by one, which
      // is why the grid looked staggered instead of a clean 2x2. Reuse
      // that exact leftover slot for the clone instead of inserting a new
      // grid item — this both removes the phantom cell and naturally
      // restores the intended top-left position for Websites.
      const emptySlot = Array.from(gridParent.children).find(
        el => el !== templateContainer && el.children.length === 0 && el.className === templateContainer.className
      );

      const clone = templateContainer.cloneNode(true);

      // The template's wrapping "-container" div was mid scroll-reveal
      // (Framer Motion fades each card in from opacity:0 via
      // IntersectionObserver) at clone time, so the clone can inherit
      // opacity:0 frozen in place forever — nothing observes a manually
      // cloned node to ever animate it in. Force just this one wrapper's
      // opacity so it renders like a settled card. Deliberately NOT a
      // blanket fix across all descendants: the hover "Arrow" reveal
      // (data-framer-name="Arrow") is also opacity:0 by design and must
      // stay that way until actually hovered.
      clone.style.opacity = "1";

      const cloneAnchor = clone.querySelector("a.framer-JqWh3");
      if (!cloneAnchor) return;
      cloneAnchor.setAttribute("href", WEBSITES_HREF);

      const img = clone.querySelector("img");
      if (img) {
        img.setAttribute("src", WEBSITES_IMG);
        img.removeAttribute("srcset");
      }

      const heading = clone.querySelector("h3, h4");
      if (heading) heading.textContent = "Websites";

      if (emptySlot) {
        emptySlot.replaceWith(clone);
      } else {
        gridParent.insertBefore(clone, templateContainer);
      }
    });
  }

  // Restores the word-row ticker on Desktop, since hydration unmounts it
  // there (see the capture at the top of this file) — the CSS override
  // that hides the physics scatter and shows the ticker only has an
  // effect if the ticker element actually exists in the DOM. The ticker
  // is normally a child of the shared .framer-1u5je0q wrapper (alongside
  // the now-always-hidden scatter container), so it's restored there,
  // matching its original nesting.
  function ensureDesktopWordRow() {
    if (!capturedWordTickerHTML) return;
    if (document.querySelector(".framer-nksdxl")) return;
    const wrapper = document.querySelector(".framer-1u5je0q");
    if (!wrapper) return;
    const holder = document.createElement("div");
    holder.innerHTML = capturedWordTickerHTML;
    const restored = holder.firstElementChild;
    if (!restored) return;

    // The ticker's <ul> starts at opacity:0 and only fades in via a scroll
    // IntersectionObserver React attaches to the ORIGINAL node — a cloned
    // node has no observer watching it, so it would stay invisible forever
    // (same class of bug fixed for the Websites card clone above).
    const list = restored.querySelector("ul");
    if (list) {
      list.style.opacity = "1";

      // The continuous scroll itself is driven by JS updating this exact
      // <ul>'s inline transform every frame (not a CSS animation), so a
      // cloned node never moves on its own. Duplicate its items once and
      // drive a plain CSS keyframe loop instead — a standard seamless
      // marquee technique, and the only way to keep it "continuous" here
      // without hand-rolling a requestAnimationFrame loop.
      const items = Array.from(list.children);
      items.forEach(li => list.appendChild(li.cloneNode(true)));
      list.style.transform = "";
      list.classList.add("zstudio-word-row-loop");
      if (!document.getElementById("zstudio-word-row-style")) {
        const style = document.createElement("style");
        style.id = "zstudio-word-row-style";
        style.textContent = "@keyframes zstudio-word-row-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}" +
          ".zstudio-word-row-loop{animation:zstudio-word-row-scroll 22s linear infinite}";
        document.head.appendChild(style);
      }
    }

    wrapper.appendChild(restored);
  }

  // Two heading-semantics issues (Lighthouse-confirmed "heading-order"
  // failures): the "Começar" CTA button was authored using Framer's H1
  // style preset (a second, spurious H1 on a page that already has one for
  // the real headline), and the project-card titles ("Websites", etc.)
  // render as H4 immediately after the page's only H2, skipping H3.
  // Editing the static HTML source for these isn't enough — React actively
  // manages these exact elements and reconciles their tag name back to
  // whatever Framer's compiled component defines, independent of the
  // pre-rendered markup, so the fix has to happen here at the DOM level.
  function fixHeadingSemantics() {
    document.querySelectorAll("h1").forEach(h1 => {
      if (h1.textContent.trim() !== "Começar") return;
      const div = document.createElement("div");
      Array.from(h1.attributes).forEach(a => div.setAttribute(a.name, a.value));
      div.innerHTML = h1.innerHTML;
      h1.replaceWith(div);
    });

    document.querySelectorAll("a.framer-JqWh3 h4").forEach(h4 => {
      const h3 = document.createElement("h3");
      Array.from(h4.attributes).forEach(a => h3.setAttribute(a.name, a.value));
      h3.innerHTML = h4.innerHTML;
      h4.replaceWith(h3);
    });
  }

  // A "Project Card" whose link points back at the page it's already on
  // (e.g. a leftover "view all" tile inside /projects itself) makes no
  // sense there and, in a 2-column grid, leaves the real cards at an odd
  // count — 4 real projects + this tile = 5, so the last row has one card
  // and a dangling empty cell beside it. Drop the self-referencing tile so
  // the grid holds a clean, evenly-filled set of real project cards.
  function removeSelfReferencingProjectCards() {
    document.querySelectorAll("a[href]").forEach(a => {
      if (!a.querySelector(':scope > [data-framer-name="Project Card"]')) return;
      const href = a.getAttribute("href") || "";
      let targetPath;
      try {
        targetPath = new URL(href, window.location.href).pathname.replace(/\/$/, "");
      } catch (e) {
        return;
      }
      const currentPath = window.location.pathname.replace(/\/$/, "");
      if (targetPath === currentPath) {
        a.remove();
      }
    });
  }

  // Standardize internal URLs: canonical routes without trailing slashes
  function canonicalizeInternalLinks() {
    document.querySelectorAll("a[href]").forEach(a => {
      const rawHref = a.getAttribute("href");
      if (!rawHref || rawHref.startsWith("http") || rawHref.startsWith("#") || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:") || rawHref.startsWith("javascript:")) {
        return;
      }

      let clean = rawHref;
      if (clean.startsWith("./") || clean.startsWith("../")) {
        clean = clean.replace(/^\.\.?\//, "/").replace(/^\.\.?\//, "/");
      }
      if (!clean.startsWith("/")) {
        clean = "/" + clean;
      }

      if (clean.length > 1 && clean.endsWith("/")) {
        clean = clean.slice(0, -1);
      }
      if (clean.length > 1 && clean.endsWith(".")) {
        clean = clean.slice(0, -1);
      }

      if (clean !== rawHref) {
        a.setAttribute("href", clean);
      }
    });
  }

  function injectContactWhatsAppCard() {
    // User requested to remove WhatsApp button/card from /contact page to not interfere with form inputs
    const existing = document.getElementById("zstudio-contact-wa-card");
    if (existing) existing.remove();
  }

  function createLanguageSwitcherElement(variant) {
    const switcher = document.createElement("div");
    switcher.className = "zstudio-lang-switcher";
    switcher.setAttribute("data-zstudio-switcher", variant);
    switcher.style.cssText = `
      display: inline-flex !important;
      align-items: center !important;
      gap: 2px !important;
      padding: 3px 4px !important;
      background: rgba(18, 18, 18, 0.88) !important;
      backdrop-filter: blur(20px) !important;
      -webkit-backdrop-filter: blur(20px) !important;
      border: 1px solid rgba(255, 255, 255, 0.14) !important;
      border-radius: 9999px !important;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
      user-select: none !important;
      position: relative !important;
      flex-shrink: 0 !important;
      z-index: 50 !important;
      line-height: 1 !important;
    `;

    const langs = [
      { code: "pt", label: "PT" },
      { code: "en", label: "EN" },
      { code: "es", label: "ES" }
    ];
    const currentLang = getActiveLang();

    langs.forEach(l => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-lang-code", l.code);
      btn.textContent = l.label;
      btn.title = l.code === "pt" ? "Português" : l.code === "en" ? "English" : "Español";

      const isActive = l.code === currentLang;
      btn.style.cssText = `
        border: none !important;
        background: ${isActive ? "rgba(255, 255, 255, 0.22)" : "transparent"} !important;
        color: ${isActive ? "#ffffff" : "rgba(255, 255, 255, 0.6)"} !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
        font-size: 11px !important;
        font-weight: ${isActive ? "600" : "500"} !important;
        padding: 4px 7px !important;
        border-radius: 9999px !important;
        cursor: pointer !important;
        line-height: 1 !important;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
        letter-spacing: 0.03em !important;
        outline: none !important;
        white-space: nowrap !important;
      `;

      btn.addEventListener("mouseenter", () => {
        if (btn.getAttribute("data-lang-code") !== getActiveLang()) {
          btn.style.color = "#ffffff";
          btn.style.background = "rgba(255, 255, 255, 0.1)";
        }
      });

      btn.addEventListener("mouseleave", () => {
        if (btn.getAttribute("data-lang-code") !== getActiveLang()) {
          btn.style.color = "rgba(255, 255, 255, 0.6)";
          btn.style.background = "transparent";
        }
      });

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveLang(l.code);
      });

      switcher.appendChild(btn);
    });

    return switcher;
  }

  function injectLanguageSwitcher() {
    // 1. Ensure global CSS guarantees. Always rewrite the tag's content (not
    // just create-if-missing): static exports of this site have occasionally
    // baked a stale copy of this same <style id="zstudio-nav-style"> directly
    // into the HTML, and a create-if-missing guard would leave that stale
    // copy in place forever since the id already "exists".
    {
      let style = document.getElementById("zstudio-nav-style");
      if (!style) {
        style = document.createElement("style");
        style.id = "zstudio-nav-style";
        document.head.appendChild(style);
      }
      style.textContent = `
        /* Always force black background on html and body */
        html, body {
          background: #000000 !important;
          background-color: #000000 !important;
        }

        /* Hide unwanted badge overlay and Framer branding */
        #template-overlay, #__framer-badge-container, .__framer-badge {
          display: none !important;
        }

        /* Hide contact WhatsApp card if rendered */
        #zstudio-contact-wa-card {
          display: none !important;
        }

        /* Hide Framer's overlapping Time container */
        .framer-1j95pa0,
        [data-framer-name="Time"] {
          display: none !important;
        }

        /* Navbar container flex row */
        .framer-1o5g5u1 {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          width: 100% !important;
          position: relative !important;
        }

        /* Dedicated container for location + switcher side-by-side */
        .zstudio-nav-right {
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 14px !important;
          flex-shrink: 0 !important;
          position: relative !important;
          z-index: 50 !important;
        }

        /*
         * Wraps the CTA pill + our injected location/switcher as a single
         * flex item, so the navbar row (.framer-1o5g5u1, which distributes
         * its DIRECT children with justify-content: space-between) still
         * only sees the original number of top-level children. Appending
         * rightGroup as a bare extra sibling there added a 4th child and
         * visibly skewed/uncentered the whole header row.
         */
        .zstudio-nav-cta-group {
          display: inline-flex !important;
          align-items: center !important;
          gap: 14px !important;
          flex-shrink: 0 !important;
        }

        /*
         * "Entre em contato agora" must sit centered on the header's own
         * width, not next to "São Paulo, SP" (it only ended up beside it
         * because both share .zstudio-nav-cta-group so the original
         * 3-child space-between math on .framer-1o5g5u1 wasn't disturbed).
         * Taking it out of that flex flow with absolute + left:50% centers
         * it against the header container's actual width at any viewport,
         * instead of whatever the flex distribution happened to produce.
         * .framer-1o5g5u1 is already position:relative.
         */
        .framer-9nc42h {
          position: absolute !important;
          left: 50% !important;
          top: 50% !important;
          transform: translate(-50%, -50%) !important;
        }

        .zstudio-nav-location {
          color: #ffffff !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          white-space: nowrap !important;
          letter-spacing: -0.01em !important;
          line-height: 1 !important;
          user-select: none !important;
          display: inline-block !important;
        }

        /* Force black background on projects bottom bands and layout elements across desktop, tablet, and mobile */
        html, body {
          background-color: #000000 !important;
          background: #000000 !important;
          overscroll-behavior-y: none !important;
        }

        /*
         * The bottom white bands come from Lenis (framer-1kfxmrd-container and
         * framer-bsobv0-container, two separate "Lenis・Smooth Scroll" component
         * instances on this page) rubber-banding past the end of its virtual
         * scroll content on touch devices, which briefly exposes the native
         * <html>/<body> background beneath. overscroll-behavior-y stops the
         * bounce; these background-color rules cover the gap in case a browser
         * ignores it (older Safari).
         */
        html {
          background-color: #000000 !important;
          height: 100% !important;
        }
        #main,
        .framer-1kfxmrd-container,
        .framer-bsobv0-container {
          background-color: #000000 !important;
        }
        .framer-15zqc7h,
        .framer-jg6vfd,
        .framer-9vBJm,
        .framer-evEMj,
        .framer-16znbqb-container,
        .framer-syrbsj-container,
        #overlay,
        #template-overlay {
          background-color: #000000 !important;
        }

        /* Contact Form Feedback & Error Styles */
        #zstudio-form-feedback {
          width: 100% !important;
          text-align: center !important;
          padding: 8px 4px !important;
          margin-bottom: 8px !important;
          min-height: 24px !important;
          display: block !important;
          transition: all 0.2s ease !important;
        }
        .zstudio-field-error {
          border: 1px solid rgba(239, 68, 68, 0.9) !important;
          box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.25) !important;
        }

        /*
         * Project card titles ("Websites", "SaaS / Produto", etc.) sit in a
         * fixed-height box (framer-nkianr, data-framer-name="Content") whose
         * text is a couple of px taller than the box, clipping descenders
         * ("p" in "Produto"). Growing framer-nkianr alone doesn't fix it:
         * its own parent card (.framer-jp00ba, height:100%) ALSO clips with
         * overflow:clip at a fixed height bound to the card/grid cell, so
         * extra height on the inner box still gets cut off one level up.
         * Instead, nudge the text itself up a few px so its descender clears
         * the existing clip boundary, without changing any box's height.
         */
        .framer-14o4nkg {
          line-height: 1.15 !important;
          transform: translateY(-3px) !important;
        }

        /*
         * Project photos (mockup/cover images bound from the CMS, rendered
         * client-side into Backdrop layers) must be shown in full, never
         * cropped. Framer's default "Backdrop" fill uses cover/crop sizing;
         * force it to fit the whole image inside its frame instead.
         */
        [data-framer-name="Backdrop"] {
          background-size: contain !important;
          background-repeat: no-repeat !important;
          background-position: center !important;
        }
        [data-framer-name="Backdrop"] img {
          object-fit: contain !important;
        }

        /* Simplified "Mais projetos" block: just the centered CTA link */
        .zstudio-more-projects-cta {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
          padding: 32px 0 !important;
        }

        @media (max-width: 600px) {
          .zstudio-nav-right {
            gap: 8px !important;
          }
          .zstudio-nav-location {
            font-size: 11px !important;
          }
          .zstudio-lang-switcher {
            padding: 2px 3px !important;
            gap: 1px !important;
          }
          .zstudio-lang-switcher button {
            font-size: 10px !important;
            padding: 3px 5px !important;
          }
        }
      `;
    }

    // 2. Hide any legacy/floating elements
    document.querySelectorAll("#zstudio-lang-switcher, #zstudio-lang-switcher-fallback").forEach(el => {
      if (el.parentElement === document.body) {
        el.remove();
      }
    });

    // 3. Inject side-by-side location and language switcher in all navbar containers
    const navContainers = document.querySelectorAll(".framer-1o5g5u1");
    navContainers.forEach(container => {
      let rightGroup = container.querySelector(".zstudio-nav-right");
      if (!rightGroup) {
        rightGroup = document.createElement("div");
        rightGroup.className = "zstudio-nav-right";

        const loc = document.createElement("span");
        loc.className = "zstudio-nav-location";
        loc.textContent = "São Paulo, SP";

        const switcher = createLanguageSwitcherElement("header");

        rightGroup.appendChild(loc);
        rightGroup.appendChild(switcher);

        // The navbar row (.framer-1o5g5u1) uses justify-content: space-between
        // across its direct children to lay out [Logo] [Nav] [CTA pill]. Simply
        // appending rightGroup here would add a 4th top-level flex child, which
        // shifts the space-between math and visibly skews/uncenters the whole
        // row. Instead, find the CTA pill's own top-level child of `container`
        // and group it together with rightGroup inside one wrapper, so the row
        // still only has 3 top-level children and keeps its original spacing.
        const ctaPill = container.querySelector(".framer-9nc42h");
        let ctaTopChild = ctaPill;
        while (ctaTopChild && ctaTopChild.parentElement && ctaTopChild.parentElement !== container) {
          ctaTopChild = ctaTopChild.parentElement;
        }
        if (ctaTopChild && ctaTopChild.parentElement === container) {
          const group = document.createElement("div");
          group.className = "zstudio-nav-cta-group";
          ctaTopChild.parentElement.insertBefore(group, ctaTopChild);
          group.appendChild(ctaTopChild);
          group.appendChild(rightGroup);
        } else {
          container.appendChild(rightGroup);
        }
      } else {
        // Ensure switcher is present
        if (!rightGroup.querySelector(".zstudio-lang-switcher")) {
          const switcher = createLanguageSwitcherElement("header");
          rightGroup.appendChild(switcher);
        }
        // Ensure location text is present
        if (!rightGroup.querySelector(".zstudio-nav-location")) {
          const loc = document.createElement("span");
          loc.className = "zstudio-nav-location";
          loc.textContent = "São Paulo, SP";
          rightGroup.insertBefore(loc, rightGroup.firstChild);
        }
      }
    });

    // 4. Ensure old .framer-1j95pa0 is hidden
    document.querySelectorAll(".framer-1j95pa0, [data-framer-name=\"Time\"]").forEach(el => {
      el.style.setProperty("display", "none", "important");
    });
  }

  function updateSwitcherUI() {
    const currentLang = getActiveLang();
    document.querySelectorAll(".zstudio-lang-switcher, #zstudio-lang-switcher-fallback").forEach(switcher => {
      switcher.querySelectorAll("button[data-lang-code]").forEach(btn => {
        const code = btn.getAttribute("data-lang-code");
        const isActive = (code === currentLang);
        btn.style.background = isActive ? "rgba(255, 255, 255, 0.18)" : "transparent";
        btn.style.color = isActive ? "#ffffff" : "rgba(255, 255, 255, 0.55)";
        btn.style.fontWeight = isActive ? "600" : "500";
      });
    });
    // Remove Contact WhatsApp Card if present
    const card = document.getElementById("zstudio-contact-wa-card");
    if (card) {
      card.remove();
    }
  }
  // Contact Form WhatsApp Integration
  const FORM_I18N = {
    nameError: {
      pt: "Por favor, preencha seu nome completo.",
      en: "Please enter your full name.",
      es: "Por favor, ingresa tu nombre completo."
    },
    emailError: {
      pt: "Por favor, insira um e-mail válido.",
      en: "Please enter a valid email address.",
      es: "Por favor, ingresa un correo electrónico válido."
    },
    budgetError: {
      pt: "Por favor, selecione uma faixa de investimento.",
      en: "Please select an investment range.",
      es: "Por favor, selecciona un rango de inversión."
    },
    messageError: {
      pt: "Por favor, escreva uma mensagem detalhando seu projeto.",
      en: "Please write a message detailing your project.",
      es: "Por favor, escribe un mensaje detalhando tu proyecto."
    },
    sending: {
      pt: "Abrindo WhatsApp...",
      en: "Opening WhatsApp...",
      es: "Abriendo WhatsApp..."
    },
    success: {
      pt: "Mensagem pronta no WhatsApp!",
      en: "Message ready in WhatsApp!",
      es: "¡Mensaje listo en WhatsApp!"
    }
  };

  const BUDGET_I18N = {
    "Até R$ 1.000": { pt: "Até R$ 1.000", en: "Up to $1,000", es: "Hasta $1.000" },
    "R$ 1.000 – R$ 3.000": { pt: "R$ 1.000 – R$ 3.000", en: "$1,000 – $3,000", es: "$1.000 – $3.000" },
    "R$ 3.000 – R$ 5.000": { pt: "R$ 3.000 – R$ 5.000", en: "$3,000 – $5,000", es: "$3.000 – $5.000" },
    "Acima de R$ 10.000": { pt: "Acima de R$ 10.000", en: "Above $10,000", es: "Más de $10.000" },
    "Ainda não sei": { pt: "Ainda não sei", en: "Not sure yet", es: "Aún no lo sé" }
  };

  function getFormFeedbackElement(form) {
    let feedback = form.querySelector("#zstudio-form-feedback");
    if (!feedback) {
      feedback = document.createElement("div");
      feedback.id = "zstudio-form-feedback";
      const submitContainer = form.querySelector(".framer-qu44xm, .framer-al9wyy-container, button[type='submit']") || form.lastElementChild;
      if (submitContainer && submitContainer.parentNode) {
        submitContainer.parentNode.insertBefore(feedback, submitContainer);
      } else {
        form.appendChild(feedback);
      }
    }
    return feedback;
  }

  function handleContactFormSubmit(form) {
    if (!form) return;
    const lang = getActiveLang();
    const feedback = getFormFeedbackElement(form);

    const nameInput = form.querySelector("input[name*='Nome'], input[name*='name'], input[placeholder*='Nome'], input[placeholder*='name'], input[type='text']");
    const emailInput = form.querySelector("input[type='email'], input[name*='Email'], input[name*='email'], input[placeholder*='Email']");
    const budgetSelect = form.querySelector("select, select[name='Location']");
    const msgInput = form.querySelector("textarea, textarea[name='Mensagem'], textarea[placeholder*='mensagem'], textarea[placeholder*='message']");

    const fields = [nameInput, emailInput, budgetSelect, msgInput].filter(Boolean);

    // Clear previous error styles
    fields.forEach(el => {
      el.classList.remove("zstudio-field-error");
    });
    feedback.innerHTML = "";

    const nameVal = nameInput ? nameInput.value.trim() : "";
    const emailVal = emailInput ? emailInput.value.trim() : "";
    const rawBudget = budgetSelect ? (budgetSelect.value || "").trim() : "";
    const msgVal = msgInput ? msgInput.value.trim() : "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isBudgetSelected = rawBudget && 
      rawBudget !== "" && 
      !rawBudget.toLowerCase().includes("selecionar") && 
      !rawBudget.toLowerCase().includes("select") && 
      (budgetSelect ? budgetSelect.selectedIndex > 0 : true);

    function setError(inputEl, message) {
      if (inputEl) {
        inputEl.classList.add("zstudio-field-error");
        inputEl.focus();
        const clearHandler = function() {
          inputEl.classList.remove("zstudio-field-error");
          feedback.innerHTML = "";
          inputEl.removeEventListener("input", clearHandler);
          inputEl.removeEventListener("change", clearHandler);
        };
        inputEl.addEventListener("input", clearHandler);
        inputEl.addEventListener("change", clearHandler);
      }
      feedback.innerHTML = '<span style="color:#ef4444;font-size:13px;font-weight:500;display:inline-block;">' + message + '</span>';
    }

    // Validation
    if (!nameVal || nameVal.length < 2) {
      setError(nameInput, FORM_I18N.nameError[lang]);
      return;
    }

    if (!emailVal || !emailRegex.test(emailVal)) {
      setError(emailInput, FORM_I18N.emailError[lang]);
      return;
    }

    if (!isBudgetSelected) {
      setError(budgetSelect, FORM_I18N.budgetError[lang]);
      return;
    }

    if (!msgVal || msgVal.length < 3) {
      setError(msgInput, FORM_I18N.messageError[lang]);
      return;
    }

    // Build message
    const budgetDisplay = (BUDGET_I18N[rawBudget] && BUDGET_I18N[rawBudget][lang]) ? BUDGET_I18N[rawBudget][lang] : rawBudget;

    let waMessage = "";
    if (lang === "en") {
      waMessage = `Hello! My name is ${nameVal}.\nI would like to discuss a project with Z.studio.\n\n• Email: ${emailVal}\n• Investment range: ${budgetDisplay}\n• Message:\n${msgVal}`;
    } else if (lang === "es") {
      waMessage = `¡Hola! Mi nombre es ${nameVal}.\nMe gustaría hablar sobre un proyecto con Z.studio.\n\n• Correo electrónico: ${emailVal}\n• Rango de inversión: ${budgetDisplay}\n• Mensaje:\n${msgVal}`;
    } else {
      waMessage = `Olá! Meu nome é ${nameVal}.\nGostaria de conversar sobre um projeto com a Z.studio.\n\n• E-mail: ${emailVal}\n• Faixa de investimento: ${budgetDisplay}\n• Mensagem:\n${msgVal}`;
    }

    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    // Show feedback
    feedback.innerHTML = '<span style="color:#22c55e;font-size:13px;font-weight:500;display:inline-block;">' + FORM_I18N.sending[lang] + '</span>';

    // Dispatch WhatsApp opening via link click
    const waLink = document.createElement("a");
    waLink.href = waUrl;
    waLink.target = "_blank";
    waLink.rel = "noopener noreferrer";
    document.body.appendChild(waLink);
    waLink.click();

    setTimeout(() => {
      waLink.remove();
      feedback.innerHTML = '<span style="color:#22c55e;font-size:13px;font-weight:500;display:inline-block;">' + FORM_I18N.success[lang] + '</span>';
      setTimeout(() => {
        if (feedback) feedback.innerHTML = "";
      }, 5000);
    }, 400);
  }

  function initContactForm() {
    const forms = document.querySelectorAll("form, .framer-1o4ffb9");
    forms.forEach(form => {
      if (form.getAttribute("data-zstudio-form-attached") === "true") return;
      form.setAttribute("data-zstudio-form-attached", "true");
      form.setAttribute("novalidate", "true");

      // Prevent native and React submit
      form.addEventListener("submit", function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handleContactFormSubmit(form);
      }, true);

      // Handle button click directly
      const submitBtn = form.querySelector("button[type='submit'], [data-reset='button'], .framer-qu44xm, .framer-al9wyy-container");
      if (submitBtn) {
        submitBtn.addEventListener("click", function(e) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          handleContactFormSubmit(form);
        }, true);
      }
    });
  }

  // Global capture interception to guarantee no submission escapes
  document.addEventListener("submit", function(e) {
    const form = e.target.closest("form") || (e.target.tagName === "FORM" ? e.target : null);
    if (form) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      handleContactFormSubmit(form);
    }
  }, true);

  document.addEventListener("click", function(e) {
    const target = e.target;
    const btn = target.closest("button[type='submit'], .framer-qu44xm, .framer-al9wyy-container");
    if (btn) {
      const form = btn.closest("form") || document.querySelector("form");
      if (form) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handleContactFormSubmit(form);
      }
    }
  }, true);

  // Initial Boot
  function init() {
    removeLocationAndTime();
    cleanupStructuralDuplicates();
    simplifyMoreProjectsSection();
    canonicalizeInternalLinks();
    removeSelfReferencingProjectCards();
    ensureWebsitesProjectCard();
    ensureDesktopWordRow();
    fixHeadingSemantics();
    injectLanguageSwitcher();
    applyTranslations();
    updateWhatsAppLinks();
    removeSocialLinks();
    injectContactWhatsAppCard();
    initContactForm();

    // Observe DOM mutations to preserve translations, switcher, WhatsApp links, and dedup state across Framer updates
    let debounceTimer;
    const observer = new MutationObserver((records) => {
      // The Contact page's budget dropdown has a pre-existing Framer bug
      // where its <option> elements churn (added/removed) continuously,
      // dozens of times per second, forever — nothing in this codebase
      // causes or can stop that loop at its source (it's inside Framer's
      // own compiled form component). None of the repair functions below
      // care about <option> churn, so skip rescheduling when a batch is
      // made up ENTIRELY of that noise, instead of needlessly re-running
      // every repair function ~20x/second for as long as the page is open.
      const onlyOptionChurn = records.every(r => r.target && r.target.nodeType === 1 && r.target.tagName === "OPTION");
      if (onlyOptionChurn) return;

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        removeLocationAndTime();
        cleanupStructuralDuplicates();
        simplifyMoreProjectsSection();
        canonicalizeInternalLinks();
        removeSelfReferencingProjectCards();
        ensureWebsitesProjectCard();
        ensureDesktopWordRow();
        fixHeadingSemantics();
        injectLanguageSwitcher();
        applyTranslations();
        updateWhatsAppLinks();
        removeSocialLinks();
        injectContactWhatsAppCard();
        initContactForm();
      }, 50);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Export helper globally
  window.ZStudio = {
    setLang: setActiveLang,
    getLang: getActiveLang,
    getWhatsAppUrl: getWhatsAppUrl
  };
})();
