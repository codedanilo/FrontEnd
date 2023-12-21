var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var newsApiKey = 'd5acfa9ebfdd404a8f97d0a06b9fbbd2'; // Substitua pela sua chave da News API
var weatherApiKey = 'f5a6b1cd21d1c24ac87a09234c8344b9'; // Substitua pela sua chave da API do OpenWeatherMap
var cityLatitude = -14.788; // Latitude de Ilhéus
var cityLongitude = -39.050; // Longitude de Ilhéus
function getNews() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://newsapi.org/v2/top-headlines?country=br&apiKey=".concat(newsApiKey))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.articles];
                case 3:
                    error_1 = _a.sent();
                    console.error('Erro ao obter notícias:', error_1);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getWeather() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://api.openweathermap.org/data/2.5/weather?lat=".concat(cityLatitude, "&lon=").concat(cityLongitude, "&appid=").concat(weatherApiKey, "&units=metric"))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Dados meteorológicos não encontrados');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    error_2 = _a.sent();
                    console.error('Erro ao obter dados meteorológicos:', error_2);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getArXivData() {
    return __awaiter(this, void 0, void 0, function () {
        var query, response, textData, parser, xmlDoc, entries, articles, i, title, authors, link, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = 'all';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("http://export.arxiv.org/api/query?search_query=".concat(query, "&start=0&max_results=10"))];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.text()];
                case 3:
                    textData = _a.sent();
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(textData, 'text/xml');
                    entries = xmlDoc.getElementsByTagName('entry');
                    articles = [];
                    for (i = 0; i < entries.length; i++) {
                        title = entries[i].getElementsByTagName('title')[0].textContent;
                        authors = Array.from(entries[i].getElementsByTagName('author')).map(function (author) { return author.getElementsByTagName('name')[0].textContent; });
                        link = entries[i].getElementsByTagName('id')[0].textContent;
                        articles.push({ title: title, authors: authors, link: link });
                    }
                    return [2 /*return*/, articles];
                case 4:
                    error_3 = _a.sent();
                    console.error('Erro ao obter dados do arXiv:', error_3);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function displayNews() {
    return __awaiter(this, void 0, void 0, function () {
        var newsContainer, news, newsHTML_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newsContainer = document.getElementById('quadro-noticias');
                    if (!newsContainer) return [3 /*break*/, 2];
                    return [4 /*yield*/, getNews()];
                case 1:
                    news = _a.sent();
                    newsHTML_1 = '<h3>Últimas Notícias</h3><ul>';
                    news.forEach(function (article) {
                        var title = article.title, url = article.url;
                        newsHTML_1 += "<li><a href=\"".concat(url, "\" target=\"_blank\">").concat(title, "</a></li>");
                    });
                    newsHTML_1 += '</ul>';
                    newsContainer.innerHTML = newsHTML_1;
                    return [3 /*break*/, 3];
                case 2:
                    console.error('Contêiner de notícias não encontrado.');
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function displayWeather() {
    return __awaiter(this, void 0, void 0, function () {
        var weatherContainer, weatherData, temperature, weatherMain, weatherDescription, weatherHTML;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    weatherContainer = document.getElementById('quadro-servicos');
                    if (!weatherContainer) return [3 /*break*/, 2];
                    return [4 /*yield*/, getWeather()];
                case 1:
                    weatherData = _a.sent();
                    if (weatherData) {
                        temperature = weatherData.main.temp;
                        weatherMain = weatherData.weather[0].main;
                        weatherDescription = weatherData.weather[0].description;
                        weatherHTML = "\n        <h3>Previs\u00E3o do Tempo em Ilh\u00E9us, Bahia, Brasil</h3>\n        <p><strong>Temperatura:</strong> ".concat(temperature, "\u00B0C</p>\n        <p><strong>Condi\u00E7\u00E3o:</strong> ").concat(weatherMain, "</p>\n        <p><strong>Descri\u00E7\u00E3o:</strong> ").concat(weatherDescription, "</p>\n      ");
                        weatherContainer.innerHTML = weatherHTML;
                    }
                    else {
                        weatherContainer.innerHTML = '<p>Dados meteorológicos não disponíveis.</p>';
                    }
                    return [3 /*break*/, 3];
                case 2:
                    console.error('Contêiner do clima não encontrado.');
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function displayArXivData() {
    return __awaiter(this, void 0, void 0, function () {
        var arXivContainer, arXivData, arXivHTML_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    arXivContainer = document.getElementById('quadro-resultados');
                    if (!arXivContainer) return [3 /*break*/, 2];
                    return [4 /*yield*/, getArXivData()];
                case 1:
                    arXivData = _a.sent();
                    arXivHTML_1 = '<h3>Artigos Acadêmicos</h3><ul>';
                    arXivData.forEach(function (article) {
                        arXivHTML_1 += "\n        <li>\n          <strong>T\u00EDtulo:</strong> ".concat(article.title, "<br>\n          <strong>Autores:</strong> ").concat(article.authors.join(', '), "<br>\n          <a href=\"").concat(article.link, "\" target=\"_blank\">Link</a>\n        </li>\n      ");
                    });
                    arXivHTML_1 += '</ul>';
                    arXivContainer.innerHTML = arXivHTML_1;
                    return [3 /*break*/, 3];
                case 2:
                    console.error('Contêiner de dados do arXiv não encontrado.');
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Chame as funções para exibir os dados ao carregar a página
window.onload = function () {
    displayNews();
    displayWeather();
    displayArXivData();
};
