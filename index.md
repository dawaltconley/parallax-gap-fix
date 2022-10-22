---
layout: default
---

<div class="parallax-group screen-height">
  <div class="parallax-bg-deep bg-1 arrows"></div>
  <div class="parallax-bg-middle content arrows">

# {{ site.title }}

This page uses [Kieth Clark's Pure CSS parallax
layout.](https://keithclark.co.uk/articles/pure-css-parallax-websites/)
It works fine without scrollbars, or with the default Mac scrollbars for
trackpads, which do not change the width of the scrolling element.

  </div>
</div>
<div class="content base-layer screen-height arrows">

## Try forcing scrollbars

On Mac, you can do this by going to `System Preferences > General`
and setting `Show scroll bars` to `Always.` This also happens under the
default settings whenever a USB mouse is connected.

</div>
<div class="parallax-group screen-height">
  <div class="parallax-bg-middle bg-2 arrows"></div>
  <div class="parallax-bg-shallow content arrows">

## Do you see it now?

A red strip of document body peeking past the parallax background. This
is because the scrollbar changes the inner width of an element, but not
the total size, in which the 3D space for parallax elements is rendered.

  </div>
</div>
<div class="content base-layer screen-height arrows">

## How do I fix it?

You can try some of my fixes using the menu in the top left. The first
pair modifies the `perspective-origin` and `transform-origin`
properties. The second adds padding and negative margins to offset the
scrollbar.

</div>
<div class="parallax-group screen-height">
  <div class="parallax-bg-middle bg-3 arrows"></div>
  <div class="parallax-bg-shallow content arrows">

## Browser Inconsistencies

When I initially wrote this in  2018, Safari rendered 3D space
differently than other modern browsers, making every solution imperfect.
Fixes 1a and 2a were slightly misaligned on Safari, while fixes 1b and
2b only worked on Safari.

  </div>
</div>

<div class="content base-layer screen-height arrows">

## Verdict?

At least since Safari 14.1.2, this is no longer a problem. Fixes
1a and 2a are aligned across all modern browsers, and the extra
padding of fixes 2a and 2b, which accounted for browser
inconsistencies, is no longer needed.

**Fix 1a is the best solution.**

</div>
