package com.monishap.portfolio.dto;

public class ProjectDTO {
    private String id;
    private String title;
    private String description;
    private String category;
    private String[] technologies;
    private String[] features;
    private String impact;

    public ProjectDTO(String id, String title, String description, String category, 
                     String[] technologies, String[] features, String impact) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.technologies = technologies;
        this.features = features;
        this.impact = impact;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String[] getTechnologies() { return technologies; }
    public void setTechnologies(String[] technologies) { this.technologies = technologies; }

    public String[] getFeatures() { return features; }
    public void setFeatures(String[] features) { this.features = features; }

    public String getImpact() { return impact; }
    public void setImpact(String impact) { this.impact = impact; }
}
