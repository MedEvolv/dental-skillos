# Demo Video Creation Guide

This guide walks you through creating the 3 demo videos needed for the Dental SkillOS prototype.

## Prerequisites

### Equipment Needed
- **Camera**: Smartphone with 1080p video capability (iPhone, Android, or webcam)
- **Tripod/Phone Stand**: Essential - NO handheld recording
- **Lighting**: 2 desk lamps or 1 lamp + overhead room light
- **Workspace**: Flat table, plain background

### Materials Needed
- **Dental Mirror**: Standard mouth mirror (can use any small mirror as substitute)
- **Probe**: Dental probe, pencil, pen, or similar pointing instrument
- **Target Sheet**: Print `/public/target-sheet.html` on A4 paper
- **Tape**: To secure target sheet to table

## Setup (Same for All 3 Videos)

### 1. Workspace Configuration
```
        [CAMERA on Tripod]
               |
          45-60cm
               |
               v
    +-------------------+
    |                   |
    |   TARGET SHEET    |  <- Tape to table
    |   (A4, centered)  |
    |                   |
    +-------------------+
           ^
           |
    [Mirror]----[Probe]
    (Left hand) (Right hand)
    
    Student sits at bottom edge, facing target
```

### 2. Camera Settings
- **Position**: Directly overhead or slight angle (15-20°)
- **Height**: 45-60cm from table surface
- **Settings**:
  - Resolution: 1080p or 4K
  - Frame rate: 30fps
  - Focus: Tap and hold to lock focus on target
  - Exposure: Lock to prevent flickering
- **Framing Check**: 
  - [ ] Entire A4 sheet visible
  - [ ] Both hands will be visible
  - [ ] Mirror face visible when angled
  - [ ] No camera shake

### 3. Lighting
- Place 2 light sources at 45° angles to eliminate shadows
- Avoid backlighting (window behind camera, not behind student)
- Test: Look at camera screen - target should be evenly lit

---

## Video 1: Poor Performance (attempt1.mp4)

**Target Duration**: 200 seconds (3 min 20 sec)

### Pre-Recording
- Actor: Practice the "poor" behaviors below
- Do 2-3 practice runs to get timing right
- Have a timer visible to track duration

### Script & Actions

**0:00-0:10** - Setup and Announcement
- Position hands, mirror, probe
- State clearly: "Attempt 1, Student Demo, May 28th"
- Wait 2 seconds, then begin

**0:10-0:30** - First Segment: Struggling to Start
- Mirror adjustments: 3-4 repositioning events
- Hesitate, adjust angle, try again
- Make it look uncertain

**0:30-1:00** - Field Loss & Cheating
- At 0:30: Lose target in mirror, pause 3-4 seconds
- At 0:35: Glance directly at target (cheating)
- Recover and continue

**1:00-2:00** - Shaky Middle Section
- Trace outside the path lines (target misses)
- Shaky, uncertain hand movements
- 2-3 more mirror repositioning events
- Go slow, hesitate frequently

**2:00-3:00** - Fatigue Starting
- Shoulder tension visible (raise shoulders slightly)
- Slower movements
- 2 more mirror adjustments
- Head moves closer to table (poor posture)

**3:00-3:15** - Final Push
- Finish the path
- State: "Complete"
- Wait 3 seconds
- Stop recording

### Key Behaviors Checklist
- [ ] 6+ mirror reposition events total
- [ ] 2 field loss events (target not visible)
- [ ] 2 direct vision switches (cheating)
- [ ] 3 target misses (go outside lines)
- [ ] 1+ hesitation pauses
- [ ] Visible shoulder tension/posture issues
- [ ] Shaky, uncertain movements throughout

---

## Video 2: Improved Performance (attempt2.mp4)

**Target Duration**: 168 seconds (2 min 48 sec)

### Pre-Recording
- Same actor as Video 1
- Practice smooth, confident movements
- Goal: Show clear improvement from Video 1

### Script & Actions

**0:00-0:10** - Setup
- State: "Attempt 2, Student Demo, May 28th"
- Confident posture, ready position

**0:10-1:00** - Strong Start
- 1-2 mirror adjustments maximum
- Smooth, controlled movements
- Stay within path lines
- Consistent pace

**1:00-2:00** - Confident Middle
- No mirror repositioning
- Steady hand
- Maintains indirect vision (no cheating)
- Good posture throughout

**2:00-2:45** - Finish Strong
- Smooth completion
- No errors in final section
- State: "Complete"
- Wait 3 seconds

### Key Behaviors Checklist
- [ ] 3 or fewer mirror reposition events
- [ ] 1-2 field loss events (brief)
- [ ] 1-2 direct vision switches (minimal)
- [ ] 1 or fewer target misses
- [ ] Smooth, confident movements
- [ ] Good posture maintained
- [ ] Faster completion than Video 1

---

## Video 3: Fatigue Case (attempt3.mp4)

**Target Duration**: 245 seconds (4 min 5 sec)

### Pre-Recording
- This simulates late-session fatigue
- Actor should act progressively more tired
- Requires stamina to maintain poor form for 4 minutes

### Script & Actions

**0:00-0:10** - Setup
- State: "Attempt 3, Student Demo, May 28th"
- Start with reasonable posture

**0:10-1:30** - Reasonable Start
- Perform reasonably well first 90 seconds
- 2 mirror adjustments
- Stay on path
- Slightly slower than Video 2

**1:30-2:30** - Decline Begins
- Posture visibly deteriorates
- Head moves forward (forward head posture)
- Shoulders round forward
- Movements become less precise

**2:30-3:30** - Significant Fatigue
- 2+ target misses (go outside lines)
- Longer pauses between movements
- Hand shake visible
- 2 more mirror repositioning events

**3:30-4:00** - Struggling to Finish
- 1-2 more target misses
- Hesitation before each movement
- Poor posture very evident
- Just barely complete the path

**4:00-4:05** - Complete
- State: "Complete" (tired voice)
- Wait 3 seconds

### Key Behaviors Checklist
- [ ] 4+ mirror reposition events
- [ ] 4 target misses (concentrated in final 2 minutes)
- [ ] 1 extended pause (5+ seconds)
- [ ] Progressive posture drift
- [ ] Visible fatigue markers (hand shake, slower reactions)
- [ ] Performance worse in final third
- [ ] Slower overall than Video 1

---

## Post-Processing

### Export Settings
- **Format**: MP4
- **Codec**: H.264
- **Resolution**: 1920x1080
- **Frame rate**: 30fps
- **Bitrate**: 5-10 Mbps

### File Preparation
1. Review each video against the checklist
2. Trim start/end to clean edges (keep the announcement)
3. Verify duration matches target (±5 seconds acceptable)
4. Rename files:
   - Video 1 → `attempt1.mp4`
   - Video 2 → `attempt2.mp4`
   - Video 3 → `attempt3.mp4`

### Placement
Copy files to:
```
/public/demo/
  ├── attempt1.mp4
  ├── attempt2.mp4
  └── attempt3.mp4
```

---

## Verification

After placing videos, test the app:
1. Run `npm run dev`
2. Navigate to Capture screen
3. Click "Attempt 1 (Poor)" demo button
4. Navigate to Report screen
5. Verify video plays and data aligns

## Tips for Success

1. **Same Actor**: Use same person for all 3 for consistency
2. **Same Session**: Film all 3 back-to-back (lighting stays consistent)
3. **Practice**: Do 2-3 practice runs of each scenario
4. **Timer**: Use a visible timer to hit duration targets
5. **Checklist**: Review behavior checklist before each take
6. **Multiple Takes**: Film 2-3 versions of each, pick the best

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Video too short/long | Adjust speed of movements or add/remove hesitation |
| Not enough errors | Act more deliberately, pause longer |
| Camera shake | Check tripod tightness, use timer delay |
| Poor lighting | Add second light source, adjust angles |
| Can't see mirror face | Angle mirror more toward camera |

---

## Expected File Sizes
- attempt1.mp4: ~80-150 MB (3 min 20 sec)
- attempt2.mp4: ~60-120 MB (2 min 48 sec)
- attempt3.mp4: ~100-180 MB (4 min 5 sec)

Total: ~240-450 MB
