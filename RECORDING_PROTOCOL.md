# Dental SkillOS - Video Recording Protocol

## Task: Mirror-Guided Target Tracing

### Equipment Setup

#### Required Materials
- **Dental mirror** (standard mouth mirror, #5 or similar)
- **Probe/stylus** (dental probe, pencil, or similar pointing instrument)
- **Target sheet** - Print provided target (see `/assets/target-sheet.pdf` or create a simple path: circle, zigzag, or curved line on A4 paper)
- **Recording device** - Smartphone or webcam (1080p minimum, 30fps)
- **Phone stand/tripod** - MUST use stable mount (no hand-holding)
- **Lighting** - 2 light sources minimum (desk lamp + overhead room light)

#### Workspace Configuration
```
        [CAMERA]
           |
           |  45-60cm distance
           v
    +--------------+
    |   TARGET     |  <- A4 sheet with printed path
    |    SHEET     |
    +--------------+
           ^
           |  Student's hands position here
    [MIRROR]----[PROBE]
```

### Camera Positioning (CRITICAL)

1. **Angle**: Directly overhead (90° to work surface) or slight 15-20° offset
2. **Height**: 45-60cm from target surface (arm's length)
3. **Framing**:
   - ENTIRE target sheet must be visible
   - Both hands must be visible throughout
   - Mirror face should be visible when angled
   - NO camera shake - use timer delay or remote trigger

4. **Settings**:
   - Resolution: 1080p or higher
   - Frame rate: 30fps minimum
   - Focus: Lock focus on target sheet (tap and hold before recording)
   - Exposure: Lock exposure to prevent flickering

### Recording Procedure

#### Pre-Recording Checklist
- [ ] Target sheet placed flat, secured with tape
- [ ] Camera locked in position, framing checked
- [ ] Lighting balanced (no harsh shadows)
- [ ] Focus and exposure locked
- [ ] Mirror and probe within arm's reach
- [ ] 10-second test recording reviewed

#### Positioning Protocol
1. **Sit comfortably** - elbows resting, shoulders relaxed
2. **Non-dominant hand** - holds mirror, positioned to view target indirectly
3. **Dominant hand** - holds probe, ready to trace
4. **Head position** - looking at mirror reflection, NOT at target directly
5. **Camera view check** - ensure both hands + target are fully visible

#### Recording Steps
1. Start recording (5-second countdown timer recommended)
2. State clearly: "Attempt [number], Participant [ID], Date [today]"
3. Begin task: Trace the target path using mirror vision only
4. Complete full path from start to finish
5. State clearly: "Complete"
6. Wait 3 seconds, stop recording

### Target Sheet Specification

**Standard Target**: A4 paper with:
- **Start point**: Green circle (2cm diameter)
- **Path**: Black line, 3mm width, winding path with 3-4 direction changes
- **End point**: Red circle (2cm diameter)
- **Total path length**: ~25-30cm
- **Path types**: Mix of curves and straight segments

**Alternative targets for variety**:
- Simple: Large circle (10cm diameter) to trace
- Complex: Figure-8 pattern
- Advanced: Small detailed shapes within larger path

### Quality Standards

#### Acceptable Video Criteria
- [ ] Minimum 1080p resolution
- [ ] Stable frame (no camera movement)
- [ ] Consistent lighting (no flickering)
- [ ] Entire task visible in frame
- [ ] Audio clear (for attempt announcements)
- [ ] Duration: 2-5 minutes typical

#### Reject/Retake If
- Camera moves during recording
- Target goes out of frame
- Lighting changes significantly
- Task is interrupted
- Audio is unusable

---

## Demo Video Creation Plan

### Overview
Create 3 staged demonstration videos showing different skill levels for the indirect vision task.

### Video 1: "Attempt 1 - Poor Performance"
**Duration**: ~3 minutes (200 seconds)
**Scenario**: First-time student, struggling with mirror control

**Script/Actions**:
- 0:00-0:10 - Setup, announcement: "Attempt 1, Student Demo, poor performance example"
- 0:10-0:30 - First segment: frequent mirror adjustments (3-4 repositioning events)
- 0:30-1:00 - Loses target in mirror, field loss event, recovers with direct vision glance
- 1:00-2:00 - Middle segment: shaky tracing, goes outside path lines (target misses)
- 2:00-3:00 - Fatigue showing, posture starts to drift, more hesitation pauses
- 3:00-3:20 - Finishes path, announcement: "Complete"

**Key Behaviors to Demonstrate**:
- Mirror repositioning every 15-20 seconds
- Looking directly at target (cheating)
- Shaky, uncertain movements
- Losing target in mirror reflection
- Going outside path boundaries
- Shoulder tension/posture issues

---

### Video 2: "Attempt 2 - Improved Performance"
**Duration**: ~2 minutes 45 seconds (168 seconds)
**Scenario**: Same student after practice, showing improvement

**Script/Actions**:
- 0:00-0:10 - Setup, announcement: "Attempt 2, Student Demo, improved performance"
- 0:10-1:00 - First segment: smoother, fewer mirror adjustments (1-2 total)
- 1:00-2:00 - Middle segment: consistent pace, stays within path
- 2:00-2:45 - Final segment: confident completion
- 2:45-2:50 - Finishes, announcement: "Complete"

**Key Behaviors to Demonstrate**:
- Stable mirror position for longer periods
- Consistent indirect vision (no cheating)
- Smooth, controlled movements
- Maintains path boundaries
- Better posture
- Faster completion time

---

### Video 3: "Attempt 3 - Fatigue Case"
**Duration**: ~4 minutes (245 seconds)
**Scenario**: Late-session performance degradation

**Script/Actions**:
- 0:00-0:10 - Setup, announcement: "Attempt 3, Student Demo, fatigue case"
- 0:10-1:30 - First half: starts reasonably well but slower
- 1:30-2:30 - Middle: posture visibly deteriorating, forward head position
- 2:30-3:30 - Late segment: performance declining, more errors, hesitation
- 3:30-4:00 - Final push to complete, multiple target misses
- 4:00-4:05 - Finishes, announcement: "Complete"

**Key Behaviors to Demonstrate**:
- Starts okay but progressively worsens
- Longer pauses between movements
- Posture drift (forward head, rounded shoulders)
- Increased error rate in final third
- Visible signs of fatigue (hand shake, slower reactions)

---

## Technical Specifications for Demo Videos

### Filming Setup
- Use the exact same setup as student recordings
- Consistent lighting across all 3 videos
- Same target sheet
- Same camera position
- Same person as "actor" (ideally someone who can act the skill levels)

### Post-Processing
- Trim to clean start/end (remove setup time before announcement)
- Keep raw footage, no filters or corrections
- Export as MP4, H.264 codec
- Resolution: 1920x1080
- Frame rate: 30fps
- Bitrate: 5-10 Mbps

### File Naming
```
/demo/
  ├── attempt1-poor.mp4       -> rename to attempt1.mp4
  ├── attempt2-improved.mp4   -> rename to attempt2.mp4
  └── attempt3-fatigue.mp4    -> rename to attempt3.mp4
```

---

## Integration with App

Place videos in:
```
/public/demo/
  ├── attempt1.mp4
  ├── attempt2.mp4
  └── attempt3.mp3
```

The app references these in `sampleData.ts`:
- S001: attempt1.mp4 (200 sec duration)
- S002: attempt2.mp4 (168 sec duration)
- S003: attempt3.mp4 (245 sec duration)

Make sure actual video durations match the sample data durations closely.
