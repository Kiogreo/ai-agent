---
description: "Track fitness progress with comprehensive analysis and bear aesthetic focus"
arguments:
  - name: period
    type: string
    description: "Time period to analyze (week, month, quarter)"
    default: "week"
  - name: include_measurements
    type: boolean
    description: "Include body measurements in analysis"
    default: true
  - name: detailed_report
    type: boolean
    description: "Generate detailed progress report"
    default: false
---

# Track Progress Command

## Overview
Analyzes recent training progress, Liftosaur data, and measurements to provide comprehensive feedback on bear aesthetic development.

## Process
1. Retrieve workout data from Liftosaur
2. Analyze progress against bear aesthetic priorities
3. Generate progress report with recommendations
4. Provide motivational feedback

## Usage Examples
- `/track-progress` - Quick weekly progress check
- `/track-progress period=month` - Monthly comprehensive review
- `/track-progress detailed_report=true` - Full detailed analysis

## Output
- Progress summary with key metrics
- Achievement highlights
- Areas for improvement
- Next training recommendations
- Motivational encouragement