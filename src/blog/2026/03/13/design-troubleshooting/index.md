---
layout: layouts/base.njk
tags:
  - blog
title: Design Troubleshooting Post
description: A diagnostic post that verifies images, code blocks, quotes, and LaTeX rendering.
---
This post is a single diagnostic page for checking **readability** and feature support. It intentionally includes long paragraphs, media, code, quotations, and equations.

## Image rendering

The first figure checks responsive behavior, default spacing, and caption styling.

<figure>
  <img src="./assets/diagram.svg" alt="Two side-by-side blocks labeled Image A and Image B on a soft neutral background." />
  <figcaption>Figure 1. Two-panel placeholder image for checking width and typographic spacing around figures.</figcaption>
</figure>

And a second image to test flow after text:

![A curved line illustration labeled Detail Figure.](./assets/detail.svg)

## Block quote styling

> Typography is not decoration. It is the architecture of language made visible.
>
> — A useful principle for this site

## Code block rendering

```js
function summarizePost(post) {
  const words = post.split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.round(words / 220));
  return { words, readingMinutes };
}

console.log(summarizePost("Readable writing over visual noise."));
```

```css
.content {
  max-width: 46rem;
  line-height: 1.78;
}
```

## LaTeX rendering

Inline math should work: $e^{i\pi} + 1 = 0$.

Display math should also work:

$$
\nabla \cdot \vec{E} = \frac{\rho}{\varepsilon_0}
$$

Another expression for spacing checks:

$$
\operatorname*{arg\,min}_{\theta} \sum_{i=1}^{n} \left(y_i - f_\theta(x_i)\right)^2
$$

## Embed rendering

The iframe below is a rendering test for embedded media behavior and responsive scaling:

<iframe
  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
  title="Embedded video rendering test"
  loading="lazy"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
></iframe>

## Final checklist

- Images render from local post assets.
- Code blocks preserve formatting and horizontal scroll behavior.
- Block quotes are visually distinct and readable.
- Inline and display LaTeX are rendered correctly.
- Iframe embeds render and remain responsive.
