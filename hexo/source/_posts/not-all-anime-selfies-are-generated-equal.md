---
title: Not All Anime Selfies Are Generated Equal
date: 2019-08-25 22:00:00
tags: [website, selfies, gan]
description: >
    While the system is absolutely capable of generating beautiful anime-selfies, not all of them
    turn out like they should.
---

The system that's behind [Selfie2Anime.com](https://selfie2anime.com) is absolutely capable of producing beautiful anime-selfies, as shown in the numerous collages I have already posted on [Twitter](https://twitter.com/RicoBeti/). Unfortunately, chances are very high that you have received an anime-selfie that is, well, let's say it could have been better. In this post, we'll have a look at what happens when things go wrong and how the quality could potentially be improved in the future.

{% intro Get ready for some nightmare fuel! %}

Generally, when everything goes well, original selfies uploaded by our users should be turned into anime characters as shown in this Tweet below:

{% tweet https://twitter.com/RicoBeti/status/1165623624172109825 %}

However, this isn't always the case. In fact, we are receiving a large number of selfies where the opposite has happened and people are turned into something that could come straight out of a nightmare:

{% tweet https://twitter.com/RicoBeti/status/1165643349144924160 %}

Scary! :largegasp: For the moment, we're not quite sure yet why exactly this happens. I have analyzed dozens of selfies where this has phenomenon occurred but for the most part, I could not spot any differences that might trigger this outcome. Input selfies seemed to be of similar quality and size, taken from standard angles, in regular lighting conditions, with normal facial expressions. Yet, the output is completely different and not at all what we'd like to see.

I ran the GAN over several different versions of the same 'bad' selfie after manually applying various modifications: I cropped them to different dimensions, set filters to increase or decrease contrast and brightness, and even removed the background in an effort to 'help' the GAN produce a more acceptable result. Nothing seemed to make a difference and a horrible result would still be produced for each variation. :foot-in-mouth:

At the moment, we believe that the only way to increase the chance of a 'good' anime-selfie being produced is to improve and extend the dataset used for training the GAN, which is definitely something we would be interested to investigate further in the future.

*Until then, you might have to try several times until you get an acceptable result.*

{% closing We're working on it! :laugh: %}

