package com.monishap.portfolio.service;

import com.monishap.portfolio.dto.ProjectDTO;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ProjectService {

    public List<ProjectDTO> getAllProjects() {
        return Arrays.asList(
                new ProjectDTO(
                        "1",
                        "Chatbot for Autism Children",
                        "An empathetic AI chatbot designed to support communication and learning for children with autism using conversational AI and NLP.",
                        "Assistive AI",
                        new String[]{"Python", "NLP", "TensorFlow", "UX Design"},
                        new String[]{
                                "Conversational AI with empathetic responses",
                                "Customizable learning modules",
                                "Parent/guardian dashboard",
                                "Progress tracking and analytics"
                        },
                        "Presented at inter-college symposiums with recognition for innovative approach to assistive technology"
                ),
                new ProjectDTO(
                        "2",
                        "AI Recommendation Engine",
                        "A machine learning-powered recommendation system that intelligently suggests content based on user behavior and preferences.",
                        "Machine Learning",
                        new String[]{"Python", "Scikit-learn", "Pandas", "Data Analysis"},
                        new String[]{
                                "Collaborative filtering algorithm",
                                "Content-based recommendations",
                                "Real-time suggestion updates",
                                "Performance metrics dashboard"
                        },
                        "Improved recommendation accuracy by 35% and reduced computation time by 40%"
                ),
                new ProjectDTO(
                        "3",
                        "Oracle Cloud Internship",
                        "Hands-on experience building AI-driven enterprise solutions at Oracle, learning industry best practices and cloud-enabled architecture.",
                        "Enterprise AI",
                        new String[]{"Oracle Cloud", "Java", "AI/ML", "Cloud Architecture"},
                        new String[]{
                                "AI-powered automation workflows",
                                "Cloud resource optimization",
                                "Enterprise data pipeline",
                                "Scalable microservices"
                        },
                        "Gained practical experience with enterprise AI deployment and learned best practices in cloud scalability"
                )
        );
    }

    public ProjectDTO getProjectById(String id) {
        return getAllProjects().stream()
                .filter(project -> project.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Project not found with id: " + id));
    }
}
