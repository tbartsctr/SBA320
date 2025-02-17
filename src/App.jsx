import { useState } from 'react'
import { useEffect } from "react"
import './App.css'
import L from "leaflet";
import 'leaflet/dist/leaflet.css'


function App() {
  useEffect(() => {
    const map = L.map('mapDiv').setView([39.12711000, -84.51439000], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    return() => {
      map.remove();
    };

  }, []);

  return(
    <div>
      <div id="mapDiv" style={{ height: '700px', width: "1000px"}}></div>
    </div>
  );
  
}



export default App
