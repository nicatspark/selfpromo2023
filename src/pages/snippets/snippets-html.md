---
layout: '../../layouts/BlogPost.astro'
title: 'The lesser used HTML'
description: 'Think you know all about HTML?'
pubDate: 'Jan 7 2023'
---

##### Tooltip

````html
<p> <abbr title="World Health Organization">WHO</abbr> was founded in 1948. </p>
<p title="Free Web tutorials">W3Schools</p>
``` ##### Download ```html
<a href="/images/myw3schoolsimage.jpg" download></a>
<!-- or -->
<a href="link/to/your/file" download="filename">Download link</a>
````

##### Word break

```html
<p
  >This is a
  veryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryvery<wbr />longwordthatwillbreakatspecific<wbr />placeswhenthebrowserwindowisresized.</p
>
```

##### Text direction

```html
<p dir="auto">This text is following dir=auto</p>
```

##### Basic Accordion

````html
<details>
  <summary>Epcot Center</summary>
  <p
    >Epcot is a theme park at Walt Disney World Resort featuring exciting
    attractions, international pavilions, award-winning fireworks and seasonal
    special events.</p
  >
</details>

##### Content editable ```html
<p contenteditable="true"
  >This is a paragraph. Click the button to make me editable.</p
>
<script>
  const x = document.getElementById('myP').isContentEditable
</script>
````

##### add captions

````html
<video width="320" height="240" controls>
  <source src="forrest_gump.mp4" type="video/mp4" />
  <source src="forrest_gump.ogg" type="video/ogg" />
  <track
    src="fgsubtitles_en.vtt"
    kind="subtitles"
    srclang="en"
    label="English"
  />
  <track
    src="fgsubtitles_no.vtt"
    kind="subtitles"
    srclang="no"
    label="Norwegian"
  />
</video>
<p
  >With just HTML, you can add captions to your video files using the
  <track /> element. Use the src attribute to point to the subtitles file and
  use the srclang attribute to set the language.</p
>
``` ##### Lazy loading ```html
<img src="/w3images/wedding.jpg" alt="Wedding" style="width: 100%" />
<img src="/w3images/rocks.jpg" alt="Rocks" style="width: 100%" />
``` ##### off-screen images ```html
<img src="/w3images/paris.jpg" alt="Paris" style="width: 100%" loading="lazy" />
<img
  src="/w3images/nature.jpg"
  alt="Nature"
  style="width: 100%"
  loading="lazy"
/>
<img
  src="/w3images/underwater.jpg"
  alt="Underwater"
  style="width: 100%"
  loading="lazy"
/>
<img src="/w3images/ocean.jpg" alt="Ocean" style="width: 100%" loading="lazy" />
<img
  src="/w3images/mountainskies.jpg"
  alt="Mountains"
  style="width: 100%"
  loading="lazy"
/>
````

##### Base url

````html
<head>
  <base href="https://www.w3schools.com/" target="_blank" />
</head>

<body>
  <img src="images/stickman.gif" width="24" height="39" alt="Stickman" />
  <a href="tags/tag_base.asp">HTML base Tag</a>
</body>
``` ##### Controlling Context Menu and Paste ```html
<input type="text" onpaste="return false" value="Paste something in here" />
<div oncontextmenu="myFunction()" contextmenu="mymenu">
  ``` ##### Spellcheck ```html
  <p contenteditable="true" spellcheck="true"
    >This is a praggagraph. It is editable. Try to change the text.</p
  >
</div>
```
````
