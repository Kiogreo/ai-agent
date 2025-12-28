---
description: "Analyze exercise form with privacy protection and safety focus"
arguments:
  - name: exercise
    type: string
    description: "Exercise name being performed"
    required: true
  - name: description
    type: string
    description: "Text description of form or technique"
  - name: image_url
    type: string
    description: "URL of form image (privacy consent required)"
---

# Analyze Form Command

## Overview
Provides detailed exercise form analysis with safety recommendations and technique corrections.

## Process
1. Verify privacy consent for image analysis
2. Analyze exercise mechanics and form
3. Provide correction feedback
4. Suggest safer alternatives if needed

## Usage Examples
- `/analyze-form exercise="bench press" description="bar path feels off"`
- `/analyze-form exercise="squat" image_url="https://example.com/form.jpg"`

## Safety Notes
- Always prioritizes safety over performance
- Recommends professional assessment for complex issues
- Provides immediate corrective actions for high-risk form