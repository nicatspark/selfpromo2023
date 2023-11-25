---
layout: '../../layouts/BlogPost.astro'
title: 'Scroll inline a page using css with transitions thanks to :target pseudo selector'
description: ''
pubDate: 'Jan 10 2023'
heroImage: '/placeholder-hero.jpg'
draft: true
---

CSS is getting more and more competent to do what JS has solved for a long time. The benefit of using CSS is that it is very performant and rarely glitches.

##### Example

```js
<!DOCTYPE html>
<html>
<head>
<style>
html {
  scroll-behavior: smooth;
}
div:target {
  background-color:red;
}
.tab div {
  display: none;
}

.tab div:target {
  display: block;
}
div > div {
 margin-top: 100vw;
}
</style>
</head>
<body>

<div class="tab">

<a href="#link1">Link 1</a>
<a href="#link2">Link 2</a>
<a href="#link3">Link 3</a>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis maiores esse reprehenderit error sunt sequi molestias corporis omnis debitis voluptatibus ipsum impedit laborum quis ex, vel veniam iure ipsa eum?
Eos recusandae culpa odio quod at quasi nemo, doloremque totam, cumque non animi atque et officia, vitae mollitia sapiente unde. Molestiae voluptatum tempore excepturi quo. Ex magnam perspiciatis molestias vitae!
Debitis modi laboriosam, accusantium nihil consequuntur quam fugiat totam dolorum aliquid ducimus veritatis ab, eaque, doloribus magni. Molestias sint, pariatur dolore id hic perspiciatis labore consequatur inventore architecto, vitae odit.
Excepturi, voluptate? Repellat ea quisquam pariatur perferendis distinctio minima deserunt veritatis, illum laboriosam adipisci iusto, molestias qui aliquam optio quia saepe at provident numquam vero! Qui ullam a pariatur rem?
Corrupti dolorum deserunt quod ab odio culpa fuga, praesentium iste ex. Explicabo minima animi id? Tempore voluptatum eaque inventore quidem voluptates suscipit quia amet omnis alias consectetur, laboriosam dicta quos!</p>

<div id="link1">
  <h3>Content to Link 1</h3>
  <p>Hello World!</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis maiores esse reprehenderit error sunt sequi molestias corporis omnis debitis voluptatibus ipsum impedit laborum quis ex, vel veniam iure ipsa eum?
Eos recusandae culpa odio quod at quasi nemo, doloremque totam, cumque non animi atque et officia, vitae mollitia sapiente unde. Molestiae voluptatum tempore excepturi quo. Ex magnam perspiciatis molestias vitae!
Debitis modi laboriosam, accusantium nihil consequuntur quam fugiat totam dolorum aliquid ducimus veritatis ab, eaque, doloribus magni. Molestias sint, pariatur dolore id hic perspiciatis labore consequatur inventore architecto, vitae odit.
Excepturi, voluptate? Repellat ea quisquam pariatur perferendis distinctio minima deserunt veritatis, illum laboriosam adipisci iusto, molestias qui aliquam optio quia saepe at provident numquam vero! Qui ullam a pariatur rem?
Corrupti dolorum deserunt quod ab odio culpa fuga, praesentium iste ex. Explicabo minima animi id? Tempore voluptatum eaque inventore quidem voluptates suscipit quia amet omnis alias consectetur, laboriosam dicta quos!</p>
</div>

<div id="link2">
  <h3>Content to Link 2</h3>
  <h4>Great success!</h4>
</div>

<div id="link3">
  <h3>Content to Link 3</h3>
  <p>Yeah!</p>
</div>

</div>

</body>
</html>
```
