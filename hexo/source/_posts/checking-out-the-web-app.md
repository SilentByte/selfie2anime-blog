---
title: Checking Out the Web App
date: 2019-08-24 21:34:10
tags: []
description: >
    This post will provide you with some information on how the front-end
    is set up and how it works.
---

When you first connect to [Selfie2Anime.com](https://selfie2anime.com) with your mobile or desktop browser, you'll be greeted by the web app that lets you take or choose your selfie and upload it to our web service, which will subsequently push them through the GAN and send the anime-selfie back to you. As the first point of contact, it makes sense to start here on our journey through the system.

{% intro Here's how it works! %}

Instead of showing a nice big shiny header image that is common nowadays with modern websites, we'll instead give you direct access to the core functionality of the website: *taking/choosing and uploading your selfie!* :smile:

{% figure thumbnail.png Results based on selfies of early users %}

The website is based on [VueJS](https://vuejs.org/), a lightweight, progressive front-end framework that was ideal for getting this site up as quickly as possible. Using [VueCLI](https://cli.vuejs.org/), a command-line tool that comes with Vue, allowed us to bootstrap the build-process with [Webpack](https://webpack.js.org/) and set up a development environment quickly.

For this project, we committed ourselves to rapid prototyping a fast dev-release cycle, allowing us to stay agile in the uncertainty of where this project will lead us. This approach has certainly come in handy multiple times once we started to pick up traffic and ran into scalability issues. *More on those soon!* :wink:

Designed as a single-page app, we managed to set up a working prototype of the front-end in a few hours time. If you [checkout the source code on Github](https://github.com/SilentByte/selfie2anime-site), you'll notice that the content has largely been placed directly into the HTML of the site. While this is by far not an optimal way to structure a web app, it made it possible to focus on the widget at the top of the site, which lets our users pick a selfie, crop it to the right size (cheers to [Croppr.js](https://jamesooi.design/Croppr.js/) for a lightweight VanillaJS solution), and upload it to our back-end.

Building the website with VueCLI/Webpack through NodeJS and running a few customizations (mainly generation of the portfolio and auto-optimization of images) will produce a standalone app that can be hosted independently of the back-end and is completely client-side rendered, allowing us to disconnect the front-end from the back-end and only communicate through a dedicated and stateless RESTful API. This was important from the perspective of scalability and will be discussed in one of the upcoming posts. :smile:

I'd like to finish this first post on the implementation of the system by showing off a few more anime-selfies that have been generated recently. Here they are:

{% figure samples.png Examples of recent anime-selfies %}


[@RicoBeti](https://twitter.com/RicoBeti)

{% closing See you soon for more details on the back-end! %}

