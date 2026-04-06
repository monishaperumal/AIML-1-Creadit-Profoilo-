# Setup & Installation Guide

## Quick Start (5 minutes)

### Prerequisites Check
```bash
# Check Java version (need 17+)
java -version

# Check Maven version (need 3.6.3+)
mvn -version

# Check MySQL (should be running)
mysql --version
```

### Step 1: Create Database
```sql
mysql -u root -p
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### Step 2: Configure Backend
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=create-drop
```

### Step 3: Build & Run Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Check health: `http://localhost:8080/api/health` ✅

### Step 4: Open Frontend
Open `frontend/premium-index.html` in browser or start a server:
```bash
cd frontend
python -m http.server 8000
```

Visit: `http://localhost:8000` 🎉

---

## Detailed Installation

### Windows Setup

#### Install Java 17
1. Download from [oracle.com](https://www.oracle.com/java/technologies/downloads/)
2. Run installer
3. Set JAVA_HOME environment variable:
   - Right-click "This PC" → Properties
   - Advanced system settings → Environment Variables
   - Add: `JAVA_HOME = C:\Program Files\Java\jdk-17`

#### Install Maven
1. Download from [maven.apache.org](https://maven.apache.org/)
2. Extract to `C:\Program Files\apache-maven-3.9.0`
3. Add to PATH:
   - Environment Variables → PATH
   - Add: `C:\Program Files\apache-maven-3.9.0\bin`
4. Verify: `mvn -version`

#### Install MySQL
1. Download from [mysql.com](https://www.mysql.com/downloads/mysql/)
2. Run installer, choose "Development Default"
3. Configure MySQL Server:
   - Port: 3306
   - Config Type: Development Machine
   - Connectivity: TCP/IP
   - MySQL X Protocol Port: 33060
   - Windows Service Name: MySQL80
4. Create user:
   - MySQL Command Line Client
   - `ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_password';`

### macOS Setup

#### Using Homebrew
```bash
# Install Java 17
brew tap homebrew/cask-versions
brew install --cask java17

# Install Maven
brew install maven

# Install MySQL
brew install mysql

# Start MySQL
brew services start mysql

# Set root password
mysql -u root
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
EXIT;
```

### Linux Setup (Ubuntu/Debian)

```bash
# Update package manager
sudo apt update

# Install Java 17
sudo apt install openjdk-17-jdk

# Install Maven
sudo apt install maven

# Install MySQL
sudo apt install mysql-server

# Secure MySQL installation
sudo mysql_secure_installation

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql
```

---

## Backend Configuration

### Database Configuration
```properties
# application.properties

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true

# Application
server.port=8080
spring.application.name=portfolio-backend

# Logging
logging.level.root=INFO
logging.level.com.monishap.portfolio=DEBUG
```

### POM Dependencies
Required in `pom.xml`:
- Spring Boot Web Starter
- Spring Boot Data JPA
- MySQL Connector
- Spring Boot Validation
- Jakarta Validation

---

## Frontend Setup

### Option 1: Static Files
Simply open HTML file:
```bash
# Using File Explorer
Open: frontend/premium-index.html

# Or use HTTP Server
cd frontend
python -m http.server 8000
# Visit: http://localhost:8000
```

### Option 2: Development Server
```bash
# Using Express (Node.js)
npm init -y
npm install express cors
# Create server.js and run

# Using Python Flask
pip install flask flask-cors
# Create app.py and run
```

### Required Assets
Ensure these are in `frontend/`:
- `premium-index.html` ✅
- `premium-styles.css` ✅
- `premium-script.js` ✅
- `index.html` (backup)
- `styles.css` (backup)
- `script.js` (backup)

---

## Environment Variables (Production)

Create `.env` file in backend root:
```bash
# Database
DB_URL=jdbc:mysql://localhost:3306/portfolio_db
DB_USERNAME=root
DB_PASSWORD=secure_password
DB_DRIVER=com.mysql.cj.jdbc.Driver

# Application
SERVER_PORT=8080
ENVIRONMENT=production

# Security
CORS_ORIGINS=https://domain.com,https://www.domain.com
JWT_SECRET=your_jwt_secret_key
```

Update `application.properties`:
```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

---

## Deployment

### Local Deployment
```bash
# Build JAR
cd backend
mvn clean package

# Run JAR
java -jar target/portfolio-backend-0.0.1-SNAPSHOT.jar
```

### Docker Deployment
Create `Dockerfile`:
```dockerfile
FROM openjdk:17-slim
COPY target/portfolio-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Build and run:
```bash
docker build -t portfolio-backend:1.0 .
docker run -p 8080:8080 portfolio-backend:1.0
```

### Cloud Deployment (AWS/heroku/Azure)
1. Create account on chosen platform
2. Create database (managed database service)
3. Configure environment variables
4. Deploy using platform-specific CLI or GitHub Actions
5. Update frontend API URL to cloud backend

---

## Verification Checklist

- [ ] Java 17 installed and JAVA_HOME set
- [ ] Maven installed and in PATH
- [ ] MySQL running and accessible
- [ ] Database `portfolio_db` created
- [ ] Backend configuration updated
- [ ] Backend builds without errors: `mvn clean install`
- [ ] Backend starts successfully: `mvn spring-boot:run`
- [ ] Health check works: `http://localhost:8080/api/health`
- [ ] Frontend files present
- [ ] Frontend loads in browser
- [ ] Contact form submits successfully
- [ ] All API endpoints responding

---

## Troubleshooting Setup

### Maven Issues
```bash
# Clear cache
rm -rf ~/.m2/repository

# Rebuild with dependencies
mvn clean install -U

# Skip tests
mvn clean install -DskipTests

# Check for compilation errors
mvn compile
```

### Database Issues
```bash
# Verify MySQL is running
mysql -u root -p -e "SELECT 1"

# Create database if missing
mysql -u root -p -e "CREATE DATABASE portfolio_db;"

# Check database exists
mysql -u root -p -e "SHOW DATABASES;"

# View current tables
mysql -u root -p portfolio_db -e "SHOW TABLES;"
```

### Port Issues
```bash
# Check if port 8080 is in use
lsof -i :8080

# Change port in application.properties
server.port=8081

# Use different port number
java -jar app.jar --server.port=9090
```

---

## Next Steps

1. ✅ Complete setup verification
2. 📖 Read [DOCUMENTATION.md](./DOCUMENTATION.md)
3. 🧪 Follow [Testing Guide](./TESTING.md)
4. 🚀 Deploy to production
5. 📊 Monitor logs and performance

