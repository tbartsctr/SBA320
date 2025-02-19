import { useState } from 'react'
import { useEffect } from "react"
import './App.css'
import L from "leaflet";
import 'leaflet/dist/leaflet.css'


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [map, setMap] = useState(null);


  useEffect(() => {
    fetch("http://localhost:3000/weather")
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);

        console.log(data);
      })
      .catch(error => {
        console.error("Error fetching weather data", error);
      });


    const initialMap = L.map('mapDiv').setView([39.12711000, -84.51439000], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(initialMap);

    setMap(initialMap);

    return () => {
      initialMap.remove();
    };

  }, []);


  useEffect(() => {
    if (weatherData && weatherData.coord && map) {
      const {lat, lon} = weatherData.coord;
      map.setView([lat, lon],10);

      
      const marker = L.marker([lat, lon]).addTo(map);
       marker.bindPopup(`<h3>Weather in ${weatherData.name}</h3>
                        <p>Temperature: ${weatherData.main.temp}°C</p>
                        <p>${weatherData.weather[0].description}</p>
                        <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
                        <p>Wind Direction: ${weatherData.wind.deg}°</p>
                        <p>Timezone: UTC${weatherData.timezone / 3600 >= 0 ? '+' : ''}${weatherData.timezone / 3600}</p>
                      `).openPopup();
                        
    }
  }, [weatherData, map]);
    


  return(
    <div>
      <div id="mapDiv" style={{ height: '700px', width: "1000px"}}></div>
      {weatherData ? (
      <div>
        <h1>Weather Data</h1>
        <pre>{JSON.stringify(weatherData, null, 2)}</pre>
      </div>
    ) : (
      <h1>Loading weather data...</h1> 
    )}
  </div>
);

}



export default App
