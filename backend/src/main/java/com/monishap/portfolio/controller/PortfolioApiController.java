package com.monishap.portfolio.controller;

import com.monishap.portfolio.dto.ApiResponse;
import com.monishap.portfolio.dto.ProjectDTO;
import com.monishap.portfolio.service.ProjectService;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PortfolioApiController {

    private final ProjectService projectService;

    public PortfolioApiController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/projects")
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> getProjects() {
        List<ProjectDTO> projects = projectService.getAllProjects();
        return ResponseEntity.ok(new ApiResponse<>("success", "Projects retrieved successfully", projects));
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<ApiResponse<ProjectDTO>> getProjectById(@PathVariable String id) {
        ProjectDTO project = projectService.getProjectById(id);
        return ResponseEntity.ok(new ApiResponse<>("success", "Project retrieved successfully", project));
    }

    @GetMapping("/skills")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getSkills() {
        Map<String, Object> skills = new HashMap<>();
        
        skills.put("programming", new String[]{"Python", "Java", "C", "C++"});
        skills.put("web", new String[]{"HTML", "CSS", "JavaScript", "React.js"});
        skills.put("database", new String[]{"MySQL", "SQL"});
        skills.put("ai_ml", new String[]{"Machine Learning", "Generative AI", "NLP", "TensorFlow"});
        skills.put("cloud", new String[]{"Oracle Cloud", "AWS Basics"});
        skills.put("tools", new String[]{"Git", "Docker", "Maven", "Jupyter", "VS Code", "Figma"});
        
        return ResponseEntity.ok(new ApiResponse<>("success", "Skills retrieved successfully", skills));
    }

    @GetMapping("/experience")
    public ResponseEntity<ApiResponse<Object>> getExperience() {
        Map<String, Object> experience = new HashMap<>();
        experience.put("internships", new Object[]{
                new HashMap<String, String>() {{
                    put("company", "Oracle");
                    put("position", "AI Intern");
                    put("year", "2025");
                    put("description", "Worked on AI-driven solutions, gained enterprise experience");
                }}
        });
        experience.put("courses", new Object[]{
                new HashMap<String, String>() {{
                    put("name", "AI Foundation Course");
                    put("date", "Oct 2025");
                }},
                new HashMap<String, String>() {{
                    put("name", "Generative AI Course");
                    put("date", "Nov 2025");
                }}
        });
        
        return ResponseEntity.ok(new ApiResponse<>("success", "Experience retrieved successfully", experience));
    }

    @GetMapping("/certifications")
    public ResponseEntity<ApiResponse<Object>> getCertifications() {
        Object[] certifications = new Object[]{
                new HashMap<String, String>() {{
                    put("title", "Oracle AI Foundation");
                    put("year", "2025");
                }},
                new HashMap<String, String>() {{
                    put("title", "AICTE AI & ML Training");
                    put("year", "2025");
                }},
                new HashMap<String, String>() {{
                    put("title", "Generative AI Certification");
                    put("year", "2025");
                }}
        };
        
        return ResponseEntity.ok(new ApiResponse<>("success", "Certifications retrieved successfully", certifications));
    }

    @GetMapping("/about")
    public ResponseEntity<ApiResponse<Map<String, String>>> getAbout() {
        Map<String, String> about = new HashMap<>();
        about.put("name", "Monisha P");
        about.put("title", "Aspiring AI & ML Engineer");
        about.put("bio", "A motivated and goal-oriented learner passionate about developing intelligent solutions using AI, ML, and generative technologies.");
        about.put("location", "Bangalore, India");
        about.put("email", "monishap2038008@gmail.com");
        about.put("phone", "+91 9942004625");
        
        return ResponseEntity.ok(new ApiResponse<>("success", "About information retrieved successfully", about));
    }

    @GetMapping("/resume")
    public ResponseEntity<ClassPathResource> downloadResume() {
        try {
            ClassPathResource resume = new ClassPathResource("resume/sample-resume.pdf");
            if (!resume.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=MonishaP_Resume.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(resume);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<String>> health() {
        return ResponseEntity.ok(new ApiResponse<>("success", "API is running", "Monisha P Portfolio API v1.0"));
    }
}
