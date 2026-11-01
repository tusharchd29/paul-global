# Background videos

The homepage plays two muted, looping background videos if these files exist:

| File       | Where it plays                         | Suggested footage                                         |
|------------|----------------------------------------|-----------------------------------------------------------|
| `hero.mp4` | Behind the homepage headline           | Laboratory, pipettes, test tubes, microscope, bioreactor  |
| `lab.mp4`  | "Inside our lab" band on the homepage  | Lab technician at work, fermentation tanks, feed mill      |

If a file is missing, that section keeps its normal blue background, so nothing breaks.

## Getting free footage

Free stock sites with licences that allow commercial use without attribution:
- Pexels: https://www.pexels.com/search/videos/laboratory/
- Pixabay: https://pixabay.com/videos/search/laboratory/
- Mixkit: https://mixkit.co/free-stock-video/laboratory/

Do not use clips taken from other companies' websites. That footage belongs to them.

## Preparing the files

Keep each clip short (10–20 s) and small (ideally under 4 MB), since it loads on every visit.
With ffmpeg:

```
ffmpeg -i input.mp4 -t 15 -an -vf "scale=1920:-2" -c:v libx264 -crf 28 -preset slow -movflags +faststart hero.mp4
```

`-an` removes the audio track (the videos always play muted) and `+faststart` lets playback start before the whole file has downloaded.
