/**
 * z.studio Core Engine
 * - 3-Language System (PT-BR default, EN, ES) with persistence
 * - Direct WhatsApp integration (+55 11 91440-6822) with contextual pre-filled messages
 * - Complete removal of external social links
 * - Integrated, discrete language switcher in header/navigation
 *
 * EDIT THIS FILE, not zstudio-core.js -- that one is the minified build
 * artifact actually served to visitors (saves ~9KB even after brotli, since
 * this file's comments compress far worse than code does). It's regenerated
 * automatically by `npm run build` (via the `build:core` script, esbuild
 * --minify), so a plain build always picks up source edits. If you need the
 * minified file without a full Next.js build, run `npm run build:core`
 * directly.
 */

(function() {

  // Framer's own runtime sets document.title on every page after
  // hydration, independent of anything in this file — but on the top-level
  // pages (Home/About/Contact/Projects) it only knows the site's internal
  // project name ("Asher Vale", never renamed to z.studio) and overwrites
  // the correct per-page <title> from the static HTML with that generic
  // value, repeatedly, for as long as the page stays open. Capture the
  // correct title here at script-parse time (before hydration can touch
  // it) so fixDocumentTitle() below can keep restoring it.
  const originalTitle = document.title;

  const titleTranslations = {
    "z.studio - Design, tecnologia e desenvolvimento": { en: "z.studio - Design, technology and development", es: "z.studio - Diseño, tecnología y desarrollo" },
    "Sobre - z.studio": { en: "About - z.studio", es: "Sobre mí - z.studio" },
    "Contato - z.studio": { en: "Contact - z.studio", es: "Contacto - z.studio" },
    "Projetos - z.studio": { en: "Projects - z.studio", es: "Proyectos - z.studio" },
    "Websites - z.studio": { en: "Websites - z.studio", es: "Sitios Web - z.studio" },
    "Identidade de Marca - z.studio": { en: "Brand Identity - z.studio", es: "Identidad de Marca - z.studio" },
    "SaaS / Produto - z.studio": { en: "SaaS / Product - z.studio", es: "SaaS / Producto - z.studio" },
    "Criativo & Ads - z.studio": { en: "Creative & Ads - z.studio", es: "Creatividad & Ads - z.studio" }
  };

  // Restores the correct title, translating it if a known language other
  // than PT is active. Shared by the immediate title observer below (so
  // Framer's "Asher Vale" flash is corrected on the very next microtask,
  // not left visible until the next debounced repair pass) and by
  // applyTranslations()'s regular repair cycle (so a live language switch
  // still updates the title).
  function fixDocumentTitle() {
    const lang = typeof getActiveLang === "function" ? getActiveLang() : "pt";
    const translated = titleTranslations[originalTitle];
    const desiredTitle = (lang !== "pt" && translated && translated[lang]) ? translated[lang] : originalTitle;
    if (originalTitle && document.title !== desiredTitle) {
      document.title = desiredTitle;
    }
  }

  // Reactive correction (a MutationObserver reverting document.title after
  // Framer's runtime had already written "Asher Vale" to it) still let the
  // wrong value land in the tab first, for however long it took the
  // observer's microtask to fire -- confirmed via instrumentation to be a
  // real, visible flash, not just a theoretical race. Intercepting the
  // document.title setter itself closes that gap to zero: Framer's write
  // is rewritten before it ever reaches the tab, instead of being chased
  // afterward. Framer was confirmed (by that same instrumentation) to set
  // it via `document.title = ...`, not direct <title> node manipulation,
  // so overriding the accessor here catches every write.
  if (originalTitle) {
    const titleDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, "title");
    if (titleDescriptor && titleDescriptor.set) {
      Object.defineProperty(document, "title", {
        configurable: true,
        get: function() { return titleDescriptor.get.call(document); },
        set: function(value) {
          const lang = typeof getActiveLang === "function" ? getActiveLang() : "pt";
          const translated = titleTranslations[originalTitle];
          const desiredTitle = (lang !== "pt" && translated && translated[lang]) ? translated[lang] : originalTitle;
          titleDescriptor.set.call(document, value === desiredTitle ? value : desiredTitle);
        }
      });
    }
  }

  const WA_NUMBER = "5511914406822";

  const WA_MESSAGES = {
    general: {
      pt: "Olá! Conheci a z.studio e gostaria de conversar sobre um projeto.",
      en: "Hello! I found z.studio and would like to talk about a project.",
      es: "¡Hola! Conocí z.studio y me gustaría hablar sobre un proyecto."
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
    "Eu sou o Zack, criador da z.studio.": {
      en: "I'm Zack, founder of z.studio.",
      es: "Soy Zack, fundador de z.studio."
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
    "A z.studio nasceu justamente disso: da vontade de criar, experimentar e construir algo que tenha impacto de verdade.": {
      en: "z.studio was born from this exact drive: the passion to create, experiment, and build experiences that deliver genuine impact.",
      es: "z.studio nació justamente de eso: de las ganas de crear, experimentar y construir soluciones que generen un impacto real."
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
    "Construção da z.studio unindo design, tecnologia, desenvolvimento e motion para criar experiências digitais sob medida.": {
      en: "Building z.studio by fusing design, technology, engineering, and motion to deliver bespoke digital experiences.",
      es: "Construcción de z.studio uniendo diseño, tecnología, desarrollo y animación para crear experiencias digitales a medida."
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
    // The source content itself has a typo here ("Autação", missing "om") --
    // the en/es values below are what the label actually means, confirmed
    // by their meaning ("Automation"). A `pt` override corrects the default
    // PT-BR display too, not just the en/es translations (see translateText).
    "Autação": {
      pt: "Automação",
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
    // Rendered as two separate <p> siblings, not one string — a combined
    // key here never matches either paragraph's own (shorter) text node,
    // so neither half ever got translated. Split to match the real DOM.
    "Pronto para melhorar seu negócio?": {
      en: "Ready to elevate your business?",
      es: "¿Listo para impulsar tu negocio?"
    },
    "Vamos começar.": {
      en: "Let's begin.",
      es: "Empecemos."
    },
    "Built in": {
      en: "Built in",
      es: "Hecho en"
    },
    "© 2026  - z.studio": {
      en: "© 2026 - z.studio",
      es: "© 2026 - z.studio"
    },
    "© 2026 - z.studio": {
      en: "© 2026 - z.studio",
      es: "© 2026 - z.studio"
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
    // A `.pt` override rewrites the DOM's text to the corrected spelling
    // (see translateText), so that corrected text also needs to resolve
    // back to this entry -- otherwise a later switch to en/es after the
    // pt correction has already landed finds no match at all.
    if (trans.pt) REVERSE_LOOKUP[trans.pt.trim()] = ptKey;
  }

  // The three labels the "Começar" CTA can ever legitimately carry, sourced
  // from the same DICTIONARY entry translateText() itself reads -- so this
  // set can't drift out of sync with the translations it needs to recognize.
  // Used by fixHeadingSemantics() (whose gate must keep matching after a
  // language switch, not just in PT) and fixComecarButtonTranslation() below.
  const COMECAR_LABELS = new Set([
    "Começar",
    (DICTIONARY["Começar"] && DICTIONARY["Começar"].en) || "Get started",
    (DICTIONARY["Começar"] && DICTIONARY["Começar"].es) || "Empezar"
  ]);

  function getActiveLang() {
    try {
      const saved = localStorage.getItem("zstudio_lang");
      if (saved && (saved === "pt" || saved === "en" || saved === "es")) {
        return saved;
      }
    } catch(e) {}
    return "pt";
  }

  // A plain instant text swap reads as a glitch (everything on the page
  // jump-cuts to new words mid-view); requested site-wide as "elements
  // should have an appear animation, already showing the target language
  // when they do." Rather than choreograph per-element reveal animations
  // across 8 structurally different pages (high risk of fighting Framer's
  // own hydration, the exact class of bug behind the Começar-button and
  // Hero-ticker fixes earlier this session), this dips the whole page's
  // opacity down, swaps every string while it's barely visible, then lets
  // it fade back in already correct -- one global transition instead of
  // dozens of local ones, so it can't drift out of sync with whatever any
  // individual page happens to contain.
  function setActiveLang(lang) {
    if (lang !== "pt" && lang !== "en" && lang !== "es") return;
    try {
      localStorage.setItem("zstudio_lang", lang);
    } catch(e) {}

    function applyLangChange() {
      document.documentElement.setAttribute("data-zstudio-lang", lang);
      document.documentElement.setAttribute("lang", lang === "pt" ? "pt-BR" : lang);
      applyTranslations();
      updateWhatsAppLinks();
      updateSwitcherUI();
    }

    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      applyLangChange();
      return;
    }

    document.documentElement.style.opacity = "0.4";
    setTimeout(() => {
      applyLangChange();
      document.documentElement.style.opacity = "1";
    }, 160);
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
      if (targetLang === "pt") return DICTIONARY[clean].pt || clean;
      return DICTIONARY[clean][targetLang] || clean;
    }

    // Match via reverse lookup if text was previously translated
    if (REVERSE_LOOKUP[clean]) {
      const ptOriginal = REVERSE_LOOKUP[clean];
      if (targetLang === "pt") return (DICTIONARY[ptOriginal] && DICTIONARY[ptOriginal].pt) || ptOriginal;
      return (DICTIONARY[ptOriginal] && DICTIONARY[ptOriginal][targetLang]) || clean;
    }

    return null;
  }

  function applyTranslations() {
    const lang = getActiveLang();

    // 1. Document Title (also corrected immediately by the MutationObserver
    // set up near the top of this file — this call just covers a live
    // language switch, which doesn't itself mutate <title>).
    fixDocumentTitle();

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
    // International (EN/ES) visitors don't use WhatsApp -- every CTA below
    // that would otherwise open wa.me instead does a same-tab, in-site
    // navigation to the contact page's own form (already fully built,
    // validated, and -- as of this same pass -- accessible: see
    // handleContactFormSubmit()'s own EN/ES branch, which mails
    // hello@z.studio instead of opening WhatsApp once that form is
    // submitted). PT is entirely unchanged below.
    const international = lang === "en" || lang === "es";
    // canonicalizeInternalLinks() (same repair cycle) normalizes every
    // internal href to an absolute path with no trailing slash -- using
    // that same canonical form here means it's already correct and stable
    // from the first paint, not reliant on a later pass to reformat it.
    const contactHref = "/contact";

    // 1. Replace all mailto: links with WhatsApp (or the contact page)
    document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
      if (international) {
        a.href = contactHref;
        a.removeAttribute("target");
        a.removeAttribute("rel");
      } else {
        a.href = generalWaUrl;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      a.setAttribute("data-wa-cta", "true");
    });

    // 2. Identify contact CTAs and point to WhatsApp (or the contact page)
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
        text === "start chat on whatsapp" ||
        // The Hero CTA's actual rendered text (DICTIONARY["Começar"]):
        // "começar" / "get started" / "empezar". Not covered by any
        // pattern above -- this button kept whichever href the static
        // export happened to ship with, in every language, until this fix.
        text === "começar" ||
        text === "get started" ||
        text === "empezar";

      if (isContactCTA && !el.closest("#zstudio-lang-switcher") && !el.closest("form") && !el.closest(".framer-1o4ffb9") && !el.closest(".framer-qu44xm") && !el.closest(".framer-al9wyy-container")) {
        if (el.tagName.toLowerCase() === "a") {
          if (international) {
            el.href = contactHref;
            el.removeAttribute("target");
            el.removeAttribute("rel");
          } else {
            const context = getPageContext();
            el.href = getWhatsAppUrl(context);
            el.target = "_blank";
            el.rel = "noopener noreferrer";
          }
        } else {
          el.style.cursor = "pointer";
          el.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (international) {
              location.href = contactHref;
            } else {
              const context = getPageContext();
              window.open(getWhatsAppUrl(context), "_blank");
            }
          };
        }
      }
    });

    // 3. Specific header "Entre em contato agora" container
    const headerPill = document.querySelector(".framer-9nc42h");
    if (headerPill) {
      headerPill.style.cursor = "pointer";
      headerPill.title = international ? "" : "WhatsApp: +55 11 91440-6822";
      headerPill.onclick = function(e) {
        e.preventDefault();
        if (international) {
          location.href = contactHref;
        } else {
          window.open(generalWaUrl, "_blank");
        }
      };
    }

    // 4. Update WhatsApp card on /contact if present (PT only -- this card
    // is never shown to international visitors in the first place, see
    // injectContactWhatsAppCard())
    const contactWaBtn = document.getElementById("zstudio-contact-wa-btn");
    if (contactWaBtn && !international) {
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
      // Never touch the real LinkedIn/Instagram links injectSocialLinks()
      // adds below -- this function exists to strip Framer's own
      // placeholder template links (framer.link, framer.com/templates, and
      // generic demo social URLs), not the site's actual social presence.
      if (a.hasAttribute("data-zstudio-social")) return;
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

  const SOCIAL_LINKS = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/z-studio",
      svg: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z"/></svg>'
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/z.studio.portifolio/",
      svg: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>'
    }
  ];

  // The empty "Right" column (.framer-4ct5ei, inside .framer-12chgvp
  // "Right") already exists in the footer on every page, sitting parallel
  // to "Left" (logo/tagline) and "Mid" (menu links) -- evidently exactly
  // where Framer's own template normally puts social icons, just never
  // filled in for this site. Reuses that native slot instead of inventing
  // a new one. See removeSocialLinks() above for the matching exclusion
  // (data-zstudio-social) that keeps it from stripping these back out.
  function injectSocialLinks() {
    document.querySelectorAll(".framer-4ct5ei").forEach(wrapper => {
      if (wrapper.querySelector('[data-zstudio-social]')) return;
      // Same conflicting-specificity issue as the link's display below:
      // the stylesheet rule's flex-direction:row loses to some other
      // selector, stacking the icons vertically instead. Inline
      // !important wins regardless of that rule's specificity.
      wrapper.style.setProperty("flex-direction", "row", "important");
      SOCIAL_LINKS.forEach(social => {
        const a = document.createElement("a");
        a.href = social.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.setAttribute("data-zstudio-social", "true");
        a.setAttribute("aria-label", social.name);
        a.className = "zstudio-social-link";
        a.innerHTML = social.svg;
        // Some Framer rule elsewhere on this page computes display:none on
        // this exact element even with the stylesheet rule above marked
        // !important (confirmed via getComputedStyle: width/height resolve
        // correctly to 18px, display still resolves to none -- a
        // higher-specificity conflicting selector, never fully identified).
        // An inline !important always outranks any stylesheet rule
        // regardless of that rule's own specificity, so setting it here
        // directly is the reliable fix rather than chasing the conflict.
        a.style.setProperty("display", "inline-flex", "important");
        wrapper.appendChild(a);
      });
    });
  }

  // See the html[data-zstudio-hero-force-visible] CSS rule for the full
  // rationale. Deliberately called once from init() only, never from the
  // repair cycle -- this is a one-shot "guarantee visible on this page
  // load" fix, not a persistent state to keep re-applying, and this
  // timeout is what hands control back to Framer's own continuous drift.
  // Raised from an earlier 400ms to 3000ms: 400ms reliably covered the
  // very first paint, but a screenshot taken a second or so later (a
  // completely normal amount of time for a real visitor to still be
  // looking at the hero) could still land in a gap of Framer's own
  // drift cycle and show nothing, since releasing the override hands
  // back to whatever point that drift has reached on its own clock,
  // confirmed directly via a screenshot at that timing. 3000ms is still
  // well inside the ~11s full cycle (gap tuned elsewhere in this file),
  // so the ticker is unmistakably still a living, moving element, not a
  // frozen one -- it just stays on-screen for the realistic window
  // where a visitor's first look actually happens.
  function ensureHeroVisibleOnLoad() {
    if (!document.querySelector(".framer-1v4qmj0 > ul")) return;
    document.documentElement.setAttribute("data-zstudio-hero-force-visible", "true");
    setTimeout(() => {
      document.documentElement.removeAttribute("data-zstudio-hero-force-visible");
    }, 3000);
  }

  // Small editorial accents (an eyebrow label + a bracketed section index,
  // e.g. "[ 01 ]") absolutely positioned inside .framer-qfrgms (the Hero
  // Container, confirmed position:relative already) rather than inserted
  // into its flex flow. That flow is exactly 2 children laid out with
  // place-content:flex-end and a fixed 200px gap -- learned earlier this
  // session (the nav-row fix) that adding a 3rd flex child shifts that
  // kind of layout math and visibly skews it. Absolute positioning
  // sidesteps that entirely, same technique already used for the nav's
  // own status-dot indicator (.framer-9nc42h). Both are aria-hidden: the
  // H1 already carries the real content, these are purely decorative.
  function injectHeroEditorialAccents() {
    const hero = document.querySelector(".framer-qfrgms");
    if (!hero) return;
    if (!hero.querySelector(".zstudio-hero-eyebrow")) {
      const eyebrow = document.createElement("span");
      eyebrow.className = "zstudio-hero-eyebrow";
      eyebrow.setAttribute("aria-hidden", "true");
      eyebrow.textContent = "( Estúdio Digital )";
      hero.appendChild(eyebrow);
    }
    if (!hero.querySelector(".zstudio-hero-index")) {
      const index = document.createElement("span");
      index.className = "zstudio-hero-index";
      index.setAttribute("aria-hidden", "true");
      index.textContent = "[ 01 ]";
      hero.appendChild(index);
    }
  }

  // Scroll-reveal motion system: the Projects/About/CTA sections and each
  // project card fade/rise into place the first time they cross into
  // view, instead of simply existing on page load same as everything
  // else. One-shot per element (unobserve after it reveals -- scrolling
  // back up never re-hides it, per this file's existing no-scroll-
  // hijacking stance), reduced-motion skips straight to the visible end
  // state. A single shared IntersectionObserver is created once, but
  // which elements get tagged and handed to it runs on every repair
  // cycle, not just once from init() -- a first version gated the whole
  // thing behind a one-time flag and it silently never did anything,
  // because Framer's own hydration reconciliation resets a <section>'s
  // className after this file's init() already ran (same root cause as
  // every other inject-on-every-cycle function in this file), stripping
  // the freshly-added "zstudio-reveal" class before the page even
  // finished loading. Checking for the class instead of a boolean flag
  // makes re-running this safe and idempotent: already-tagged elements
  // are skipped, newly-(re)rendered ones get caught on the next cycle.
  // Project cards get a small staggered transition-delay by their index
  // among siblings so a grid coming into view cascades instead of
  // popping in all at once.
  let zstudioRevealObserver = null;
  function initScrollReveal() {
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = document.querySelectorAll(
      'section[data-framer-name="Projects"], section[data-framer-name="About"], section[data-framer-name="CTA"]'
    );
    const cards = document.querySelectorAll(".framer-jp00ba");

    cards.forEach((card, i) => {
      if (!card.style.transitionDelay) card.style.transitionDelay = (i % 4) * 90 + "ms";
    });

    const targets = [...sections, ...cards].filter(
      el => !el.classList.contains("zstudio-reveal") && !el.classList.contains("zstudio-reveal-visible")
    );
    if (!targets.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(el => el.classList.add("zstudio-reveal-visible"));
      return;
    }

    if (!zstudioRevealObserver) {
      zstudioRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("zstudio-reveal-visible");
            zstudioRevealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    }

    targets.forEach(el => {
      el.classList.add("zstudio-reveal");
      zstudioRevealObserver.observe(el);
    });
  }

  // Nav scroll state: a thin top-of-section black bar with nothing to
  // separate it from the page gains a subtle bottom border once the user
  // has actually scrolled, giving the header a sense of sitting above the
  // content rather than being painted flat onto it. One scroll listener,
  // rAF-throttled, toggling a single class -- no layout read in the
  // handler itself, so this can't contend with the hero ticker's own
  // per-frame work.
  let zstudioNavScrollInitialized = false;
  function initNavScrollState() {
    if (zstudioNavScrollInitialized) return;
    zstudioNavScrollInitialized = true;
    let ticking = false;
    function apply() {
      const scrolled = window.scrollY > 24;
      document.querySelectorAll("nav").forEach(nav => {
        nav.classList.toggle("zstudio-nav-scrolled", scrolled);
      });
      ticking = false;
    }
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(apply);
        ticking = true;
      }
    }, { passive: true });
    apply();
  }

  // REMOVED (was: badge.remove() on #__framer-badge-container). That
  // element isn't just an empty leftover -- Framer's own bootstrap
  // (script_main) hydrates a separate React root into it on a deferred
  // startTransition, well after this file's own init() already ran and
  // removed the node. Deleting it out from under that later hydrateRoot()
  // call is exactly "Minified React error #405: Target container is not
  // a DOM element" (confirmed by disabling this one function alone, with
  // every other repair function still active: the error disappears).
  // The badge was already fully invisible without any of this -- a CSS
  // rule from the export tool itself (#__framer-badge-container,
  // .__framer-badge{display:none!important}, in every page's own
  // <style id="f2c-strip-framer-badge">) hides it regardless, and
  // hydrating into a display:none element is completely normal. So this
  // function bought nothing visually and only introduced a real error;
  // removing it is a pure fix, not a tradeoff.

  // Triggers the "Elevacao" entrance transition (see the CSS comment on
  // #main/footer in each page's zstudio-overrides block) by adding a class
  // two animation frames after this runs. The double rAF ensures the
  // browser has actually painted the pre-transition state (opacity:0)
  // at least once before the class flips it, so it transitions instead of
  // jumping straight to the end state with nothing visible in between.
  // footer isn't always present the first time this runs (hydration adds
  // it late on some pages), so this only touches elements that exist and
  // don't have the class yet -- safe to call again from the repair cycle.
  function triggerElevacao() {
    const targets = [document.getElementById("main"), document.querySelector("footer")]
      .filter(el => el && !el.classList.contains("zstudio-elevated"));
    if (targets.length === 0) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        targets.forEach(el => el.classList.add("zstudio-elevated"));
      });
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
  //
  // The card selector deliberately does NOT filter by
  // [data-framer-name^="Variant"] even though that's how these cards are
  // marked at rest — Framer's own hover-variant swap REMOVES that exact
  // attribute from whichever card is currently hovered (swapping to a
  // hover-specific class instead), so filtering on it made the hovered
  // card invisible to this function. It would then conclude "no Websites
  // card in this grid" and clone a brand new one right on top of the
  // real, still-present one — a genuine duplicate, not a visual glitch.
  // ".framer-JqWh3" alone stays present through hover and reliably
  // matches only the 4 real project card anchors.
  function ensureWebsitesProjectCard() {
    const WEBSITES_HREF = "/projects/websites";
    const WEBSITES_IMG = "/assets/framerusercontent.com/images/HUTn1SLesaIuorSfHOln147tsA.0xnxfmu.webp";

    const cards = Array.from(document.querySelectorAll('a.framer-JqWh3'));
    if (cards.length === 0) return;

    const grids = new Map();
    cards.forEach(a => {
      const container = a.parentElement;
      const grid = container ? container.parentElement : null;
      if (!grid) return;
      if (!grids.has(grid)) grids.set(grid, []);
      grids.get(grid).push(a);
    });

    // Locale-aware: this repair cycle also runs applyTranslations() later in
    // the SAME pass, which rewrites this exact card's heading to the active
    // language. A PT/EN-only literal check ("Websites") stops matching the
    // instant the heading reads "Sitios Web" (the ES translation — EN is
    // coincidentally identical to the PT source, which is why this bug only
    // ever showed up in Spanish) and concludes the real card is "missing" on
    // every subsequent pass — cloning a fresh one, which the same pass's
    // applyTranslations() immediately re-translates to Spanish again,
    // re-triggering the very same false "missing" detection next pass. That
    // clone-detect-clone feedback loop is what produced a dozen-plus
    // duplicate cards from a single language switch. Matching against every
    // language's translation (sourced from the same DICTIONARY
    // applyTranslations() itself uses, so it can't drift out of sync) fixes
    // the detection at its root instead of just cleaning up the symptom.
    const websitesLabels = new Set(["Websites", (DICTIONARY.Websites && DICTIONARY.Websites.en) || "Websites", (DICTIONARY.Websites && DICTIONARY.Websites.es) || "Sitios Web"]);

    grids.forEach((groupCards, grid) => {
      const websitesMatches = groupCards.filter(a => websitesLabels.has(a.textContent.trim()));
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

  // REMOVED (was: ensureDesktopWordRow(), a clone-and-reinsert workaround
  // for the word-row ticker allegedly being missing on Desktop after
  // hydration). Root-caused to a real, measurable CLS regression: Framer's
  // hydration removes the ticker on Desktop, this function reinserted a
  // clone, and then Framer's own reconciliation -- not recognizing that
  // foreign node -- removed it again, which triggered this function to
  // reinsert it again. Two full cycles of that were directly visible in
  // #main's height (oscillating by 700+px) before things settled, and
  // disabling only this one function (every other repair function still
  // active) took measured desktop CLS from ~0.09 to 0.0000.
  // Verified the underlying bug this was working around no longer exists
  // -- at 1440px the Desktop scatter animation renders all the words
  // correctly on its own with this function fully disabled, at ~900px the
  // ticker appears natively without any restoration, and Mobile was
  // already unaffected (different DOM structure entirely). Whatever
  // hydration timing this originally compensated for was most likely
  // fixed as a side effect of removing the service worker earlier this
  // session; keeping a workaround for a bug that no longer reproduces was
  // pure downside.

  // Home's 4 service-preview thumbnails ("Websites", "Identidade de
  // Marca", "Criativo & Ads", "SaaS / Produto") sit in fixed-size boxes
  // and originally used object-fit:contain, which letterboxed anything
  // that wasn't already close to the box's aspect ratio — worst for the
  // portrait "Criativo & Ads" photo, reduced to a sliver in the middle of
  // a landscape box. Swapped in higher-quality source photos and
  // object-fit:cover so every box is filled edge-to-edge, scaled
  // proportionally (no stretching) with the overflow cropped. A static
  // HTML edit doesn't survive hydration for these <img> elements either
  // (React reconciles them back to Framer's own src/style), so both are
  // re-applied every repair cycle. Scoped to "/" only — the same 4
  // photos elsewhere (the /projects grid, each project's own hero image)
  // intentionally keep their original crop-free "contain" treatment and
  // are untouched.
  // Keyed by href (stable across languages), not the card's visible heading
  // text — that text is rewritten to the active language by
  // applyTranslations() elsewhere in the same repair cycle, so a
  // heading-text key silently stopped matching (and stopped re-applying
  // these cover-fit images) the moment the page wasn't in Portuguese.
  // Width/height stay in sync with the "large" file on disk so the
  // browser's own intrinsic-size aspect ratio hint stays accurate. A 900w
  // variant is offered alongside it via srcset/sizes so phones (a 358px
  // card, per the site's own mobile breakpoint below) download that
  // instead of the 1200w version desktop's 570px card needs at 2x DPR --
  // Lighthouse's mobile "oversized image" audit was flagging exactly this
  // gap. 900w, not 760w: these cards use object-fit:cover, and since every
  // source image here is wider (relative to its height) than the mobile
  // card box, cover-fit is height-constrained -- the width it actually
  // needs is cardHeight × DPR × imageAspectRatio, which comes out closer
  // to 775-790px than the card's own ~665px (width × DPR). 900w keeps
  // comfortable margin above that for every image here.
  const HOME_THUMBNAILS = {
    "/projects/websites": { src: "/assets/framerusercontent.com/images/zstudio-home-thumb-websites.webp", srcSm: "/assets/framerusercontent.com/images/zstudio-home-thumb-websites-sm.webp", w: 1200, h: 896 },
    "/projects/sistemas-de-marca-que-se-sustentam-em-qualquer-lugar": { src: "/assets/framerusercontent.com/images/zstudio-home-thumb-identidade.webp", srcSm: "/assets/framerusercontent.com/images/zstudio-home-thumb-identidade-sm.webp", w: 1200, h: 916 },
    "/projects/criativo-de-performance-que-não-parece-um-anúncio": { src: "/assets/framerusercontent.com/images/zstudio-home-thumb-criativo.webp", srcSm: "/assets/framerusercontent.com/images/zstudio-home-thumb-criativo-sm.webp", w: 662, h: 1200 },
    "/projects/produto-completo-—-landing-dashboard-e-tudo-entre-os-dois": { src: "/assets/framerusercontent.com/images/zstudio-home-thumb-saas.webp", srcSm: "/assets/framerusercontent.com/images/zstudio-home-thumb-saas-sm.webp", w: 1200, h: 974 }
  };
  function ensureHomeThumbnailsFillSquares() {
    if (window.location.pathname !== "/") return;
    document.querySelectorAll('a.framer-JqWh3[href]').forEach(a => {
      const href = (a.getAttribute("href") || "").replace(/\.$/, "");
      const target = HOME_THUMBNAILS[href];
      if (!target) return;
      const img = a.querySelector("img");
      if (!img) return;
      const desiredSrcset = target.srcSm + " 900w, " + target.src + " 1200w";
      if (!img.src.endsWith(target.src.replace(/^\//, ""))) {
        img.setAttribute("src", target.src);
        img.setAttribute("width", target.w);
        img.setAttribute("height", target.h);
      }
      if (img.getAttribute("srcset") !== desiredSrcset) {
        img.setAttribute("srcset", desiredSrcset);
        img.setAttribute("sizes", "(max-width: 809px) 358px, 570px");
      }
      if (img.style.objectFit !== "cover") img.style.objectFit = "cover";
    });
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
    // ".random-word-appear" is this one CTA text's own unique wrapper (the
    // "Começar" WhatsApp button). Framer's compiled component re-applies
    // an oversized font-size (140px desktop / 50px mobile — evidently
    // copied from the headline style) on every hydration pass, clipped by
    // the button's overflow:clip so most of the word never shows. A
    // static-HTML edit alone doesn't survive hydration here either (same
    // issue as the H1 tag below), so both the tag and the size are
    // enforced every repair cycle.
    document.querySelectorAll(".random-word-appear").forEach(wrap => {
      let el = wrap.firstElementChild;
      if (!el || !COMECAR_LABELS.has(el.getAttribute("aria-label"))) return;
      if (el.tagName === "H1") {
        const div = document.createElement("div");
        Array.from(el.attributes).forEach(a => div.setAttribute(a.name, a.value));
        div.innerHTML = el.innerHTML;
        wrap.replaceChild(div, el);
        el = div;
      }
      // Values verified directly against Framer's own untouched export of
      // this same component (the live "Asher Vale" source project this
      // site was built from) at both viewport tiers: 140px from 810px up
      // through desktop, 50px below that, with no third/fluid tier and no
      // CSS transition on the property in the source either — it's a hard
      // snap on resize, not an animated swap. An earlier guess of 90px/48px
      // here (unverified against the source) left the text visibly
      // undersized inside its correctly-sized box, and a font-size
      // transition that was added to "smooth" that guessed swap caused a
      // color-fringing text-rendering glitch on Chromium. Both are gone.
      const desktop = window.matchMedia("(min-width: 810px)").matches;
      const correctSize = desktop ? "140px" : "50px";
      if (el.style.fontSize !== correctSize) el.style.fontSize = correctSize;
    });

    document.querySelectorAll("a.framer-JqWh3 h4").forEach(h4 => {
      const h3 = document.createElement("h3");
      Array.from(h4.attributes).forEach(a => h3.setAttribute(a.name, a.value));
      h3.innerHTML = h4.innerHTML;
      h4.replaceWith(h3);
    });
  }

  // Every project-thumbnail <img> on the homepage and /projects ships with
  // the exact same generic alt text, "Mockup image" -- confirmed via a
  // direct audit of both pages' static source. The two pages don't share
  // image files (the homepage uses human-named thumb-*.webp files, the
  // full /projects grid uses Framer's hashed originals), so there's no
  // single filename pattern to key off. Every card already carries its
  // own category name as a heading right next to the image though
  // (.framer-jp00ba > ... > .framer-nkianr "Content" > h3), the same
  // approved text ("Websites", "Identidade de Marca", etc.) in both
  // places -- read that instead of hardcoding filenames, so this covers
  // both pages uniformly and nothing new is invented, only restated.
  function fixThumbnailAltText() {
    document.querySelectorAll(".framer-jp00ba").forEach(card => {
      const img = card.querySelector(".framer-8mr5mw img");
      const heading = card.querySelector(".framer-nkianr h3, .framer-nkianr h4");
      if (!img || !heading) return;
      const name = heading.textContent.trim();
      if (!name) return;
      const alt = `Mockup de projeto de ${name} da z.studio`;
      if (img.getAttribute("alt") !== alt) img.setAttribute("alt", alt);
    });
  }

  // The "Começar" CTA's own one-shot entrance animation (a Framer Motion
  // effect, triggered on scroll/mount) splits its text into one
  // <div class="char"> per LETTER ("C","o","m",...), fading every one of
  // them from opacity:0 to opacity:1 together once triggered.
  // applyTranslations()'s TreeWalker only ever matches a text NODE's full
  // trimmed content against a whole DICTIONARY key, so it can never see
  // this button's text at all -- each node it finds is a single letter,
  // never the word "Começar" -- and the button was silently stuck in
  // Portuguese through every language switch.
  //
  // Rebuilding the letter spans for the target word is unavoidable --
  // "Começar" is 7 letters, "Get started" is 11 counting the space, there
  // is no 1:1 remap -- but swapping them in WHILE Framer's own fade is
  // still mid-flight (or hasn't fired yet) throws that animation away: an
  // earlier version of this fix just forced every rebuilt letter straight
  // to opacity:1, so a visitor whose saved language is EN/ES saw the
  // button pop in instantly with no fade at all, while a PT visitor still
  // got the real animated reveal -- a visible inconsistency between
  // languages. Waiting for the ORIGINAL letters to actually finish fading
  // in first (detected via `transitionend`, so this works regardless of
  // whatever triggers Framer's reveal -- scroll, timer, or otherwise) and
  // only swapping the text once they're already fully visible means every
  // language rides the exact same unmodified animation; the word change
  // itself happens at full opacity, same as how every other translated
  // string on the page updates with a plain text swap and no fade of its
  // own.
  function fixComecarButtonTranslation() {
    const ptLabel = "Começar";
    document.querySelectorAll(".random-word-appear").forEach(wrap => {
      const textWrap = wrap.firstElementChild;
      const word = textWrap && textWrap.querySelector(".word");
      if (!word) return;

      const currentLabel = word.getAttribute("aria-label");
      if (!COMECAR_LABELS.has(currentLabel)) return;

      const target = translateText(ptLabel, getActiveLang()) || ptLabel;
      if (currentLabel !== target) {
      const chars = Array.from(word.children);
      if (chars.length === 0) return;
      const template = chars[0];

      // True to its class name, this is a RANDOM per-letter reveal, not a
      // synchronized fade -- each .char finishes independently, in no fixed
      // order (confirmed by sampling: letter index 1 settled before index
      // 0 in one run). Watching only chars[0] let the swap fire the instant
      // that ONE letter happened to finish, often while several others were
      // still mid-reveal, snapping the whole word to full visibility and
      // cutting the animation short -- visibly different from PT's full
      // random play-through. Waiting for EVERY letter to settle reproduces
      // the complete animation before the word ever changes.
      if (chars.some(c => getComputedStyle(c).opacity !== "1")) {
        if (!wrap.dataset.comecarSwapPending) {
          wrap.dataset.comecarSwapPending = "1";
          const checkAllSettled = () => {
            if (chars.every(c => getComputedStyle(c).opacity === "1")) {
              chars.forEach(c => c.removeEventListener("transitionend", checkAllSettled));
              delete wrap.dataset.comecarSwapPending;
              fixComecarButtonTranslation();
            }
          };
          chars.forEach(c => c.addEventListener("transitionend", checkAllSettled));
          // Safety net for environments where the fade never fires a
          // transitionend at all (prefers-reduced-motion, or Framer setting
          // the final opacity directly with no CSS transition) -- without
          // this, a missed event would leave comecarSwapPending set forever
          // and this button permanently stuck untranslated.
          setTimeout(() => {
            chars.forEach(c => c.removeEventListener("transitionend", checkAllSettled));
            delete wrap.dataset.comecarSwapPending;
          }, 4000);
        }
        return;
      }

      const frag = document.createDocumentFragment();
      target.split("").forEach(ch => {
        const span = template.cloneNode(false);
        span.style.opacity = "1";
        // A plain " " inside its own display:inline-block div risks being
        // collapsed away by whitespace handling; a non-breaking space
        // guarantees the gap between words still renders.
        span.textContent = ch === " " ? " " : ch;
        frag.appendChild(span);
      });

      word.innerHTML = "";
      word.appendChild(frag);
      word.setAttribute("aria-label", target);
      textWrap.setAttribute("aria-label", target);
      }

      // fixHeadingSemantics() (earlier in the same repair cycle) just
      // (re)set this box to the Framer-verified 140px/50px size -- a size
      // measured against "Começar" specifically. A longer translation ("Get
      // started" is 11 characters/includes a space, versus 7) can overflow
      // that same fixed-width box, which fixHeadingSemantics()'s own
      // comment notes is clipped by overflow:clip -- so a word that doesn't
      // fit doesn't just look slightly off, it wraps and gets cut off
      // entirely. Shrink the font just enough to fit the current word on
      // one line; for "Começar" itself wordWidth never exceeds the box, so
      // this is a no-op and the verified base size is left untouched.
      word.style.whiteSpace = "nowrap";
      const containerWidth = wrap.getBoundingClientRect().width;
      const wordWidth = word.scrollWidth;
      if (containerWidth > 0 && wordWidth > containerWidth) {
        const baseSize = parseFloat(textWrap.style.fontSize) || 140;
        textWrap.style.fontSize = Math.floor(baseSize * (containerWidth / wordWidth)) + "px";
      }
    });
  }

  // Per request, the brand name displays as "z.studio" (lowercase z)
  // everywhere. <title>/meta already read correctly (fixDocumentTitle and
  // the static HTML cover those), but the nav logo, footer, and body copy
  // come from Framer's own internal site-name data, which still renders
  // "Z.studio" on every hydration pass regardless of what the static HTML
  // says -- the same class of bug as the "Autação"/"Asher Vale" fixes
  // above. Unlike those, this needs a substring replace rather than a
  // whole-string DICTIONARY match, since "Z.studio" sits inside otherwise
  // unpredictable sentences ("criador da Z.studio.", "© 2026 - Z.studio").
  function fixBrandCasing() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        if (!node.nodeValue || node.nodeValue.indexOf("Z.studio") === -1) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName.toLowerCase();
        if (tag === "script" || tag === "style" || tag === "noscript") return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let node;
    while ((node = walker.nextNode())) {
      node.nodeValue = node.nodeValue.split("Z.studio").join("z.studio");
    }
  }

  // The "Começar" CTA section is a shared Framer component that hydrates
  // client-side onto both Home and About (it's never present in About's
  // static HTML source, only mounted by React after load) -- per request,
  // it should only ever show on Home. Removing the whole `data-framer-name
  // ="CTA"` section, not just the button inside it, is what avoids leaving
  // an empty gap: that section is a self-contained sibling in the page's
  // vertical stack of <main>, so removing it collapses the layout cleanly.
  function removeComecarCTAExceptHome() {
    if (location.pathname === "/" || location.pathname === "/index.html") return;
    document.querySelectorAll('section[data-framer-name="CTA"]').forEach(section => {
      if (section.querySelector("a.framer-GYusQ")) section.remove();
    });
  }

  // The /projects page ships its own separate, unrelated "CTA" element: a
  // floating sticky button (Framer Motion appear animation, bottom-right,
  // springs into view 2s after load) that is completely empty in the
  // static export -- no icon, text, or link ever made it into the HTML.
  // Once its entrance animation finishes, it's just a bare opaque black
  // box, fixed in place, landing on top of whatever project card happens
  // to be scrolled underneath it. There's no content to preserve, so it's
  // removed outright rather than patched.
  function removeEmptyFloatingCTA() {
    document.querySelectorAll('div[data-framer-name="CTA"]').forEach(div => {
      if (div.children.length === 0 && getComputedStyle(div).position === "fixed") {
        div.remove();
      }
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
      // The CSS below ships to every visitor inside this template literal,
      // and esbuild's minifier can't strip comments that live INSIDE a JS
      // string (unlike real // or /* */ comments in the surrounding code,
      // which it does strip) -- so every rule's rationale lives here, as
      // real JS comments outside the string, instead of inline. Confirmed
      // this was costing ~9KB (16% of the whole minified file) in comment
      // bytes that shipped to production with zero effect on rendering.
      //
      // html/body: force black background (some Framer states briefly
      // reveal the native white html/body background underneath).
      //
      // html { overflow-x: clip }: site-wide safety net against stray
      // horizontal bleed from components deliberately positioned off-screen
      // via wide centered-text boxes (.framer-qfrgms is one confirmed
      // instance) or anything else this Framer export does the same way.
      // overflow-x only, never plain overflow:hidden, so no vertical
      // scroll-reveal animation anywhere on the page is affected.
      //
      // html { transition: opacity } (+ the reduced-motion override right
      // after it): the site-wide language-switch cross-fade. setActiveLang()
      // drops <html>'s opacity to 0.4, swaps every string on the page while
      // it's dipped, then lets this transition bring it back to 1 --
      // skipped entirely in JS (not just here) for prefers-reduced-motion,
      // this CSS-level guard is just a second safety net in case opacity
      // is ever toggled some other way.
      //
      // #template-overlay / #__framer-badge-container / .__framer-badge:
      // hide the Framer branding badge and template-editor overlay.
      //
      // #zstudio-contact-wa-card: hide the injected WhatsApp contact card
      // if it ever renders outside of its intended place.
      //
      // .framer-1j95pa0 / [data-framer-name="Time"]: hide Framer's own
      // overlapping "Time" nav element (replaced by our injected
      // location+switcher group below).
      //
      // .framer-1o5g5u1: the navbar's own flex row container.
      //
      // .zstudio-nav-right: our injected container holding the location
      // text and language switcher side-by-side.
      //
      // .zstudio-nav-cta-group: wraps the CTA pill + our injected
      // location/switcher as a single flex item, so the navbar row
      // (.framer-1o5g5u1, which distributes its DIRECT children with
      // justify-content: space-between) still only sees the original
      // number of top-level children. Appending rightGroup as a bare extra
      // sibling there added a 4th child and visibly skewed/uncentered the
      // whole header row.
      //
      // .framer-9nc42h: "Entre em contato agora" must sit centered on the
      // header's own width, not next to "São Paulo, SP" (it only ended up
      // beside it because both share .zstudio-nav-cta-group, so the
      // original 3-child space-between math on .framer-1o5g5u1 wasn't
      // disturbed). Taking it out of that flex flow with absolute +
      // left:50% centers it against the header container's actual width at
      // any viewport, instead of whatever the flex distribution happened
      // to produce. .framer-1o5g5u1 is already position:relative.
      //
      // .zstudio-nav-location: styling for the injected location text.
      //
      // html/body (2nd rule): same black-background enforcement, plus
      // overscroll-behavior-y:none for the Lenis rubber-band fix below.
      //
      // html / #main / .framer-1kfxmrd-container / .framer-bsobv0-container
      // / .framer-15zqc7h / .framer-jg6vfd / .framer-9vBJm / .framer-evEMj /
      // .framer-16znbqb-container / .framer-syrbsj-container / #overlay /
      // #template-overlay (2nd rule): the bottom white bands come from
      // Lenis (framer-1kfxmrd-container and framer-bsobv0-container, two
      // separate "Lenis・Smooth Scroll" component instances on this page)
      // rubber-banding past the end of its virtual scroll content on touch
      // devices, which briefly exposes the native <html>/<body> background
      // beneath. overscroll-behavior-y stops the bounce; these
      // background-color rules cover the gap in case a browser ignores it
      // (older Safari).
      //
      // #zstudio-form-feedback / .zstudio-field-error: contact form
      // feedback and validation-error styling.
      //
      // .framer-14o4nkg: project card titles ("Websites", "SaaS /
      // Produto", etc.) sit in a fixed-height box (framer-nkianr,
      // data-framer-name="Content") whose text is a couple of px taller
      // than the box, clipping descenders ("p" in "Produto"). Growing
      // framer-nkianr alone doesn't fix it: its own parent card
      // (.framer-jp00ba, height:100%) ALSO clips with overflow:clip at a
      // fixed height bound to the card/grid cell, so extra height on the
      // inner box still gets cut off one level up. Instead, nudge the text
      // itself up a few px so its descender clears the existing clip
      // boundary, without changing any box's height.
      //
      // [data-framer-name="Backdrop"] (+ img): project photos
      // (mockup/cover images bound from the CMS, rendered client-side into
      // Backdrop layers) must be shown in full, never cropped. Framer's
      // default "Backdrop" fill uses cover/crop sizing; force it to fit the
      // whole image inside its frame instead.
      //
      // img[src*="thumb-websites"]: same "never crop a mockup" principle,
      // extended to a spot that principle didn't yet cover -- the home
      // page's "Websites" service-category card uses a different structure
      // (.framer-jp00ba, not a Backdrop layer), and its object-fit:cover
      // was cropping away the ENTIRE top nav bar and bottom footer of the
      // actual website screenshot it displays, leaving only the middle
      // section visible (confirmed by directly comparing cover vs contain
      // screenshots -- contain reveals "Casa Serena" branding, full nav
      // links, and the site's footer, none of which render at all under
      // cover). Scoped to this one image specifically (by its filename, not
      // a blanket rule on every card) since the other 3 category cards show
      // photography/3D renders rather than screenshots with their own UI
      // chrome, where a full-bleed cover crop is more likely the intended
      // look, not an unwanted crop -- no complaint was raised about those.
      //
      // @media(max-width:809.98px) .framer-nlgv0n: below the mobile
      // breakpoint, the home page's service-category grid switches from a
      // 2-column CSS grid (gap:20px, reasonable, left untouched) to a
      // single-column flex stack (Framer's own rule:
      // .framer-yWNUb .framer-nlgv0n{...gap:22px...}) -- and each card's
      // title sits in its own fixed-height box with only 3px of vertical
      // padding, so with just 22px between stacked cards, a title ends up
      // sitting almost flush against the next card's image, reported as
      // everything feeling crammed together. Widened to 48px, mobile only
      // -- the desktop grid already looked properly spaced and wasn't
      // part of the complaint.
      //
      // .zstudio-more-projects-cta: simplified "Mais projetos" block, just
      // the centered CTA link.
      //
      // .zstudio-more-projects-cta > a: the link itself was moved here out
      // of a "-container" wrapper (see simplifyMoreProjectsSection) that
      // supplied its real sizing as a percentage of the original "Mais
      // projetos" grid cell -- on the mobile breakpoint specifically, that
      // percentage resolved to something close to the full viewport width,
      // so without that wrapper the relocated button rendered edge-to-edge
      // instead of as the compact pill it is everywhere else on the site.
      // Forcing it back to its own content size here is what the pill
      // actually looks like at every other breakpoint.
      //
      // .framer-4ct5ei / .zstudio-social-link: the footer's empty "Right"
      // column (see injectSocialLinks()) laid out as a row with spacing,
      // and the injected LinkedIn/Instagram icons styled to match the
      // footer's existing muted-white link color, brightening on hover --
      // the same treatment as the rest of this B&W site's link states.
      //
      // @media (max-width:600px): shrink the nav location/switcher further
      // on small phones.
      //
      // @media (max-width:400px) .zstudio-nav-location: .framer-1o5g5u1 is
      // flex-flow:row with no wrap, so below ~280-300px (reachable via real
      // browser zoom well short of the 500% this was tested against, not
      // just exotic viewport widths) "z.studio" and "São Paulo, SP" run out
      // of room and visibly collide -- confirmed by screenshot: still a
      // hairline gap at 300px, fully merged into one run of text by 265px.
      // The location string is a nice-to-have, not load-bearing, so it's
      // the one that gives way; the language switcher (the thing people
      // actually use) keeps its space.
      //
      // .framer-qfrgms { overflow-x: clip }: defense in depth. Framer's own
      // .framer-qfrgms (the Hero section's direct content wrapper) sets
      // overflow:visible, and #hero's own <h1> reports two DOM copies near
      // the 810px breakpoint (the ticker component's own seamless-loop
      // duplicate -- see the gap rule below for the real mechanism and
      // root-cause fix). Clipping horizontally only (never overflow:hidden
      // outright) means nothing in this section can ever bleed past its own
      // box, without touching whatever vertical bleed its scroll-reveal
      // entrance animations rely on.
      //
      // The Hero headline's continuous horizontal drift (a Framer "Ticker"
      // component) is NOT frozen -- an earlier version of this stylesheet
      // forced its <ul> transform to a fixed translateX(0), killing the
      // motion entirely. That drift is this site's own design, part of the
      // portfolio's visual identity, and was never reported as broken on
      // its own; it was found as a side effect while investigating an
      // unrelated zoom/overflow bug, and a single screenshot catching it
      // mid-scroll (the tail of one loop pass and the head of the next both
      // partially visible, with a gap between them) is the normal, expected
      // look of ANY continuously-scrolling marquee paused at an arbitrary
      // instant -- not evidence it's stuck or malfunctioning. Re-verify
      // with live sampling before ever reaching for a freeze here again:
      // this component's <ul> transform moving at a constant rate with no
      // deceleration is exactly what a correctly-functioning infinite
      // marquee looks like, not proof of a bug.
      //
      // .framer-1v4qmj0 > ul { gap: 90% }: the actual, measurable defect in
      // that same component: its <ul> (class-less, targeted via its parent
      // .framer-1v4qmj0) has gap:10px between the real item and Framer's
      // own runtime-added duplicate (for seamless looping), but each item
      // is nearly as wide as its own clip window (measured equal at some
      // breakpoints). Sampled over a full ~19s cycle at 1440px: only 13 of
      // 92 frames (14%) showed one clean instance of the headline -- the
      // other 86% showed both the outgoing and incoming copies
      // simultaneously, which reads as broken/colliding text, not a
      // deliberate design choice. A fixed px gap can't fix this across
      // breakpoints (item width varies with viewport), but a percentage gap
      // is resolved against the ul's own content-box width, which already
      // tracks the item's width closely at every breakpoint. Swept
      // empirically from 20% up (each value re-measured the same way):
      // 20%=72% overlap, 50%=40%, 75%=11%, 90%=0%, confirmed 0% again at
      // 100%. 90% is the tightest value with zero measured overlap at
      // 390px/1440px/the 812px breakpoint zone -- a full cycle (one reading
      // pass + the empty gap) takes ~11s instead of ~33s at 100%, visibly
      // faster and less "dead" without reintroducing any collision. The
      // drift itself (Framer's own JS, untouched here) keeps running
      // exactly as designed.
      //
      // html[data-zstudio-hero-force-visible] .framer-1v4qmj0 > ul: even
      // with the gap fixed, the drift is still continuous and starts from
      // wherever Framer's own animation happens to be in its cycle at
      // mount -- meaning the headline's actual on-screen visibility at the
      // moment a fresh page finishes loading isn't guaranteed, confirmed
      // directly: repeated loads sometimes showed it immediately, sometimes
      // showed nothing for the first stretch of the cycle. Reported
      // directly as the most important content on the page being too slow
      // to appear. See ensureHeroVisibleOnLoad() for the one-time,
      // load-only fix this rule backs: force it on screen for the first
      // 400ms via this toggleable attribute, then remove it and let
      // Framer's own continuous drift carry on from there.
      //
      // Known trade-off, deliberately accepted rather than engineered
      // around: Framer keeps a logical/internal clock running the whole
      // time this override is masking the drift visually, so lifting the
      // override can make the transform jump noticeably (not a small
      // correction -- measured in the hundreds to low thousands of px,
      // regardless of how short this window is) rather than continuing
      // smoothly from 0. Tried and abandoned two fixes for that jump: a
      // matching CSS transition on release (Framer's own per-frame updates
      // to the same property fight a transition instead of composing with
      // it) and masking it behind a brief opacity dip, the same trick as
      // the language-switch cross-fade elsewhere in this file (the jump
      // kept landing outside the dip's actual
      // opacity-zero window in practice, not reliably hidden). Given the
      // actual complaint was specifically "not visible soon enough," not
      // "the drift isn't perfectly continuous," shipping the guaranteed
      // -visible fix with this occasional secondary jump is a better
      // outcome than not shipping it while chasing a fully seamless
      // handoff against an animation whose internal timing isn't directly
      // observable.
      //
      // .framer-1o5g5u1 / .framer-qfrgms / .framer-7hqcq2 / .framer-2wscqo /
      // .framer-120ggkx / .framer-1lpniya / .framer-dgarai / .framer-rsqvqi
      // { max-width: 1800px }: every major section on this site (nav, hero,
      // and the rest of each page's content "Container" wrappers) shares
      // one consistent design token: max-width:1200px, centered. At normal
      // zoom that's a design choice (cap line length on wide monitors); at
      // a zoomed-OUT browser -- which *increases* the effective CSS-pixel
      // viewport, the opposite of zooming in -- that same 1200px cap leaves
      // a visibly huge, unfilled black margin on both sides (reported
      // directly, screenshot at 75% zoom on a ~1900px-wide window: the hero
      // headline sat in a 1200px column with hundreds of empty px to either
      // side). Widening the cap to 1800px keeps every width at or below
      // that completely unaffected -- it only ever changes what renders
      // beyond 1800px of effective viewport, i.e. exactly the zoomed-out/
      // ultrawide case this was reported from -- while still capping line
      // length at some point rather than letting text stretch edge-to-edge
      // on a 4K display. .framer-aamhva (the "Projects"/"Serviços" section's
      // own container) was missing from this list originally -- the audit
      // that built it only matched simple single-class selectors
      // (`.framer-x{...max-width:1200px...}`), and this one is only ever
      // set via a compound, breakpoint-scoped selector
      // (`.framer-yWNUb .framer-aamhva,.framer-yWNUb .framer-7hqcq2{...}`),
      // so it silently stayed capped at 1200px while everything around it
      // widened to 1800px -- reported as that section looking stuck in a
      // corner relative to its now-wider neighbors. Re-swept every page
      // with a selector-aware (not just single-class) search before adding
      // it here, to catch anything else with the same compound-selector
      // blind spot; nothing else turned up.
      //
      // .framer-1i5g30s:hover/:focus-visible -> .framer-8mr5mw /
      // .framer-1dcru56 / .framer-1yue9qt: every project card ships a
      // built-in hover reveal authored in Framer itself -- a round "Arrow"
      // button (.framer-1dcru56) sitting at opacity:0, meant to fade in
      // over the thumbnail on hover. Confirmed dead in production: sampling
      // computed style before and after a simulated pointer hover showed
      // zero change to the arrow's opacity or the image wrapper's
      // transform/filter -- Framer's own hover-variant runtime isn't firing
      // for this component. Re-implemented in plain CSS instead of chasing
      // why that runtime doesn't fire, consistent with this file's general
      // approach of not depending on Framer's own JS where a CSS override
      // can stand on its own. .framer-1i5g30s is the card's own anchor
      // element (confirmed present on all 8 card instances across both the
      // homepage preview grid and the full /projects grid), so :hover and
      // :focus-visible on it reach the thumbnail/arrow children directly
      // without needing a :has() parent selector. Scale/brightness kept
      // subtle (1.04x) and within the 180-350ms hover-transition range;
      // :focus-visible (not :focus) means mouse/touch activation doesn't
      // trigger it, only real keyboard focus does. (hover:none) touch
      // devices get the arrow at a permanent low-opacity resting state
      // instead of a hover reveal, since there's no hover to trigger it
      // there and the card is a direct link anyway.
      //
      // a/button/[role=button]/input/textarea/select:focus-visible: this
      // export ships a global `outline: none` reset (visible on any `a` in
      // the page source) with nothing replacing it, so keyboard users had
      // zero focus indicator anywhere on the site. :focus-visible (not
      // :focus) so the existing mouse/touch-driven visual design is
      // completely unaffected -- the ring only ever appears for real
      // keyboard tabbing.
      //
      // .framer-qfrgms { animation: zstudio-hero-entrance }: the hero
      // previously had no load-time entrance at all -- it was simply
      // present, fully formed, the instant the page painted, while the
      // headline itself is a continuously-drifting ticker that (per
      // ensureHeroVisibleOnLoad()'s own notes) isn't guaranteed to be
      // on-screen at that exact instant. A baseline screenshot taken
      // ~1s after load during this work showed the hero essentially
      // empty for that reason. This animates the whole Hero Container
      // (not the ticker's own transform, which Framer's JS drives on its
      // own clock -- animating a DIFFERENT property on a DIFFERENT
      // element avoids the force-visible mechanism's already-documented
      // conflict) with a simple fade/rise on first paint, independent of
      // wherever the ticker's internal cycle happens to be.
      //
      // .zstudio-hero-eyebrow / .zstudio-hero-index: small decorative
      // "( Estúdio Digital )" / "[ 01 ]" accents, aria-hidden since the
      // H1 already carries the real content. Absolutely positioned
      // inside .framer-qfrgms (already position:relative) rather than
      // inserted into its flex flow, which is exactly 2 children laid
      // out with a fixed 200px gap -- adding a 3rd flex child would
      // shift that math the same way an earlier nav-row fix documented.
      // Hidden below 810px: the mobile Hero Container drops to
      // height:min-content with a much tighter gap, and there's no safe
      // room to float decorative text over it without risking overlap.
      //
      // .zstudio-reveal / .zstudio-reveal-visible: the fade/rise state
      // pair for the scroll-triggered reveal system (see
      // initScrollReveal()) applied to the Projects/About/CTA sections
      // and each project card.
      //
      // nav { border-bottom: ... transparent } / .zstudio-nav-scrolled:
      // the header had zero visual separation from page content it sits
      // above once scrolled -- a transparent border that only gets a
      // visible color after initNavScrollState() detects real scroll
      // keeps the top-of-page look identical while giving the header a
      // sense of sitting above the content once there's something under
      // it to separate from.
      //
      // .framer-nlgv0n { grid-template-columns: 1.25fr 1fr } (>=810px
      // only): the 4 project cards were an exactly even 2x2 grid --
      // confirmed via the shared max-width/gap rules already in this
      // file. A uniform ratio shift (left column cards larger than right
      // column) breaks that uniformity into a deliberate asymmetry
      // without depending on which of the two dual-SSR-variant nodes per
      // card happens to be the visible one (nth-child-based per-card
      // spanning would've needed to know that order; a column-ratio
      // change doesn't care which variant is showing). Left untouched
      // below 810px, where the grid already collapses to a single
      // column's worth of stacked full-width cards per the mobile gap
      // fix elsewhere in this file.
      style.textContent = `
        html, body {
          background: #000000 !important;
          background-color: #000000 !important;
        }
        html {
          overflow-x: clip !important;
        }
        html {
          transition: opacity 0.18s ease !important;
        }
        @media (prefers-reduced-motion: reduce) {
          html {
            transition: none !important;
          }
        }
        #template-overlay, #__framer-badge-container, .__framer-badge {
          display: none !important;
        }
        #zstudio-contact-wa-card {
          display: none !important;
        }
        .framer-1j95pa0,
        [data-framer-name="Time"] {
          display: none !important;
        }
        .framer-1o5g5u1 {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          width: 100% !important;
          position: relative !important;
        }
        .zstudio-nav-right {
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 14px !important;
          flex-shrink: 0 !important;
          position: relative !important;
          z-index: 50 !important;
        }
        .zstudio-nav-cta-group {
          display: inline-flex !important;
          align-items: center !important;
          gap: 14px !important;
          flex-shrink: 0 !important;
        }
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
        html, body {
          background-color: #000000 !important;
          background: #000000 !important;
          overscroll-behavior-y: none !important;
        }
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
        .framer-14o4nkg {
          line-height: 1.15 !important;
          transform: translateY(-3px) !important;
        }
        [data-framer-name="Backdrop"] {
          background-size: contain !important;
          background-repeat: no-repeat !important;
          background-position: center !important;
        }
        [data-framer-name="Backdrop"] img {
          object-fit: contain !important;
        }
        img[src*="thumb-websites"] {
          object-fit: contain !important;
        }
        @media (max-width: 809.98px) {
          .framer-nlgv0n {
            gap: 48px !important;
          }
        }
        .zstudio-more-projects-cta {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
          padding: 32px 0 !important;
        }
        .zstudio-more-projects-cta > a {
          width: fit-content !important;
          flex: none !important;
        }
        .framer-4ct5ei {
          display: flex !important;
          align-items: center !important;
          gap: 16px !important;
        }
        .zstudio-social-link {
          color: rgba(255, 255, 255, 0.6) !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 18px !important;
          height: 18px !important;
          flex-shrink: 0 !important;
          transition: color 0.2s ease !important;
        }
        .zstudio-social-link svg {
          width: 100% !important;
          height: 100% !important;
        }
        .zstudio-social-link:hover {
          color: #ffffff !important;
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
        @media (max-width: 400px) {
          .zstudio-nav-location {
            display: none !important;
          }
        }
        .framer-qfrgms {
          overflow-x: clip !important;
        }
        .framer-1v4qmj0 > ul {
          gap: 90% !important;
        }
        html[data-zstudio-hero-force-visible] .framer-1v4qmj0 > ul {
          opacity: 1 !important;
          transform: translateX(0px) !important;
        }
        .framer-1o5g5u1,
        .framer-qfrgms,
        .framer-7hqcq2,
        .framer-2wscqo,
        .framer-120ggkx,
        .framer-1lpniya,
        .framer-dgarai,
        .framer-rsqvqi,
        .framer-aamhva {
          max-width: 1800px !important;
        }
        .framer-8mr5mw {
          transition: transform 280ms ease, filter 280ms ease !important;
        }
        .framer-1yue9qt {
          transition: opacity 280ms ease !important;
        }
        .framer-1dcru56 {
          transition: opacity 220ms ease !important;
        }
        .framer-1i5g30s:hover .framer-8mr5mw,
        .framer-1i5g30s:focus-visible .framer-8mr5mw {
          transform: scale(1.04) !important;
          filter: brightness(1.04) !important;
        }
        .framer-1i5g30s:hover .framer-1dcru56,
        .framer-1i5g30s:focus-visible .framer-1dcru56 {
          opacity: 1 !important;
        }
        @media (hover: none) {
          .framer-1dcru56 {
            opacity: 0.55 !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .framer-8mr5mw,
          .framer-1yue9qt,
          .framer-1dcru56 {
            transition: none !important;
          }
        }
        a:focus-visible,
        button:focus-visible,
        [role="button"]:focus-visible,
        input:focus-visible,
        textarea:focus-visible,
        select:focus-visible {
          outline: 2px solid #ffffff !important;
          outline-offset: 3px !important;
        }
        .framer-qfrgms {
          animation: zstudio-hero-entrance 900ms cubic-bezier(0.16, 1, 0.3, 1) both !important;
        }
        @keyframes zstudio-hero-entrance {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .zstudio-hero-eyebrow {
          position: absolute !important;
          top: 48px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          font-size: 12px !important;
          font-weight: 500 !important;
          letter-spacing: 0.14em !important;
          text-transform: uppercase !important;
          color: rgba(255, 255, 255, 0.5) !important;
          white-space: nowrap !important;
          z-index: 2 !important;
        }
        .zstudio-hero-index {
          position: absolute !important;
          top: 48px !important;
          right: 20px !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          font-size: 12px !important;
          font-weight: 500 !important;
          letter-spacing: 0.08em !important;
          color: rgba(255, 255, 255, 0.4) !important;
          z-index: 2 !important;
        }
        @media (max-width: 809.98px) {
          .zstudio-hero-eyebrow,
          .zstudio-hero-index {
            display: none !important;
          }
        }
        .zstudio-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .zstudio-reveal-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        nav {
          transition: border-color 300ms ease, box-shadow 300ms ease !important;
          border-bottom: 1px solid transparent !important;
        }
        nav.zstudio-nav-scrolled {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        @media (min-width: 810px) {
          .framer-nlgv0n {
            grid-template-columns: 1.25fr 1fr !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .framer-qfrgms {
            animation: none !important;
          }
          .zstudio-reveal {
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
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
    },
    sendingEmail: {
      en: "Opening your email client...",
      es: "Abriendo tu cliente de correo..."
    },
    // International (EN/ES) visitors don't use WhatsApp -- this is the
    // thank-you state shown after their mail client opens, per the
    // explicit requested copy ("We reply to all inquiries within 12 hours
    // via email or LinkedIn").
    thankYou: {
      en: "Thanks for reaching out! We reply to all inquiries within 12 hours via email or LinkedIn.",
      es: "¡Gracias por contactarnos! Respondemos todas las consultas dentro de 12 horas por correo o LinkedIn."
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
      waMessage = `Hello! My name is ${nameVal}.\nI would like to discuss a project with z.studio.\n\n• Email: ${emailVal}\n• Investment range: ${budgetDisplay}\n• Message:\n${msgVal}`;
    } else if (lang === "es") {
      waMessage = `¡Hola! Mi nombre es ${nameVal}.\nMe gustaría hablar sobre un proyecto con z.studio.\n\n• Correo electrónico: ${emailVal}\n• Rango de inversión: ${budgetDisplay}\n• Mensaje:\n${msgVal}`;
    } else {
      waMessage = `Olá! Meu nome é ${nameVal}.\nGostaria de conversar sobre um projeto com a z.studio.\n\n• E-mail: ${emailVal}\n• Faixa de investimento: ${budgetDisplay}\n• Mensagem:\n${msgVal}`;
    }

    // International (EN/ES) visitors don't use WhatsApp -- mailto instead,
    // opening the visitor's own email client with the same information
    // that would otherwise have gone to WhatsApp, ending on the explicit
    // thank-you copy requested rather than a second WhatsApp-specific
    // message. PT is completely unchanged below.
    if (lang === "en" || lang === "es") {
      const subject = lang === "en" ? "New project inquiry from z.studio" : "Nueva consulta de proyecto de z.studio";
      const mailtoUrl = `mailto:hello@z.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(waMessage)}`;

      feedback.innerHTML = '<span style="color:#22c55e;font-size:13px;font-weight:500;display:inline-block;">' + FORM_I18N.sendingEmail[lang] + '</span>';

      const mailLink = document.createElement("a");
      mailLink.href = mailtoUrl;
      document.body.appendChild(mailLink);
      mailLink.click();

      setTimeout(() => {
        mailLink.remove();
        feedback.innerHTML = '<span style="color:#22c55e;font-size:13px;font-weight:500;display:inline-block;">' + FORM_I18N.thankYou[lang] + '</span>';
      }, 400);
      return;
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

      // Framer's form widget renders these fields with no <label> and no
      // aria-label, relying solely on their placeholder text -- which
      // disappears the moment a screen reader user starts typing, failing
      // WCAG 4.1.2 (Name, Role, Value). The honeypot anti-spam fields
      // alongside them (website/company/message/subject/etc, all
      // tabindex="-1" aria-hidden="true") are correctly already excluded
      // from the accessibility tree and are left untouched here.
      const fieldLabels = {
        "Nome completo": "Nome completo",
        "Email": "Email",
        "Location": "Orçamento",
        "Mensagem": "Mensagem",
      };
      Object.keys(fieldLabels).forEach(name => {
        const field = form.querySelector(`[name="${name}"]`);
        if (field && !field.getAttribute("aria-label")) {
          field.setAttribute("aria-label", fieldLabels[name]);
        }
      });

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
    triggerElevacao();
    removeLocationAndTime();
    cleanupStructuralDuplicates();
    simplifyMoreProjectsSection();
    canonicalizeInternalLinks();
    removeSelfReferencingProjectCards();
    ensureWebsitesProjectCard();
    ensureHomeThumbnailsFillSquares();
    fixHeadingSemantics();
    fixThumbnailAltText();
    fixBrandCasing();
    removeComecarCTAExceptHome();
    removeEmptyFloatingCTA();
    injectLanguageSwitcher();
    applyTranslations();
    fixComecarButtonTranslation();
    updateWhatsAppLinks();
    removeSocialLinks();
    injectSocialLinks();
    injectContactWhatsAppCard();
    initContactForm();
    ensureHeroVisibleOnLoad();
    injectHeroEditorialAccents();
    initScrollReveal();
    initNavScrollState();

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
        triggerElevacao();
        removeLocationAndTime();
        cleanupStructuralDuplicates();
        simplifyMoreProjectsSection();
        canonicalizeInternalLinks();
        removeSelfReferencingProjectCards();
        ensureWebsitesProjectCard();
        ensureHomeThumbnailsFillSquares();
        fixHeadingSemantics();
        fixThumbnailAltText();
        fixBrandCasing();
        removeComecarCTAExceptHome();
        removeEmptyFloatingCTA();
        injectLanguageSwitcher();
        applyTranslations();
        fixComecarButtonTranslation();
        updateWhatsAppLinks();
        removeSocialLinks();
        injectSocialLinks();
        injectContactWhatsAppCard();
        initContactForm();
        injectHeroEditorialAccents();
        initScrollReveal();
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
