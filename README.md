# Parallax Gap Fix

This README and the corresponding [demo](https://dawaltconley.github.io/parallax-gap-fix/) offer some solutions to a bug in pure-CSS parallax websites, which is caused by certain system scrollbars. For reference, the page layout looks something like this:

```
<body>
    <div class="parallax-page">
        <div class="parallax-group">
            <div class="parallax-bg-foo"></div>
            <div class="parallax-bg-bar"></div>
        </div>
        <div>
            Non-parallax content
        </div>
        <div class="parallax-group">
            <div class="parallax-bg-foobar"></div>
        </div>
    </div>
</body>
```

## The Problem

I'm a big fan of [Keith Clark's Pure CSS parallax technique](https://keithclark.co.uk/articles/pure-css-parallax-websites/) and have been using it with some success on one of my own sites. Recently, however, I noticed that the background parallax elements, [even in his own demo](https://keithclark.co.uk/articles/pure-css-parallax-websites/demo3-webkit-overflow-fix/), were not sitting flush on the left side of the screen. They left a small gap, the size of which depends on how far back in the 3D space they were rendered.

Unable to reproduce this problem later, I discovered that the culprit was a particular kind of **system scrollbar**, which OSX uses by default whenever a USB mouse is plugged in. (It can also be turned on manually, by going to `System Preferences > General` and setting `Show scroll bars` to `Always`.)

The scrollbar changes the width of the main view, without changing the 3D perspective, causing 3D-rendered elements to shift out of alignment with the rest of the viewport. This is most noticable as a gap on the left side of the screen, but these elements are also out of alignment with each other.

You can see this clearly in [the demo I made](https://dawaltconley.github.io/parallax-gap-fix/) by checking "Show Center".

## My Fixes

### Fix 1a

This fix takes the intuitive method of changing the [`perspective-origin`](https://github.com/dawaltconley/parallax-gap-fix/blob/master/_sass/_parallax.scss#L26) and [`transform-origin`](https://github.com/dawaltconley/parallax-gap-fix/blob/master/_sass/_parallax.scss#L59) properties. These are set to `right`, based on a tip from Keith Clark's original article that this prevents unwanted horizontal scrolling in webkit browsers. But I've not been able to reproduce that problem so maybe it was fixed. In any case, this pushes the content to the right, into the scrollbar, and away from the left of the viewport. So let's just push them left instead:

```
.parallax-page {
    perspective-origin: left;
}

%parallax-bg {
    transform-origin: left;
}
```

It works! The background elements are sitting flush against the viewport and are all in alignment. So what's the problem?

### Fix 1b

If you try Fix 1a in Safari, you'll see that the red strip of the document body is still there, only now on the right side of the screen. If you want to achieve the same effect in Safari, you'll need to set these properties to `center` instead.

```
.parallax-page {
    perspective-origin: center;
}

%parallax-bg {
    transform-origin: center;
}
```

This is because Safari is the only browser that calculates the size of its 3D space by the _outer_ width of the `parallax-page` element, not the _inner_ width, encroached on by the scrollbars. This might make more sense than the alternative, since an origin of `center` (the default value for both properties) would solve our problem, but as it is, Safari is the odd one out.

### Fix 2a

So let's try something else. The problem isn't really the `perspective-origin`, since this would have no effect if `parallax-group` child elements were just centered within their `parallax-page` parent. Here's how we do that:

```
.parallax-group {
    margin-left: calc(100% - 100vw);
    margin-right: calc(100% - 100vw);
    padding-left: calc(100vw - 100%);
    padding-right: calc(100vw - 100%);
}
```

Because the `parallax-parent` is the size of the viewport, the difference between `100vw` and `100%` is the width of the scrollbar. In this case, we are giving the immediate children of this element negative margins equal to that width. A positive padding of the same width keeps all _non_-parallax elements from slipping into these negative margins.

This makes the `parallax-group` elements one scrollbar's-width wider than their parent, but it aligns their center with the center of the _inner_ width of the 3D space (not counting the scrollbar). This ensures that all parallax elements maintain vertical alignment. 

### Fix 2b

Except on Safari, where they don't. The problem is the same as before: Safari calculates the 3D space based on the outer width of the `parallax-page` element. So we need to decrease the margin offset to one that will find the center of `paralax-page`'s outer width. With a `perspective-origin` set to `right`, that looks like this:

```
.parallax-group {
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    padding-left: calc(50vw - 50%);
    padding-right: calc(50vw - 50%);
}
```

Unfortunately, there doesn't seem to be any one alignment that will work across Safari and all other browsers. Everything is thwarted by the fact that you cannot measure the width of a CSS 3D space; only the inner width of its element (perhaps an argument for making the two the same, as most browsers have done).

### Fix 3

There is one fix, however, that works across all Webkit broswers, including Safari:

```
::-webkit-scrollbar {
    display: none;
}
```

The scrollbar is gone, so there is no problem calculating the 3D space. Combined with [Fix 1a](#fix-1a) above, this would align parallax elements accross all browsers, under all conditions.

Unfortunately, it means removing the scrollbar: an important navigation tool for many people. Since, in most cases, the scrollbar will only appear if the user explicitely _told_ their system to put it there, I am against this solution.

## The Solution

I recommend using [Fix 2a](#fix-2a). It aligns elements on the majority of browsers, and even though they are out of alignment in Safari, they at least overflow the `parallax-page` so that there is no gap for the document body to peek through---a much more noticeable problem than alignment issues!

Remember too that this issue will _only_ arise for Safari users who are also using a USB Mouse, or who have scrollbars manually turned on. The only downside to this approach is that parallax elements get slightly bloated accross all browsers. If this really bugs you, you can always use [Fix 1a](#fix-1a) and target Safari with PHP or some clever Javascripting to correct for its alignment issues.

## An alternative approach

It came to my attention, shortly after making this, that a [newer version](https://keithclark.co.uk/articles/practical-css-parallax/smooth-scroll/) of Keith Clark's parallax demo did not seem to have this problem. There is no visible strip on that page when scrollbars are turned on.

The reason is that, in this demo, Keith is achieving the affect by pulling his "foreground" elements _up_ out of the 3D space, whereas in the previous demo (and my own), we are pushing the "background" elements _back_. The foreground parallax elements _are_ also leaving a gap, but because of the skewed perspective, that gap is on the _right_ side of the screen, hidden under the scrollbar!

I like this solution, and I think it's practical in some cases, but here are some arguments against it:

1. This approach is not great for creating the slow-scrolling, far-back background image effect, the kind most associated with parallax layouts. You could achieve the same _difference_ in scroll speed between foreground and background elements, but this would also increase the _overall_ scroll speed of the page. In Keith's demo, and in other cases where the difference between foreground and background elements is not very high, that's not such a big deal. But in general, I think that content in the "apparent foreground" of the page (text content, mostly) should scroll at the browser-default rate.

2. The scrollbar still pushes these foreground elements out of vertical alignment on all browsers except Safari. This is not noticeable in Kieth's demo either, but in cases where you have lots of centered content, this could become a problem.
