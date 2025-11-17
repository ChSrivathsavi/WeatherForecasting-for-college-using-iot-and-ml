const SENSOR_API_URL = 'http://192.168.106.29:5500/sensor_data';
const STORE_API_URL = 'http://localhost/store_sensor_data.php'; // PHP script URL

// Fetch sensor data from API
async function fetchSensorData() {
    try {
        const response = await fetch(SENSOR_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        updateUI(data);
        sendDataToDatabase(data); // Send data to MySQL
    } catch (error) {
        console.error('Fetch error:', error);
        retryFetch();
    }
}

// Send sensor data to MySQL (via PHP)
async function sendDataToDatabase(data) {
    try {
        const response = await fetch(STORE_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Database Response:", result);
    } catch (error) {
        console.error("Error sending data to MySQL:", error);
    }
}

// Update UI elements with new sensor data
function updateUI(data) {
    updateElement('current-temp', data.lm35_temperature, 1, '°C');
    updateElement('temperature', data.lm35_temperature, 1, '°C');
    updateElement('humidity', data.humidity, 1, '%');
    updateElement('light-intensity', data.light_intensity, 0, ' lux');
    updateElement('bmp-temperature', data.bmp_temperature, 1, '°C');
    updateElement('pressure', data.pressure, 2, ' hPa');
    updateElement('flame-detection', data.flame_detection == 0 ? "No" : "Yes", 1);
    updateElement('wind-speed', data.wind_speed, 1, ' m/s');
    updateElement('precipitation', data.precipitation, 1, ' mm');
    updateElement('dew-point', data.dew_point, 1, '°C');
    updateElement('visibility', data.visibility, 1, ' m');
}

// Smooth transition update for UI elements
function updateElement(id, value, decimalPlaces, unit = '') {
    const element = document.getElementById(id);
    if (!element) return;
    if (typeof value === 'string') {
        element.textContent = value;
        element.style.opacity = 1;
        return;
    }
    const newValue = Number(value).toFixed(decimalPlaces) + unit;
    if (element.textContent !== newValue) {
        element.style.opacity = 0.5;
        setTimeout(() => {
            element.textContent = newValue;
            element.style.opacity = 1;
        }, 300);
    }
}

// Update live time & date
function updateTime() {
    const now = new Date();
    document.getElementById('live-time').textContent = now.toLocaleTimeString();
    document.getElementById('current-date').textContent = now.toDateString();
    checkTimeForTheme(now.getHours());
}

// Retry fetching data if there's an error
function retryFetch() {
    setTimeout(fetchSensorData, 5000);
}

// Load saved theme preference
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    }
}

// Initialize functions on window load
window.onload = function () {
    loadTheme();
    fetchSensorData();
    updateTime();
    setInterval(fetchSensorData, 5000);
    setInterval(updateTime, 1000);
};
