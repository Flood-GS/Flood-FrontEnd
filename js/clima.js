//Checando clima 
const API_KEY = '1b957c7ff557e5baacdd53a9850fb36c';
async function monitorarClima() {
    const cidade = document.getElementById('idClima').value.trim();
    const resultado = document.getElementById('resultado');
    
    if (!cidade) {
      resultado.textContent = 'Digite o nome de sua cidade.';
      return;
    }
  
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;
      const resposta = await fetch(url);
      const dados = await resposta.json();
  
      if (dados.cod !== 200) {
        resultado.textContent = 'Cidade não encontrada.';
        return;
      }
  
      const { main, weather } = dados;
      const temperatura = main.temp;
      const descricao = weather[0].description.toLowerCase();
      const chuva = descricao.includes('rain') || descricao.includes('chuva');
  
      resultado.innerHTML = `
        <p>A temperatura em ${cidade} é ${temperatura}°C.</p>
        <p>Condição: ${descricao}.</p>
      `;
  
      if (chuva) {
        resultado.innerHTML += '<p>Há previsão de chuva, se proteja.</p>';
      } else {
        resultado.innerHTML += '<p>Não há previsão de chuva, aproveite o dia.</p>';
      }
  
    } catch (erro) {
      console.error('Erro ao buscar clima:', erro);
      resultado.textContent = 'Houve um erro ao obter as informações do clima.';
    }
  }