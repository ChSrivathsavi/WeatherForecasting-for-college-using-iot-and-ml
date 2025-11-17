const apiKey = 'd9094a46177e83aa2ffe5f0c71eddfb2';
const city = 'London,UK';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${Hyderabad}&appid=${d9094a46177e83aa2ffe5f0c71eddfb2}`;

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
