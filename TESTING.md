# Testing Guide

## Manual Testing Procedures

### Frontend Testing

#### Test Suite 1: Navigation & UI Rendering
| Test | Steps | Expected Result | Status |
|------|-------|-----------------|--------|
| Page Load | Open premium-index.html | All sections visible, no JS errors | ⬜ |
| Navbar Rendering | Check navbar at top | Floating navbar visible with links and theme toggle | ⬜ |
| Hero Section | Scroll to top | Hero section displays with animations | ⬜ |
| Typing Animation | Wait on hero | Text types character by character | ⬜ |
| Particle Background | Check background | Animated particles visible floating | ⬜ |
| Progress Bar | Scroll down | Progress bar at top shows scroll progress | ⬜ |
| Custom Cursor | Move mouse | Custom cursor glow follows mouse | ⬜ |
| Dark Mode Toggle | Click theme button | Theme switches between dark/light mode | ⬜ |
| Responsive Design | Resize browser | Layout adjusts for all screen sizes | ⬜ |

#### Test Suite 2: Navigation & Scrolling
| Test | Steps | Expected Result | Status |
|------|-------|-----------------|--------|
| Smooth Scroll | Click nav link | Smooth scroll to section | ⬜ |
| Active State | Click nav link | Nav link highlights as active | ⬜ |
| Section Reveal | Scroll to section | Section animates in with fade/slide | ⬜ |
| Scroll Behavior | Scroll up/down | Header shows/hides appropriately | ⬜ |

#### Test Suite 3: Contact Form
| Test | Steps | Expected Result | Status |
|------|-------|-----------------|--------|
| Form Render | Scroll to contact | Form displays with all fields | ⬜ |
| Valid Submit | Fill all fields correctly, submit | Success notification shown, form resets | ⬜ |
| Empty Name | Leave name empty, submit | Error message: "Name is required" | ⬜ |
| Empty Email | Leave email empty, submit | Error message: "Email is required" | ⬜ |
| Invalid Email | Enter "invalid", submit | Error message: "Please enter a valid email" | ⬜ |
| Empty Subject | Leave subject empty, submit | Error message: "Subject is required" | ⬜ |
| Short Message | Enter message < 10 chars, submit | Error message about message length | ⬜ |
| Empty Message | Leave message empty, submit | Error message: "Message is required" | ⬜ |
| API Call Success | Submit valid form | Message sent to backend, DB record created | ⬜ |

#### Test Suite 4: Skills Section
| Test | Steps | Expected Result | Status |
|------|-------|-----------------|--------|
| Skills Display | Scroll to skills | All skill categories displayed | ⬜ |
| Skill Bars | Wait for section load | Progress bars animate from 0 to percentage | ⬜ |
| Tool Badges | Check tools section | All tool badges displayed and styled | ⬜ |
| Hover Effects | Hover over cards | Cards show hover animation | ⬜ |

#### Test Suite 5: Projects Section
| Test | Steps | Expected Result | Status |
|------|-------|-----------------|--------|
| Projects Display | Scroll to projects | All project cards visible | ⬜ |
| Project Card Hover | Hover on card | Card scales up with tilt effect | ⬜ |
| Modal Open | Click project card | Modal opens with detailed info | ⬜ |
| Modal Content | View modal | All project details displayed | ⬜ |
| Modal Close Button | Click X button | Modal closes smoothly | ⬜ |
| Modal Backdrop | Click outside modal | Modal closes | ⬜ |
| Modal Esc Key | Press Escape | Modal closes (if implemented) | ⬜ |

#### Test Suite 6: Experience Timeline
| Test | Steps | Expected Result | Status |
|------|-------|-----------------|--------|
| Timeline Display | Scroll to experience | Timeline displayed with vertical line | ⬜ |
| Timeline Items | Check items | All experience items with markers | ⬜ |
| Timeline Animation | Scroll to section | Items animate in from left-right | ⬜ |

#### Test Suite 7: Certifications
| Test | Steps | Expected Result | Status |
|------|-------|-----------------|--------|
| Cert Cards | Scroll to certifications | All certification cards displayed | ⬜ |
| Cert Icons | Check cards | Icons visible and properly colored | ⬜ |
| Cert Hover | Hover on card | Hover animations work | ⬜ |

---

## Backend API Testing

### Using cURL

#### Test 1: Health Check
```bash
curl -X GET http://localhost:8080/api/health
```
Expected:
```json
{
  "status": "success",
  "message": "API is running",
  "data": "Monisha P Portfolio API v1.0"
}
```
✅ Status: 200 OK

---

#### Test 2: Get Projects
```bash
curl -X GET http://localhost:8080/api/projects
```
Expected:
```json
{
  "status": "success",
  "message": "Projects retrieved successfully",
  "data": [
    {
      "id": "1",
      "title": "Chatbot for Autism Children",
      ...
    },
    ...
  ]
}
```
✅ Status: 200 OK

---

#### Test 3: Get Skills
```bash
curl -X GET http://localhost:8080/api/skills
```
Expected:
```json
{
  "status": "success",
  "message": "Skills retrieved successfully",
  "data": {
    "programming": ["Python", "Java", ...],
    ...
  }
}
```
✅ Status: 200 OK

---

#### Test 4: Valid Contact Submission
```bash
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Portfolio Inquiry",
    "message": "I am interested in discussing collaboration opportunities."
  }'
```
Expected:
```json
{
  "status": "success",
  "message": "Contact message received successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Portfolio Inquiry",
    "message": "...",
    "createdAt": "2026-04-06T10:30:00"
  }
}
```
✅ Status: 201 Created

---

#### Test 5: Invalid Email
```bash
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "invalid-email",
    "subject": "Portfolio Inquiry",
    "message": "I am interested in discussing collaboration opportunities."
  }'
```
Expected:
```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "email": "Email should be valid"
  }
}
```
✅ Status: 400 Bad Request

---

#### Test 6: Missing Fields
```bash
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'
```
Expected:
```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "subject": "Subject is required",
    "message": "Message is required"
  }
}
```
✅ Status: 400 Bad Request

---

#### Test 7: Message Too Short
```bash
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Hi",
    "message": "Short"
  }'
```
Expected:
```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "subject": "Subject must be between 5 and 200 characters",
    "message": "Message must be between 10 and 2000 characters"
  }
}
```
✅ Status: 400 Bad Request

---

#### Test 8: Download Resume
```bash
curl -X GET http://localhost:8080/api/resume -o resume.pdf
```
Expected:
- File size > 0 bytes
- File type: application/pdf
✅ Status: 200 OK

---

#### Test 9: Get About Info
```bash
curl -X GET http://localhost:8080/api/about
```
Expected:
```json
{
  "status": "success",
  "message": "About information retrieved successfully",
  "data": {
    "name": "Monisha P",
    "title": "Aspiring AI & ML Engineer",
    "location": "Bangalore, India",
    ...
  }
}
```
✅ Status: 200 OK

---

#### Test 10: Get Experience
```bash
curl -X GET http://localhost:8080/api/experience
```
Expected:
```json
{
  "status": "success",
  "message": "Experience retrieved successfully",
  "data": {
    "internships": [...],
    "courses": [...]
  }
}
```
✅ Status: 200 OK

---

### Using Postman

#### Import Collection
1. Create new Postman Collection: "Portfolio API Tests"
2. Add requests:

**Request 1: Health Check**
- Method: GET
- URL: `{{baseUrl}}/health`
- Tests: Check status code is 200

**Request 2: Contact Form**
- Method: POST
- URL: `{{baseUrl}}/contact`
- Body (JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "subject": "Test Subject",
  "message": "This is a test message with sufficient length."
}
```
- Tests:
  - Status code is 201
  - Response body has "success" status
  - Response has data.id

**Request 3: Contact Form - Validation**
- Method: POST
- URL: `{{baseUrl}}/contact`
- Body (JSON): Missing required fields
- Tests:
  - Status code is 400
  - Response has errors

---

## Database Testing

### Verify Data Persistence
```sql
-- Connect to database
mysql -u root -p portfolio_db

-- Check if tables exist
SHOW TABLES;

-- View contact messages
SELECT * FROM contact_messages;

-- Count messages
SELECT COUNT(*) FROM contact_messages;

-- View message details
SELECT id, name, email, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 5;

-- Check specific email
SELECT * FROM contact_messages WHERE email = 'john@example.com';
```

---

## Performance Testing

### Load Testing with Apache JMeter
1. Download JMeter from apache.org
2. Create test plan:
   - Number of threads: 100
   - Ramp-up: 10 seconds
   - Loop count: 10
3. Add HTTP Request:
   - URL: http://localhost:8080/api/projects
   - Method: GET
4. Run and view results

### Response Time Benchmarks
- Health check: < 50ms
- Get projects: < 100ms
- Get skills: < 100ms
- Contact submission: < 200ms
- Resume download: < 500ms

---

## Security Testing

### CORS Testing
```bash
# Test CORS from different origin
curl -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type" \
  -X OPTIONS http://localhost:8080/api/contact -v
```
Expected: Access-Control headers in response

### Input Validation Testing
- [ ] Test SQL injection: `' OR '1'='1`
- [ ] Test XSS: `<script>alert('xss')</script>`
- [ ] Test long strings: 5000+ character message
- [ ] Test special characters: `"@#$%^&*()`
- [ ] Test Unicode: `你好世界 مرحبا`

---

## Edge Cases & Bug Fixes

### Frontend Edge Cases
- [ ] Very long project titles
- [ ] Very long skill names
- [ ] Rapidly opening/closing modals
- [ ] Clicking links while scrolling
- [ ] Network offline scenarios
- [ ] Very slow network (throttle)
- [ ] Very slow device (mobile)

### Backend Edge Cases
- [ ] Duplicate contact submissions
- [ ] Same name different emails
- [ ] Maximum character length inputs
- [ ] Concurrent requests
- [ ] Database connection loss
- [ ] Invalid JSON in request

---

## CI/CD Testing

### Automated Testing with GitHub Actions
Create `.github/workflows/test.yml`:
```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    - name: Set up Java
      uses: actions/setup-java@v2
      with:
        java-version: '17'
    - name: Run tests
      run: mvn test
    - name: Build
      run: mvn clean package
```

---

## Test Report Template

```
Test Date: 2026-04-06
Tester: Monisha P
Environment: Local Development
Browser: Chrome 120
Backend: Spring Boot 3.2.9
Database: MySQL 8.0

SUMMARY
=======
Total Tests: 50
Passed: 48 ✅
Failed: 2 ❌
Skipped: 0

FAILURES
========
1. Contact form - Long message handling
2. Modal - Esc key close (not implemented)

RECOMMENDATIONS
===============
- Implement Esc key functionality for modal
- Add character counter for long messages
- Optimize image loading in project section

Next Review: 2026-04-13
```

---

## Continuous Testing Checklist

**Daily:**
- [ ] Frontend loads without errors
- [ ] API health check passes
- [ ] Contact form works
- [ ] Database queries responsive

**Weekly:**
- [ ] Full API test suite
- [ ] Frontend cross-browser testing
- [ ] Performance benchmarks
- [ ] Security scan

**Monthly:**
- [ ] Load testing
- [ ] Accessibility audit
- [ ] SEO check
- [ ] User experience testing

---

## Sign-off

By following this testing guide, you ensure:
✅ All features work as expected
✅ User experience is smooth
✅ API responses are valid
✅ Data is properly stored
✅ Performance is acceptable
✅ Security is maintained

Happy Testing! 🚀
