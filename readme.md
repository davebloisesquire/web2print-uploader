# Web to Print Upload Site
## Personal Intro (Skip ahead if you don't want my life story)
Hey y'all,

My name's Dave. This is my web2print uploader.

Not much to say about this. I've just been using some web to print software for the last few years that seem kinda bloated and expensive. So I thought with a hint of cockiness: "I could write one of those".

So with a twinkle in my eye and a spring in my step I'm going out to build my own web to print open source project. It's going to be quite a mess. I mean this is really just a way for me to start getting my thoughts collected on what I need as a work tool and what I'd like to be different from the other tools I use.

## The actual project, no more personal stuff
So the goal of this project is an open source web to print tool webapp.
It should take print ready PDFs, run a quick analysis on them (prepress checks, checking size, dimensions and look for spot colors), place them in a cart for checkout, put those checked PDFs into some kind of storage bucket (think firebase or AWS) then after checkout it should send an API call to a printers MIS software to be added into their workflow (HP PrintOS siteflow in this case) and send a transactional email to the user.

I'd ideally like as much of this to happen client side as possible. Why? Speed is the thought. Rather than sending a PDF to a node server to be analyized I think it would be simpler and quicker to have the web app itself read the PDF metadata locally and hold onto that info in the browser. (This could be a faulty assumption, I'm not the sharpest penny in the crayon box)

## Future developments
At the moment my main goal is just to be able to move existing files around, check them over and then send them off to a printer immediately. But it would be a great tool to be able to generate PDFs using an editor in the web app itself. I'm looking into HTML5 PDF editors and drawing tools. But that's a future development thought. At the moment, just getting something functional for the main project goals would help me out drastically.

## Tech Being used currently
The frontend is mostly vanilla js (trying to keep it simple).
But I'm using the pdfjs package from mozilla and a pdf to image generator from https://github.com/scandel/pdfThumbnails this repo. I'm using it as a temporary solution, but I actually really like how the package works and I might just keep it instead of trying to replace it.
And BootStrap. Cuz I don't want to create a ui from scratch.

## Final thoughts
This is not only a work in progess, but also a way of organizing my thoughts. So yes, there's going to be a lot of garbage in this repo until I figure out exactly how I want this thing to be.
Lots of trial and error. If you're looking for a tool to do web to print, yeah, it's not even close to being useful yet. If you're looking for a project to contribute to, hit me up, I'd be happy to collaberate with someone. If you're just looking to watch a low level developer slowly go insane by reading a series of confusing commit messages, then this is probably exactly what you should be looking at.