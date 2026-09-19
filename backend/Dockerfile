# Use an official Maven image to run the Spring Boot app
FROM eclipse-temurin:25-jdk-alpine

# Set the working directory
WORKDIR /app

# Copy the pom.xml and install dependencies
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

# Copy the source code and build the applicaiton
COPY src ./src

RUN ./mvnw clean package -DskipTests

# Export port
EXPOSE 8080

# Specify the command to run the application
ENTRYPOINT ["java", "-jar", "target/blogly-0.0.1-SNAPSHOT.jar"]