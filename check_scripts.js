const fs = require("fs");
const path = require("path");

const htmlFiles = [
  "public/index.html",
  "public/about/index.html",
  "public/contact/index.html",
  "public/projects/index.html",
  "public/projects/websites/index.html",
  "public/projects/produto-completo-—-landing-dashboard-e-tudo-entre-os-dois/index.html",
  "public/projects/criativo-de-performance-que-não-parece-um-anúncio/index.html",
  "public/projects/sistemas-de-marca-que-se-sustentam-em-qualquer-lugar/index.html"
];

for (const file of htmlFiles) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, "utf8");
  
  // Extract scripts
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let scriptIndex = 0;
  while ((match = scriptRegex.exec(content)) !== null) {
    scriptIndex++;
    const scriptContent = match[1];
    const scriptTag = match[0].split(">")[0] + ">";
    
    // Check if it has type="application/json" or "framer/appear" etc.
    if (scriptTag.includes("json") || scriptTag.includes("framer/appear") || scriptTag.includes("framer/search")) {
      try {
        JSON.parse(scriptContent.trim());
      } catch (err) {
        console.log(`JSON error in ${file} script #${scriptIndex} (${scriptTag}): ${err.message}`);
        // Find line / context
        console.log("Snippet around error:", scriptContent.slice(0, 300));
      }
      continue;
    }

    if (!scriptContent.trim()) continue;

    try {
      new Function(scriptContent);
    } catch (err) {
      console.log(`JS error in ${file} script #${scriptIndex} (${scriptTag}): ${err.message}`);
      console.log(scriptContent.slice(0, 500));
    }
  }
}
