interface NewsArticle {
  title: string;
  url: string;
  
}

interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
}

interface ArXivArticle {
  title: string | null;
  authors: (string | null)[];
  link: string | null;
 
}

const newsApiKey = 'd5acfa9ebfdd404a8f97d0a06b9fbbd2'; 
const weatherApiKey = 'f5a6b1cd21d1c24ac87a09234c8344b9';
const cityLatitude = -14.788; // Latitude de Ilhéus
const cityLongitude = -39.050; // Longitude de Ilhéus

async function getNews(): Promise<NewsArticle[]> {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=br&apiKey=${newsApiKey}`);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Erro ao obter notícias:', error);
    return [];
  }
}

async function getWeather(): Promise<WeatherData | null> {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityLatitude}&lon=${cityLongitude}&appid=${weatherApiKey}&units=metric`);
    if (!response.ok) {
      throw new Error('Dados meteorológicos não encontrados');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao obter dados meteorológicos:', error);
    return null;
  }
}

async function getArXivData(): Promise<ArXivArticle[]> {
  const query = 'all'; 

  try {
    const response = await fetch(`http://export.arxiv.org/api/query?search_query=${query}&start=0&max_results=10`);
    const textData = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(textData, 'text/xml');
    const entries = xmlDoc.getElementsByTagName('entry');

    const articles: ArXivArticle[] = [];

    for (let i = 0; i < entries.length; i++) {
      const title = entries[i].getElementsByTagName('title')[0].textContent;
      const authors = Array.from(entries[i].getElementsByTagName('author')).map(author => author.getElementsByTagName('name')[0].textContent);
      const link = entries[i].getElementsByTagName('id')[0].textContent;

      articles.push({ title, authors, link });
    }

    return articles;
  } catch (error) {
    console.error('Erro ao obter dados do arXiv:', error);
    return [];
  }
}

async function displayNews() {
  const newsContainer = document.getElementById('quadro-noticias');

  if (newsContainer) {
    const news: NewsArticle[] = await getNews();

    let newsHTML = '<h2>Últimas Notícias</h2><ul>';
    news.forEach((article: NewsArticle) => {
      const { title, url } = article;
      newsHTML += `<li><a href="${url}" target="_blank">${title}</a></li>`;
    });
    newsHTML += '</ul>';

    newsContainer.innerHTML = newsHTML;
  } else {
    console.error('Contêiner de notícias não encontrado.');
  }
}

async function displayWeather() {
  const weatherContainer = document.getElementById('quadro-servicos');

  if (weatherContainer) {
    const weatherData: WeatherData | null = await getWeather();

    if (weatherData) {
      const temperature = weatherData.main.temp;
      const weatherMain = weatherData.weather[0].main;
      const weatherDescription = weatherData.weather[0].description;

      const weatherHTML = `
        <h2>Previsão do Tempo em Ilhéus, Bahia, Brasil</h2>
        <p><strong>Temperatura:</strong> ${temperature}°C</p>
        <p><strong>Condição:</strong> ${weatherMain}</p>
        <p><strong>Descrição:</strong> ${weatherDescription}</p>
      `;

      weatherContainer.innerHTML = weatherHTML;
    } else {
      weatherContainer.innerHTML = '<p>Dados meteorológicos não disponíveis.</p>';
    }
  } else {
    console.error('Contêiner do clima não encontrado.');
  }
}

async function displayArXivData() {
  const arXivContainer = document.getElementById('quadro-resultados');

  if (arXivContainer) {
    const arXivData: ArXivArticle[] = await getArXivData();

    let arXivHTML = '<h2>Artigos do arXiv</h2><ul>';
    arXivData.forEach((article: ArXivArticle) => {
      arXivHTML += `
        <li>
          <strong>Título:</strong> ${article.title}<br>
          <strong>Autores:</strong> ${article.authors.join(', ')}<br>
          <a href="${article.link}" target="_blank">Link</a>
        </li>
      `;
    });
    arXivHTML += '</ul>';

    arXivContainer.innerHTML = arXivHTML;
  } else {
    console.error('Contêiner de dados do arXiv não encontrado.');
  }
}

// Funções para exibir os dados ao carregar a página
window.onload = () => {
  displayNews();
  displayWeather();
  displayArXivData();
};
