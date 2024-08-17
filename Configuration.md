graph TD
    User[User]
    Pi[Raspberry Pi]
    
    Plant1[Plant 1]
    Plant2[Plant 2]
    Plant3[Plant 3]
    
    Temp1[Temperature Sensor]
    Hum1[Humidity Sensor]
    Moist1[Soil Moisture Sensor]
    
    Temp2[Temperature Sensor]
    Hum2[Humidity Sensor]
    Moist2[Soil Moisture Sensor]
    
    Temp3[Temperature Sensor]
    Hum3[Humidity Sensor]
    Moist3[Soil Moisture Sensor]

    User --> Pi
    Pi --> Plant1
    Pi --> Plant2
    Pi --> Plant3
    
    Plant1 --> Temp1
    Plant1 --> Hum1
    Plant1 --> Moist1
    
    Plant2 --> Temp2
    Plant2 --> Hum2
    Plant2 --> Moist2
    
    Plant3 --> Temp3
    Plant3 --> Hum3
    Plant3 --> Moist3
