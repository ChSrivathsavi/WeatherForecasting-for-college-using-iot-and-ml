from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Function to connect to the MySQL database
def get_db_connection():
    conn = mysql.connector.connect(
        host='localhost',  # e.g., 'localhost' or your server IP
        user='root',     # your MySQL username
        password='8688368187@Dm',  # your MySQL password
        database='weather_jntuh'     # your database name
    )
    return conn

# Route to handle incoming data
@app.route('/data', methods=['POST'])
def receive_data():
    # Get JSON data from the request
    data = request.get_json()

    # Extract the data you want to store
    value1 = data.get('value1')
    value2 = data.get('value2')

    # Insert data into the database
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO my_table (column1, column2) VALUES (%s, %s)', (value1, value2))
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'status': 'success'}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Change port if needed