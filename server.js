import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})

app.get("/weather", async (req, res) => {
    const apiKey = "f8bbc1280adb0c8a8e8bde970c6f1df7";
    const lat = 48.85661400
    const lon = 2.35222190
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        const weatherData = response.data;

        res.json(weatherData);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching weather data!"});
    }

});