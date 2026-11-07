# syllabus prototype plan

CS 6750 individual project. Goal: build the final prototype of the syllabus page editor so it looks like the real Canvas page and runs on fake data.

I'll build it a little at a time and commit after every piece. Started with plain html, moved to vite + react once the page got bigger. GT theme first. DU and the plain canvas look come at the end.

## page chrome
- [x] orange alert banner across the top
- [x] global nav on the left: width, gt gold, logo
- [x] nav icons, one at a time
- [x] highlight the active nav item
- [x] course header with breadcrumb
- [x] course nav links (the hidden ones get an eye icon)

## front page
- [x] heading "Syllabus"
- [x] three boxes: upload a file, copy previous syllabus, start fresh
- [x] step breadcrumb (start, edit and review, preview and publish)

## editor
- [x] list of blocks with edit, done, cancel, move up/down, remove, add a block
- [x] block types: text, instructor info, learning objectives, grading scheme, course summary, materials and readings, policies
- [x] review panel: move all dates, details to check, required statements
- [x] fake file chooser, spinner, course chooser

## preview and student view
- [x] preview page and publish button
- [x] view as student button in the course header
- [x] jump links and the at a glance box
- [x] isbn / doi lookup for materials and readings
- [x] immersive reader (read aloud, text size, color themes, line focus)

## last
- [x] du theme and the plain canvas theme
- [x] restart link in the banner
- [x] readme

## notes
- the InstUI Modal wants shouldCloseOnDocumentClick={false} or the dialogs close when you click outside them

## ideas for later
- real export to word and pdf
- drag and drop to reorder blocks instead of the arrow buttons
- show the syllabus in the real canvas page frame with the other course tools
