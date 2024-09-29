#include <ArduinoJson.h>

int redPin = 9;
int greenPin = 10;
int bluePin = 11;

bool isOn = true;
int brightness = 100;

void setup() {
  Serial.begin(9600);
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}

void loop() {
  if (Serial.available()) {
    String input = Serial.readStringUntil('\n');
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, input);

    if (error) {
      Serial.println("JSON Fout");
      return;
    }

    String type = doc["type"].as<const char*>();

    if (type == "color") {
      int red = doc["red"];
      int green = doc["green"];
      int blue = doc["blue"];
      brightness = doc["brightness"];
      isOn = doc["isOn"];
      setColor(red, green, blue);
    }
    else if (type == "power") {
      isOn = doc["isOn"];
      if (isOn) {
        setColor(255, 255, 255); // Keer terug naar de laatste kleur (of wit als standaard)
      } else {
        turnOffLEDs();
      }
    }
  }
}

void setColor(int red, int green, int blue) {
  if (isOn) {
    float factor = brightness / 100.0;
    analogWrite(redPin, 255 - (red * factor));
    analogWrite(greenPin, 255 - (green * factor));
    analogWrite(bluePin, 255 - (blue * factor));
  } else {
    turnOffLEDs();
  }
}

void turnOffLEDs() {
  analogWrite(redPin, 255);
  analogWrite(greenPin, 255);
  analogWrite(bluePin, 255);
}
