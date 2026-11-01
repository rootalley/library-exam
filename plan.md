# syllabus prototype plan

CS 6750 individual project. Goal: build the final prototype of the syllabus page editor so it looks like the real Canvas page and runs on fake data.

I'll build it a little at a time and commit after every piece. Start with plain html, move to vite + react once the page gets bigger. GT theme first. DU and the plain canvas look come at the end.

## page chrome
- [x] orange alert banner across the top
- [x] global nav on the left: width, gt gold, logo
- [ ] nav icons, one at a time
- [ ] highlight the active nav item
- [ ] course header with breadcrumb
- [ ] course nav links (the hidden ones get an eye icon)

## front page
- [ ] heading "Syllabus"
- [ ] three boxes: upload a file, copy previous syllabus, start fresh
- [ ] step breadcrumb (start, edit and review, preview and publish)

## editor
- [ ] list of blocks with edit, done, cancel, move up/down, remove, add a block
- [ ] block types: text, instructor info, learning objectives, grading scheme, course summary, materials and readings, policies
- [ ] review panel: move all dates, details to check, required statements
- [ ] fake file chooser, spinner, course chooser

## preview and student view
- [ ] preview page and publish button
- [ ] view as student button in the course header
- [ ] jump links and the at a glance box
- [ ] isbn / doi lookup for materials and readings
- [ ] immersive reader (read aloud, text size, color themes)

## last
- [ ] du theme and the plain canvas theme
- [ ] restart link in the banner
- [ ] readme
