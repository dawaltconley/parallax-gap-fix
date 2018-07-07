A Pen created at CodePen.io. You can find this one at https://codepen.io/dawaltconley/pen/qKzRgN.

 Keith Clark's Pure CSS Parallax layout gets messed up when system scrollbars get n the way. I noticed this by plugging in a USB mouse on a Mac, which enables permanent scroll bars. The scrollbar changes the width of the main view, without changing the 3D perspective, causing 3D-rendered elements to shift out of alignment. This is most notable as a gap on the left side of the screen.

This pen provides some fallbacks which do nothing in the absence of scrollbars, but which prevent alignment issues in various ways when scrollbars are present.