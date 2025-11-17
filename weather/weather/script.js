const SENSOR_API_URL = 'http://192.168.106.29:5500/sensor_data';

// Fetch sensor data from API
async function fetchSensorData() {
    try {
        const response = await fetch(SENSOR_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        updateSensorUI(data);
    } catch (error) {
        console.error('Fetch error:', error);
        retryFetch();
    }
}

// Update UI elements with new sensor data
function updateSensorUI(data) {

    // Calculate Feels-Like Temperature
    const feelsLikeTemp = calculateFeelsLike(data.lm35_temperature, data.humidity);
    updateElement('current-temp', data.lm35_temperature, 1, '°C');
    updateElement('feels-like', feelsLikeTemp, 1, '°C');
    updateElement('temperature', data.lm35_temperature, 1, '°C');
    updateElement('humidity', data.humidity, 1, '%');
    updateElement('light-intensity', data.light_intensity, 0, ' lux');
    updateElement('bmp-temperature', data.bmp_temperature, 1, '°C');
    updateElement('pressure', data.pressure, 2, ' hPa');
    updateElement('flame-detection', data.flame_detection==0?"No":"Yes", 1, );


}

// Smooth transition update for UI elements
function updateElement(id, value, decimalPlaces, unit = '') {
    const element = document.getElementById(id);
    if (!element) return;

    // Check if the value is a string
    if (typeof value === 'string') {
        element.textContent = value; // Directly set the text content to the string value
        element.style.opacity = 1; // Ensure opacity is set to 1
        return; // Exit the function
    }

    // If the value is a number, format it
    const newValue = Number(value).toFixed(decimalPlaces) + unit;
    if (element.textContent !== newValue) {
        element.style.opacity = 0.5;
        setTimeout(() => {
            element.textContent = newValue;
            element.style.opacity = 1;
        }, 300);
    }
}
// Calculate Feels-Like Temperature (Heat Index Formula)
function calculateFeelsLike(tempC, humidity) {
    const tempF = (tempC * 9/5) + 32; // Convert Celsius to Fahrenheit
    const HI = -42.379 + (2.04901523 * tempF) + (10.14333127 * humidity) 
             - (0.22475541 * tempF * humidity) - (0.00683783 * tempF * tempF) 
             - (0.05481717 * humidity * humidity) 
             + (0.00122874 * tempF * tempF * humidity) 
             + (0.00085282 * tempF * humidity * humidity) 
             - (0.00000199 * tempF * tempF * humidity * humidity);
    const feelsLikeC = (HI - 32) * 5/9; // Convert back to Celsius
    return feelsLikeC.toFixed(1);
}

// Update live time & date
function updateTime() {
    const now = new Date();
    document.getElementById('live-time').textContent = now.toLocaleTimeString();
    document.getElementById('current-date').textContent = now.toDateString();
}

// Retry fetching data if there's an error
function retryFetch() {
    setTimeout(fetchSensorData, 5000);
}

// Initialize functions on window load
window.onload = function () {
    fetchSensorData();
    updateTime();
    setInterval(fetchSensorData, 5000); // Sensor data updates every 5 seconds
    setInterval(updateTime, 1000);
};
