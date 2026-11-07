# syllabus prototype

Final prototype for my CS 6750 individual project: a mock of the Canvas Syllabus page with a new way to build the syllabus. Everything in it is made up (the course, the people, the books, the dates) and nothing gets saved. Reload the page or hit Restart in the orange bar to start over.

## run it

```
npm install
npm run dev
```

Then open the address vite prints. `npm run build` makes the static version in `dist/`.

## url params

These are shortcuts so I can jump to a screen without clicking through everything each time.

- `?theme=gt` or `?theme=du` picks the school colors, logo and nav. No theme gives the plain canvas look.
- `?scene=imported`, `blank`, `reviewed`, `preview`, `published` or `startagain` starts from that point in the flow.
- `?view=student` starts in student view.
- `?dialog=file`, `course` or `scanning` opens that dialog on the start screen.
- `?edit=instructor` (or `objectives`, `grading`, `materials`, `readings`, `catalog`, `meetings`) opens that block for editing.
- `?reader=1` opens the Immersive Reader. Add `read=1` to start reading, `focus=1` for line focus, `nospeech=1` to keep the voice off.
- `?scrolltest=400` scrolls the page down on load.
