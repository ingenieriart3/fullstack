# Usar la imagen oficial de Mosquitto
FROM eclipse-mosquitto:latest

# Copiar el archivo de configuración personalizado si es necesario
COPY mosquitto.conf /etc/mosquitto/mosquitto.conf

# Exponer los puertos
EXPOSE 1883 9001

# Configurar el comando de inicio del contenedor
CMD ["mosquitto", "-c", "/etc/mosquitto/mosquitto.conf"]
