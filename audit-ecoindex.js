import * as puppeteer from "puppeteer";
import {
  computeEcoIndex,
  getEcoIndexGrade,
  computeGreenhouseGasesEmissionfromEcoIndex,
  computeWaterConsumptionfromEcoIndex
} from "ecoindex";

(async () => {
  const url = "http://localhost:3000";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let requestCount = 0;
  let totalBytes = 0;

  page.on("request", req => {
    if (!req.url().startsWith("data:")) requestCount++;
  });

  page.on("response", async res => {
    try {
      const buffer = await res.buffer();
      totalBytes += buffer.length;
    } catch {}
  });

  await page.goto(url, { waitUntil: "networkidle0" });

  const domNodes = await page.evaluate(
    () => document.getElementsByTagName("*").length
  );

  await browser.close();

  const totalKB = totalBytes / 1024;

  const ecoIndexScore = computeEcoIndex(domNodes, requestCount, totalKB);
  const grade = getEcoIndexGrade(ecoIndexScore);
  const ghg = computeGreenhouseGasesEmissionfromEcoIndex(ecoIndexScore);
  const water = computeWaterConsumptionfromEcoIndex(ecoIndexScore);

  console.log(`
🌍 URL analysée : ${url}

📊 Métriques techniques :
- DOM nodes           : ${domNodes}
- Requêtes réseau     : ${requestCount}
- Poids total         : ${Math.round(totalKB)} Ko

🌱 Empreinte estimée par visite :
- EcoIndex            : ${ecoIndexScore.toFixed(2)} / 100
- Note                : ${grade} (A = très bon, G = très mauvais)
- Émissions CO₂       : ${ghg} g CO₂e
- Eau consommée       : ${water} cl
`);
})();