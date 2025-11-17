import pymysql
import pandas as pd
import numpy as np

# Database connection details
DB_HOST = "localhost"  # e.g., "localhost"
DB_USER = "root"
DB_PASSWORD = "8688368187@Dm"
DB_NAME = "weather_jntuh"
TABLE_NAME = "weather_data"

# Loop through CSV files from 14.csv to 24.csv
for i in range(14, 25):
    CSV_FILE_PATH = f"datasets/{i}.csv"  # Update with correct CSV path

    try:
        print(f"📂 Processing file: {CSV_FILE_PATH}")

        # Connect to MySQL
        connection = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME)
        cursor = connection.cursor()

        # Create table if not exists
        create_table_query = f"""
        CREATE TABLE IF NOT EXISTS {TABLE_NAME} (
            District VARCHAR(225),
            Mandal VARCHAR(225),
            Date DATE,
            Rain FLOAT,
            Min_Temp FLOAT,
            Max_Temp FLOAT,
            Min_Humidity FLOAT,
            Max_Humidity FLOAT,
            Min_Wind_Speed FLOAT,
            Max_Wind_Speed FLOAT
        );
        """
        cursor.execute(create_table_query)
        connection.commit()

        # Load CSV data with COMMA as delimiter
        df = pd.read_csv(CSV_FILE_PATH, delimiter=",", keep_default_na=True)

        # Remove extra spaces in column names
        df.columns = df.columns.str.strip()

        # Convert Date format from "01-Jan-25" (dd-mmm-yy) to "YYYY-MM-DD"
        df['Date'] = pd.to_datetime(df['Date'], format='%d-%b-%y', errors='coerce').dt.strftime('%Y-%m-%d')

        # Replace NaN values with None (MySQL treats None as NULL)
        df = df.replace({np.nan: None})

        # Prepare Insert Query
        insert_query = f"""
        INSERT INTO {TABLE_NAME} 
        (District, Mandal, Date, Rain, Min_Temp, Max_Temp, Min_Humidity, Max_Humidity, Min_Wind_Speed, Max_Wind_Speed) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        # Convert DataFrame rows to list of tuples
        data_tuples = [tuple(x) for x in df.to_numpy()]

        # Execute batch insert for efficiency
        cursor.executemany(insert_query, data_tuples)
        connection.commit()

        print(f"✅ {i}.csv successfully inserted into MySQL table!")

    except Exception as e:
        print(f"❌ Error processing {i}.csv: {e}")

    finally:
        # Close cursor and connection
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals():
            connection.close()
