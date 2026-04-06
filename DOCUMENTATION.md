# Monisha P Premium Portfolio - Complete Documentation

## 📋 Table of Contents
1. [API Documentation](#api-documentation)
2. [Setup & Installation](#setup--installation)
3. [Testing Guide](#testing-guide)
4. [Project Structure](#project-structure)
5. [Features](#features)
6. [Troubleshooting](#troubleshooting)

---

## API Documentation

### Base URL
```
http://localhost:8080/api
```

### API Endpoints

#### 1. Contact Submission
**Endpoint:** `POST /api/contact`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Collaboration Inquiry",
  "message": "I'm interested in discussing potential collaboration opportunities."
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "message": "Contact message received successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Collaboration Inquiry",
    "message": "I'm interested in discussing potential collaboration opportunities.",
    "createdAt": "2026-04-06T10:30:00"
  },
  "timestamp": 1712401800000
}
```

**Validation Rules:**
- `name`: Required, 2-100 characters
- `email`: Required, valid email format
- `subject`: Required, 5-200 characters
- `message`: Required, 10-2000 characters

---

#### 2. Get All Projects
**Endpoint:** `GET /api/projects`

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Projects retrieved successfully",
  "data": [
    {
      "id": "1",
      "title": "Chatbot for Autism Children",
      "description": "An empathetic AI chatbot...",
      "category": "Assistive AI",
      "technologies": ["Python", "NLP", "TensorFlow", "UX Design"],
      "features": ["Conversational AI", "Customizable learning modules", ...],
      "impact": "Presented at inter-college symposiums..."
    },
    ...
  ],
  "timestamp": 1712401800000
}
```

---

#### 3. Get Project by ID
**Endpoint:** `GET /api/projects/{id}`

**Example:** `GET /api/projects/1`

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Project retrieved successfully",
  "data": {
    "id": "1",
    "title": "Chatbot for Autism Children",
    "description": "An empathetic AI chatbot...",
    "category": "Assistive AI",
    "technologies": ["Python", "NLP"],
    "features": [...],
    "impact": "..."
  },
  "timestamp": 1712401800000
}
```

---

#### 4. Get Skills
**Endpoint:** `GET /api/skills`

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Skills retrieved successfully",
  "data": {
    "programming": ["Python", "Java", "C", "C++"],
    "web": ["HTML", "CSS", "JavaScript", "React.js"],
    "database": ["MySQL", "SQL"],
    "ai_ml": ["Machine Learning", "Generative AI", "NLP"],
    "cloud": ["Oracle Cloud", "AWS Basics"],
    "tools": ["Git", "Docker", "Maven", "Jupyter"]
  },
  "timestamp": 1712401800000
}
```

---

#### 5. Get Experience
**Endpoint:** `GET /api/experience`

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Experience retrieved successfully",
  "data": {
    "internships": [
      {
        "company": "Oracle",
        "position": "AI Intern",
        "year": "2025",
        "description": "Worked on AI-driven solutions..."
      }
    ],
    "courses": [
      {
        "name": "AI Foundation Course",
        "date": "Oct 2025"
      }
    ]
  },
  "timestamp": 1712401800000
}
```

---

#### 6. Get Certifications
**Endpoint:** `GET /api/certifications`

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Certifications retrieved successfully",
  "data": [
    {
      "title": "Oracle AI Foundation",
      "year": "2025"
    },
    {
      "title": "AICTE AI & ML Training",
      "year": "2025"
    }
  ],
  "timestamp": 1712401800000
}
```

---

#### 7. Get About Information
**Endpoint:** `GET /api/about`

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "About information retrieved successfully",
  "data": {
    "name": "Monisha P",
    "title": "Aspiring AI & ML Engineer",
    "bio": "A motivated and goal-oriented learner...",
    "location": "Bangalore, India",
    "email": "monishap2038008@gmail.com",
    "phone": "+91 9942004625"
  },
  "timestamp": 1712401800000
}
```

---

#### 8. Download Resume
**Endpoint:** `GET /api/resume`

**Response:** Binary PDF file with attachment header

---

#### 9. Health Check
**Endpoint:** `GET /api/health`

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "API is running",
  "data": "Monisha P Portfolio API v1.0",
  "timestamp": 1712401800000
}
```

---

### Error Responses

#### Validation Error (400)
```json
{
  "timestamp": "2026-04-06T10:30:00",
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "email": "Email should be valid",
    "name": "Name must be between 2 and 100 characters"
  },
  "path": "/api/contact"
}
```

#### Server Error (500)
```json
{
  "timestamp": "2026-04-06T10:30:00",
  "status": 500,
  "message": "An error occurred",
  "error": "Internal server error details",
  "path": "/api/contact"
}
```

---

### CORS Configuration
The API is configured to accept requests from:
- `http://localhost:3000` (React dev server)
- `http://localhost:8000` (Vite dev server)
- `http://localhost:5173` (Vite default)

Allowed Methods: `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`
Allowed Headers: All
Credentials: Allowed
Max Age: 3600 seconds

---

## Setup & Installation

### Prerequisites
- Java 17 or higher
- Maven 3.6.3 or higher
- MySQL 8.0 or higher
- Node.js 16+ (optional, for frontend development server)

### Backend Setup

#### 1. Clone/Setup Project
```bash
cd portfolio
cd backend
```

#### 2. Configure Database

Create a database in MySQL:
```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
```

#### 3. Build Project
```bash
mvn clean install
```

#### 4. Run Backend
```bash
mvn spring-boot:run
```

Server will start on `http://localhost:8080`

### Frontend Setup

#### Option 1: Serve HTML Files Directly
Simply open `frontend/premium-index.html` in a browser or use a simple HTTP server:

```bash
# Using Python 3
cd frontend
python -m http.server 8000

# Using Node.js
npx http-server
```

#### Option 2: Using Development Server
```bash
# For Vite
npm run dev

# For React development server
npm start
```

---

## Testing Guide

### Manual Testing

#### Test 1: Contact Form Submission
1. Navigate to contact section
2. Fill form with valid data:
   - Name: "Jane Doe"
   - Email: "jane@example.com"
   - Subject: "Interested in collaboration"
   - Message: "I'm interested in learning more about your AI projects"
3. Click "Send Message"
4. Expected: Success notification appears

#### Test 2: Form Validation
1. Try submitting with empty fields
2. Expected: Error messages appear for empty fields
3. Try entering invalid email
4. Expected: Email validation error message

#### Test 3: Project Modal
1. Click on any project card
2. Expected: Modal opens with detailed project information
3. Click close button or outside modal
4. Expected: Modal closes

#### Test 4: Skill Bars Animation
1. Scroll to skills section
2. Expected: Animated progress bars fill from 0 to specified percentage

#### Test 5: Navigation
1. Click on navigation links
2. Expected: Smooth scroll to respective sections
3. Check navbar active state updates

### API Testing with cURL

#### Test Contact API
```bash
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message for portfolio contact form."
  }'
```

#### Test Projects API
```bash
curl http://localhost:8080/api/projects
```

#### Test Skills API
```bash
curl http://localhost:8080/api/skills
```

#### Test Health Check
```bash
curl http://localhost:8080/api/health
```

### API Testing with Postman

1. **Import Collection**
   - Create new Postman collection: "Portfolio API"
   - Add requests for each endpoint

2. **Create Variables**
   - Base URL: `{{baseUrl}}`
   - Set value: `http://localhost:8080/api`

3. **Test Each Endpoint**
   - Contact POST: Verify response includes contact ID
   - Projects GET: Verify array of projects
   - Skills GET: Verify skill categories
   - Health GET: Verify API is running

### Automated Testing

#### Backend Tests (Maven)
```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=ContactControllerTest

# Generate code coverage report
mvn test jacoco:report
```

#### Frontend Tests (Optional)
```bash
# If using Jest/Testing Library
npm test

# Generate coverage report
npm test -- --coverage
```

---

## Project Structure

```
portfolio/
├── frontend/
│   ├── premium-index.html      # Main HTML file with all sections
│   ├── premium-styles.css      # Advanced CSS with animations
│   ├── premium-script.js       # Interactive JavaScript
│   ├── index.html              # Original portfolio
│   ├── styles.css              # Original styles
│   └── script.js               # Original script
│
└── backend/
    ├── pom.xml                 # Maven dependencies
    ├── src/main/java/com/monishap/portfolio/
    │   ├── PortfolioBackendApplication.java    # Main Spring Boot app
    │   ├── config/
    │   │   └── CorsConfig.java                 # CORS configuration
    │   ├── controller/
    │   │   ├── ContactController.java          # Contact form endpoint
    │   │   └── PortfolioApiController.java     # Portfolio APIs
    │   ├── service/
    │   │   ├── ContactService.java             # Contact business logic
    │   │   └── ProjectService.java             # Project business logic
    │   ├── model/
    │   │   ├── ContactRequest.java             # Contact model (with enhanced validation)
    │   │   └── ContactMessage.java             # Alternative contact model
    │   ├── dto/
    │   │   ├── ApiResponse.java                # Standard API response wrapper
    │   │   └── ProjectDTO.java                 # Project data transfer object
    │   ├── repository/
    │   │   ├── ContactRequestRepository.java   # Contact data layer
    │   │   └── ContactMessageRepository.java   # Alternative data layer
    │   ├── exception/
    │   │   └── GlobalExceptionHandler.java     # Global error handling
    │   └── resources/
    │       ├── application.properties          # Database and app config
    │       └── resume/
    │           └── sample-resume.pdf           # Resume file
    └── pom.xml (root)
```

---

## Features

### Frontend
- ✨ **Particle Background Animation** - Animated background with floating particles
- 🌈 **Gradient Themes** - Purple-blue neon gradient with glow effects
- 🎆 **Glassmorphism Cards** - Frosted glass effect on cards
- 💫 **Glow Effects** - Glowing buttons, icons, and borders
- ⌨️ **Typing Animation** - Dynamic text typing in hero section
- 📊 **Animated Skill Bars** - Progress bars that animate on scroll
- 🎯 **Section Reveal Animations** - Fade-in animations for sections
- 🖱️ **Custom Cursor Glow** - Interactive cursor with glow effect
- 📜 **Scroll Progress Bar** - Visual progress indicator at top
- 🎪 **Floating Navbar** - Sticky navbar that hides on scroll
- 🃏 **Project Card Modals** - Details popup for each project
- 🎨 **3D Tilt Effect** - Project cards with perspective tilt
- 🌓 **Dark/Light Mode** - Theme toggle functionality
- 📱 **Fully Responsive** - Mobile, tablet, and desktop support

### Backend
- ✅ **Input Validation** - Hibernate Validator with custom messages
- 🛡️ **Exception Handling** - Global exception handler for error responses
- 🔄 **CORS Support** - Cross-origin resource sharing configured
- 📦 **RESTful APIs** - Complete REST endpoints for portfolio data
- 💾 **Database Integration** - MySQL with JPA/Hibernate ORM
- 🔐 **Secure Data Handling** - Proper validation and sanitization
- 📊 **API Response Wrapper** - Consistent API response format
- 🚀 **Spring Boot** - Latest version for production-ready application

---

## Troubleshooting

### Backend Issues

#### Issue: Port 8080 Already in Use
```bash
# Kill process on port 8080 (Linux/Mac)
lsof -ti:8080 | xargs kill -9

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

#### Issue: Database Connection Failed
- Check MySQL is running
- Verify credentials in `application.properties`
- Ensure database exists: `CREATE DATABASE portfolio_db;`

#### Issue: Maven Build Fails
```bash
# Clear cache and rebuild
mvn clean install -U

# Skip tests during build
mvn clean install -DskipTests
```

### Frontend Issues

#### Issue: Styling Not Applied
- Hard refresh browser: `Ctrl+Shift+R` or `Cmd+Shift+R`
- Check console for CSS file loading errors
- Verify file paths are correct

#### Issue: API Calls Not Working
- Verify backend is running on `http://localhost:8080`
- Check CORS configuration includes your frontend URL
- Open browser console for any CORS errors
- Test API directly: `curl http://localhost:8080/api/health`

#### Issue: Animations Not Showing
- Check browser supports CSS animations (all modern browsers)
- Disable browser extensions that might interfere
- Check DevTools for animation performance issues

### Common Solutions

**Check Backend Logs:**
```bash
tail -f target/spring-boot.log
```

**Test API Endpoints:**
```bash
# Health check
curl http://localhost:8080/api/health

# Contact endpoint
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test message here"}'
```

**Browser DevTools:**
- Open F12 or Right-click → Inspect
- Check Console tab for JavaScript errors
- Check Network tab for failed API requests
- Check Application tab for stored theme preference

---

## Performance Optimization

### Frontend
- Lazy load images with intersection observer
- Minimize CSS and JavaScript files
- Use CSS GPU acceleration for animations
- Debounce scroll events
- Cache particle background creation

### Backend
- Enable database query caching
- Use connection pooling
- Implement pagination for large datasets
- Add database indexes on frequently queried fields
- Enable GZIP compression

---

## Security Considerations

1. **Input Validation**: All user inputs validated server-side
2. **CORS Configuration**: Limited to known origins
3. **SQL Injection Prevention**: Using JPA/Hibernate ORM
4. **XSS Prevention**: Content properly encoded in responses
5. **HTTPS**: Enable in production
6. **Database Credentials**: Use environment variables in production
7. **Rate Limiting**: Consider adding for production

---

## Future Enhancements

- [ ] User authentication system
- [ ] Admin dashboard for managing portfolio content
- [ ] Email notification on new contact messages
- [ ] Analytics tracking
- [ ] Blog section
- [ ] Project showcase with GitHub integration
- [ ] Achievement badges/progress tracking
- [ ] Multi-language support
- [ ] PWA (Progressive Web App) support
- [ ] Real-time chat functionality

---

## Support & Contact

For issues or questions:
- Email: monishap2038008@gmail.com
- Phone: +91 9942004625
- Location: Bangalore, India

---

**Last Updated:** April 6, 2026
**Version:** 1.0
**Status:** Production Ready ✅
