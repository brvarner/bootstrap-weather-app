const key = process.env.REACT_APP_API_KEY;

export const request = async (city) => {
  // This is the Geozoning API endpoint that we can use to grab the information
  // about our city's latitude and longitude before submitting our request to
  // the OpenWeather API.
  const baseURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`;
  try {
    const response = await fetch(baseURL);
    const json = await response.json();
    let lat = json[0].lat;
    let lng = json[0].lon;
    if (lat && lng) {
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`;
      const weatherRes = await fetch(weatherURL);
      const weather = await weatherRes.json();
      console.log(weather);
    } else {
      console.log(lat);
    }
  } catch (error) {
    console.error(`Error!: ${error}`);
  }
};
