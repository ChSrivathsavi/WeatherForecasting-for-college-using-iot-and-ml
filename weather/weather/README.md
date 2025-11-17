# Weather Forecasting for College using IoT and ML

A comprehensive weather monitoring and forecasting system designed for JNTUHUCEM (Jawaharlal Nehru Technological University Hyderabad University College of Engineering Manthani) that combines IoT sensor data with machine learning techniques for accurate weather predictions.

## 🌤️ Overview

This project integrates real-time IoT sensor data collection with historical weather data analysis to provide accurate weather forecasting for the college campus. The system features a modern web interface for data visualization and monitoring.

## 🚀 Features

- **Real-time Sensor Data**: Live weather data from IoT sensors including temperature, humidity, pressure, light intensity, and wind speed
- **Historical Data Analysis**: 24 CSV datasets containing extensive weather records for Telangana districts
- **Web Dashboard**: Interactive frontend with real-time updates and data visualization
- **Data Storage**: MySQL database integration for persistent data storage
- **API Integration**: RESTful APIs for sensor data communication
- **Machine Learning Ready**: Structured datasets suitable for ML model training

## 📁 Project Structure

```
weather/
├── 📄 index1.html              # Main weather dashboard
├── 📄 highlights.html          # Today's weather highlights
├── 🎨 style.css               # Main dashboard styles
├── 🎨 highlights.css          # Highlights page styles
├── 📜 script.js               # Main dashboard JavaScript
├── 📜 highlights.js           # Highlights page JavaScript
├── 📜 demo.js                 # OpenWeatherMap API demo
├── 🗄️ datasets/               # Historical weather data (24 CSV files)
├── 🧪 experiment/             # Experimental Flask app
│   ├── 📄 app.py              # Flask API server
│   └── 📄 index.html          # Sensor data display
├── 🖼️ images/                 # Project images and logos
├── 🐍 weatherdata_csv_to_sql.py    # CSV to MySQL data migration
├── 🐍 weatherdata_storing.py       # Flask data storage API
└── ⚙️ .vscode/                # VS Code configuration
```

## 🛠️ Technology Stack

### Frontend
- **HTML5/CSS3**: Modern responsive web design
- **JavaScript**: Real-time data fetching and DOM manipulation
- **Fetch API**: HTTP requests for sensor data

### Backend
- **Python**: Core backend logic
- **Flask**: Web framework for APIs
- **MySQL**: Database for data persistence
- **pymysql/mysql.connector**: Database connectivity

### Data Processing
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computations

## 📊 Data Sources

### IoT Sensors
The system collects data from multiple sensors:
- **LM35**: Temperature sensing
- **BMP280**: Temperature and pressure
- **DHT11**: Humidity measurement
- **Light Sensor**: Light intensity detection
- **Flame Sensor**: Fire detection
- **Wind Speed Sensor**: Air velocity measurement

### Historical Data
- **24 CSV files** containing weather data for Telangana districts
- **Data includes**: Rainfall, temperature (min/max), humidity (min/max), wind speed
- **Time period**: August 2024 weather records
- **Geographic coverage**: Multiple districts and mandals

## 🚀 Getting Started

### Prerequisites
- Python 3.7+
- MySQL Server
- Web browser with JavaScript support
- IoT sensors (for real-time data)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ChSrivathsavi/WeatherForecasting-for-college-using-iot-and-ml.git
   cd WeatherForecasting-for-college-using-iot-and-ml
   ```

2. **Set up the database**
   ```bash
   # Create MySQL database
   mysql -u root -p
   CREATE DATABASE weather_jntuh;
   ```

3. **Install Python dependencies**
   ```bash
   pip install flask flask-cors pymysql pandas numpy mysql-connector-python
   ```

4. **Import historical data**
   ```bash
   python weatherdata_csv_to_sql.py
   ```

5. **Run the Flask API server**
   ```bash
   python weatherdata_storing.py
   ```

6. **Open the web interface**
   - Open `index1.html` in your web browser for the main dashboard
   - Open `highlights.html` for today's weather highlights

### Configuration

Update the following configuration files with your settings:

**weatherdata_storing.py**:
```python
host='localhost',           # Your MySQL host
user='root',               # Your MySQL username  
password='your_password',  # Your MySQL password
database='weather_jntuh'   # Your database name
```

**script.js / highlights.js**:
```javascript
const SENSOR_API_URL = 'http://your-sensor-ip:5500/sensor_data';
```

## 🌐 API Endpoints

### Sensor Data API
- **URL**: `http://192.168.106.29:5500/sensor_data`
- **Method**: GET
- **Response**: JSON object with sensor readings

### Data Storage API
- **URL**: `http://localhost:5000/receive_data`
- **Method**: POST
- **Body**: JSON data to store in database

### Experimental API
- **URL**: `http://localhost:5000/sensor_data`
- **Method**: GET
- **Response**: Simulated sensor data

## 📱 Web Interface Features

### Main Dashboard (`index1.html`)
- Real-time weather display
- Current temperature and "feels like" temperature
- Humidity, pressure, and light intensity
- Flame detection status
- Automatic data refresh every 5 seconds

### Highlights Page (`highlights.html`)
- Today's weather summary
- Additional sensor metrics
- Wind speed monitoring
- Data storage functionality

## 🔧 Sensor Data Format

```json
{
  "lm35_temperature": 25.6,
  "humidity": 65.2,
  "light_intensity": 850,
  "bmp_temperature": 24.8,
  "pressure": 1013.25,
  "flame_detection": 0,
  "wind_speed": 3.2
}
```

## 📈 Data Analysis Opportunities

The collected data is suitable for:
- **Time series forecasting**
- **Weather pattern analysis**
- **Temperature prediction models**
- **Rainfall prediction**
- **Seasonal trend analysis**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

**Project Maintainer**: Ch Srivathsavi
**GitHub**: [@ChSrivathsavi](https://github.com/ChSrivathsavi)

## 🙏 Acknowledgments

- JNTUHUCEM for providing the infrastructure and support
- OpenWeatherMap for weather API services
- The open-source community for the amazing tools and libraries

---

⭐ **Star this repository if you find it helpful!**

## 📊 Project Statistics

- **Total Files**: 40+
- **Datasets**: 24 CSV files with extensive weather data
- **Sensors Supported**: 6 different environmental sensors
- **Real-time Updates**: Every 5 seconds
- **Database Records**: 1000+ weather data points
