const puppeteer = require('puppeteer');

const url = "https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops";


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log('Página iniciada com sucesso!!');

    // navegando na página selecionada
    await page.goto(url);
    console.log(`Fui para ${url}...`)

  
    // Make sure the book to be scraped is in stock
    const resultadoTitulo = 'div.caption > h4 > a';
    const resultadoDescricao = 'div > div > div.caption > p';
    const resultadoPreco = 'div.caption > h4.pull-right.price';
    const resultadoAvaliacao = 'div.ratings > p.pull-right';
    
    
    // Espera o DOM necessário ser renderizado
    await page.waitForSelector(resultadoTitulo);
    await page.waitForSelector(resultadoDescricao);
    await page.waitForSelector(resultadoPreco);
    await page.waitForSelector(resultadoAvaliacao);
  
    

  // Extrai o resultado das páginas.
  const produtos = await page.evaluate(resultadoTitulo => {
    return [...document.querySelectorAll(resultadoTitulo)].map(links => {
      const buscas = links.textContent.split('\n');
      return buscas;
    });

    
  },[resultadoTitulo,resultadoAvaliacao,resultadoPreco,resultadoDescricao]);


// Printa o resuldado da busca
console.log(produtos)
await browser.close(); 
})();

//Para rodar basta utilizar o comando: node index.js