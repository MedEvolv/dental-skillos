# Dental SkillOS | MirrorDex v0
## Clinical Implementation Brief

**Prepared for:** Dental Educators & Clinical Faculty  
**From:** ArchLife / SkillData Lab  
**Date:** May 2026  
**Status:** Masters' Union Demo Prototype

---

## The Problem We're Solving

Dental education has successfully digitized **knowledge delivery** (lectures, notes, MCQs, AI tutors), but **embodied skill acquisition** remains trapped in an analog bottleneck:

- **Delayed Feedback:** Students practice for hours, receive feedback days later
- **Subjective Assessment:** Evaluation quality varies by faculty availability and individual instructor bias  
- **No Progress Tracking:** Students cannot see objective improvement metrics over time
- **Physical Skills Gap:** 40% of students struggle specifically with indirect vision (mirror-guided work)

---

## The Innovation: Scaled Digital Targets

### Why Traditional Targets Fall Short

Standard printed target sheets (A4 size) fail to replicate the **submillimeter precision** required in actual clinical dentistry:

| Aspect | Printed Sheet | Clinical Reality |
|--------|--------------|------------------|
| **Working Area** | 210mm × 297mm (A4) | 2-10mm (single tooth) |
| **Required Precision** | Millimeter | Submillimeter (0.1-0.5mm) |
| **Visual Field** | Wide, forgiving | Narrow, magnified via mirror |
| **Motor Control** | Gross movements | Micro-adjustments |

### The Solution: Smartphone-Based Miniaturized Targets

We propose displaying targets on **smartphone/tablet screens** at clinical scale (2cm × 2cm active area) to create realistic training conditions:

#### Advantages
1. **Scale Authenticity:** 2cm target area mirrors actual working field size
2. **Variable Difficulty:** Digital targets can adjust path width, complexity, size
3. **Macro Recording:** Second phone records in macro mode for detailed movement analysis
4. **No Consumables:** Unlimited target variations, no printing
5. **Data Integration:** Screen can display timing, attempt tracking, session metadata
6. **Standardized:** Same target across all students, institutions, sessions

---

## Technical Protocol

### Equipment Setup

#### Minimum Viable Setup
```
[Recording Phone - Macro Mode]
         | 15-20cm
         v
+------------------------+
|  [Target Phone/Tablet] | <- 2cm × 2cm active target area
|  (Displaying digital   |    (protected by screen protector)
|   target pattern)      |
+------------------------+
         ^
         | Direct contact or 1-2mm above
    [Dental Mirror]----[Probe/Stylus]
    (Non-dominant)     (Dominant hand)
```

#### Detailed Specifications

**Target Display Device:**
- **Device:** Smartphone or tablet (5" screen minimum)
- **Active Area:** 2cm × 2cm target zone
- **Protection:** Tempered glass screen protector (replaceable)
- **Brightness:** 80-100% (consistent illumination)
- **Orientation:** Landscape, locked rotation

**Recording Device:**
- **Device:** Smartphone with macro capability
- **Mode:** Macro/Pro mode, manual focus
- **Resolution:** 1080p minimum, 4K preferred
- **Frame Rate:** 60fps (captures micro-movements)
- **Position:** 15-20cm from target, 45°-90° angle
- **Lighting:** Ring light or dual LED sources

**Instruments:**
- Dental mirror (#5 standard)
- Dental probe or periodontal explorer
- Optional: Silicone stylus (screen-safe alternative)

### Target Specifications

#### Display Parameters
- **Path Width:** 0.5mm - 2mm (adjustable by difficulty)
- **Path Length:** 15-25mm total
- **Contrast:** Black path on white background (high visibility)
- **Start/End Markers:** Green/Red dots, 2mm diameter

#### Difficulty Progression

| Level | Path Width | Complexity | Target Population |
|-------|-----------|------------|-------------------|
| **Beginner** | 2mm | Simple curve | First-year students |
| **Intermediate** | 1mm | 2-3 direction changes | Preclinical practice |
| **Advanced** | 0.5mm | Complex S-curves, loops | Competency assessment |
| **Expert** | 0.3mm | Micro-detail patterns | Advanced training |

---

## The Task: Mirror-Guided Digital Tracing

### Procedure

1. **Setup:** Position target phone flat, secure recording phone on tripod
2. **Mirror Positioning:** Student places mirror to view screen indirectly
3. **Vision Constraint:** Student looks ONLY at mirror, never directly at screen
4. **Tracing:** Using probe, trace the displayed path from start to end
5. **Recording:** Entire process captured in macro video
6. **Analysis:** AI extracts movement patterns, errors, stability metrics

### What We Measure

Based on macro video analysis:

**Primary Metrics:**
- **Mirror Repositioning Events:** Frequency of mirror angle adjustments
- **Field Loss Duration:** Time target not visible in mirror
- **Direct Vision Cheating:** Instances of looking at target directly
- **Path Deviation:** Distance from ideal path (submillimeter precision)
- **Movement Smoothness:** Jerk/acceleration patterns
- **Completion Time:** Task duration with pause detection

**Derived Insights:**
- Hand stability under indirect vision
- Mirror control skill progression
- Fatigue indicators (tremor, drift, hesitation)
- Learning curve trajectory
- Individual error patterns

---

## Implementation for Your Institution

### Pilot Study Design

**Phase 1: Feasibility (2 weeks)**
- 5-10 volunteer students
- 3 attempts per student
- Compare smartphone targets vs. traditional methods
- Faculty feedback on protocol

**Phase 2: Validation (4 weeks)**  
- 30+ students across cohorts
- Pre/post competency assessment correlation
- Faculty grading alignment study
- Student experience surveys

**Phase 3: Integration (Ongoing)**
- Curriculum integration
- Automated progress tracking
- Faculty dashboard deployment

### Required Resources

**Per-Student Kit (~$50-100):**
- 1× Target phone (can be student's own device)
- 1× Recording phone (shared pool of 5-10 devices)
- 1× Phone tripod/stand
- 1× Ring light
- Screen protectors (bulk, replaceable)

**Infrastructure:**
- Secure video storage (HIPAA-compliant if patient data ever involved)
- Faculty review interface
- Student feedback portal

### Faculty Workflow

1. **Assign Task:** Student receives target pattern via app
2. **Practice Session:** Student records attempt using protocol
3. **Upload:** Video + metadata submitted automatically
4. **AI Analysis:** Automated extraction of metrics (2-5 minutes)
5. **Faculty Review:** Dashboard shows video + AI insights
6. **Feedback:** Faculty adds comments, approves/revises AI assessment
7. **Student Report:** Structured feedback delivered within minutes

---

## Clinical Relevance

### Direct Transferable Skills

This exercise develops competencies critical for:

- **Restorative Dentistry:** Mirror-guided cavity preparation, matrix placement
- **Endodontics:** Canal location and instrumentation under rubber dam
- **Periodontics:** Subgingival scaling and root planing visualization
- **Prosthodontics:** Crown preparation margin visibility
- **Oral Surgery:** Third molar extraction site visualization

### Validity Argument

The 2cm digital target protocol addresses:

1. **Fidelity:** Submillimeter precision matches clinical requirements
2. **Reliability:** Standardized targets eliminate variation
3. **Sensitivity:** Macro recording captures micro-movements invisible to naked eye
4. **Specificity:** Errors correlate with clinical performance issues
5. **Utility:** Immediate feedback accelerates learning curves

---

## Deliverables Included

This package contains:

1. **`digital-target-display.html`** - Run on target phone/tablet
   - Interactive target generator
   - Difficulty adjustment
   - Session timer
   - Attempt tracking

2. **`target-sheets-print.html`** - Traditional printed option
   - A4 formatted targets
   - Multiple difficulty levels
   - Instructions for students

3. **`recording-protocol-clinical.md`** - Detailed technical specifications
   - Camera positioning
   - Lighting requirements
   - Quality standards
   - Troubleshooting

4. **`faculty-dashboard-preview.html`** - Demo of instructor interface
   - Video playback with event overlays
   - Metrics visualization
   - Comparison tools
   - Feedback entry

---

## Research Opportunities

We welcome collaboration on:

- **Validation Studies:** Correlation with clinical competency exams
- **Learning Curves:** Longitudinal skill acquisition tracking
- **Intervention Studies:** Feedback timing and format optimization
- **Cross-Institutional:** Multi-site implementation and comparison
- **AI Development:** Automated error detection improvement

---

## Contact & Next Steps

**For implementation support:**  
ArchLife / SkillData Lab  
Masters' Union Demo Prototype

**To pilot this system:**
1. Review enclosed target display and protocol
2. Set up single-station pilot with volunteer students
3. Collect 10-20 practice videos
4. Schedule feedback session with our team

---

## Appendices

### A. Target Pattern Library

Included patterns (scalable 0.3mm - 2mm path width):

- **Basic Curves:** Single arc, S-curve
- **Angular Paths:** Zigzag, staircase
- **Complex:** Figure-8, loop-de-loop
- **Dental Analogs:** Crown outline, cavity prep shape

### B. Sample Metrics Report

See enclosed sample report showing:
- Event timeline overlay on video
- Stability score (0-100)
- Smoothness score (0-100)
- Error classification and frequency
- Personalized practice recommendations

### C. Equipment Suppliers

**Recommended (no affiliation):**
- Ring lights: Neewer, UBeesize ($15-30)
- Phone tripods: Manfrotto, JOBY ($20-50)
- Screen protectors: Any tempered glass ($5-10)
- Recording apps: Filmic Pro, ProCamera (iOS/Android)

---

*This document is for clinical evaluation purposes. The Dental SkillOS system is a research prototype and not yet validated for regulatory approval or standardized competency assessment.*
