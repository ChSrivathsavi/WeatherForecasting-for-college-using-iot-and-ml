from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

@app.route('/sensor_data', methods=['GET'])
def get_sensor_data():
    # Simulated sensor data; replace with real sensor readings
    sensor_data = {
        "temperature": 25.5,
        "humidity": 60.2,
        "light_intensity": 300.0,
        "bmp_temperature": 3105.2,  # May need conversion
        "pressure": 1012.3,
        "flame_intensity": 0.0
    }
    return jsonify(sensor_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
