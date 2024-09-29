# Overzicht:

De Arduino LED Strip Controller is een webgebaseerde interface waarmee je eenvoudig een RGB LED-strip kunt bedienen met behulp van een Arduino. Gebruikers kunnen in real-time de kleur en helderheid van de LED-strip aanpassen, en de LED-strip in- of uitschakelen. Dit project maakt gebruik van een React-webinterface, Socket.io voor realtime communicatie, en een Node.js-backend die commando's naar de Arduino stuurt via een seriële verbinding.

# Functionaliteit:
1. Kleurkeuze: Gebruikers kunnen de kleur van de LED-strip instellen via een interactieve kleurkiezer, die de RGB-waarden rechtstreeks naar de Arduino stuurt.

2. Helderheidsregeling: Met een schuifregelaar kunnen gebruikers de helderheid van de LED-strip aanpassen van 0% (uit) tot 100% (volledige helderheid).

3. Aan/Uit-knop: Met een duidelijke schakelknop kunnen gebruikers de LED-strip in- en uitschakelen. Wanneer de LED-strip is ingeschakeld, behoudt deze de laatst gekozen kleur en helderheid.

4. Realtime updates: Alle wijzigingen die de gebruiker maakt in de webinterface worden in real-time via Socket.io naar de Arduino verzonden, wat zorgt voor directe respons op de LED-strip.

5. Snackbar meldingen: Voor elke actie die de gebruiker uitvoert, zoals het aanpassen van de kleur, het veranderen van de helderheid of het in-/uitschakelen van de LED-strip, ontvangt de gebruiker een korte melding onderaan het scherm.

# Technische Specificaties:

1. ## Frontend (React):

* React.js is gebruikt voor het opbouwen van de gebruikersinterface.
* SketchPicker van de react-color-bibliotheek voor het selecteren van kleuren.
* CSS zorgt voor een moderne, minimalistische en gebruiksvriendelijke interface.

2. ## Backend (Node.js):

* Node.js wordt gebruikt als server-side platform om de communicatie met de Arduino te beheren.
* Socket.io verzorgt de real-time communicatie tussen de webinterface en de Arduino.
* SerialPort-bibliotheek voor het verzenden van seriële commando's naar de Arduino via USB.

3. ## Arduino:

* Arduino UNO bestuurt de LED-strip via PWM (Pulse Width Modulation) op de pinnen die zijn aangesloten op de rode, groene en blauwe LED-kanalen.
* ArduinoJson-bibliotheek voor het verwerken van de JSON-berichten die door de Node.js-backend worden ontvangen.
* PWM wordt gebruikt om de helderheid en kleur van de LED's aan te passen.

# Benodigdheden:

1. ## Hardware:

* Arduino UNO of vergelijkbaar.
* RGB LED-strip met drie kleurkanalen (Rood, Groen, Blauw) en een voedingslijn (5V).
* USB-kabel voor de seriële verbinding tussen de computer en de Arduino.
* Optioneel: weerstanden voor de LED-strip.

2. ## Software:

* Node.js en npm voor het draaien van de backend en het beheren van pakketten.
* Arduino IDE voor het uploaden van de code naar de Arduino.
* React.js voor de frontend.

  ### Voor hulp contacteer Arnotjuh.be via [https://arnotjuh.be] of me@arnototjuh.be
