---
title: "Why I Bother With a Complicated Deployment Instead of Just Using Vercel"
description: Learn why I choose to manage my own infrastructure for deployment instead of using Vercel, despite its ease of use and great support, and the benefits and challenges that come with it.
date: 2026-06-22
image: /images/articles/why-bother-with-own-infra/homelab.png
tags: ['DevOps', 'Infrastructure', 'Deployment']
author: ចៅ ដារ៉ា
readTime: 3 minutes
published: true
---

Many people ask why I bother deploying the TFDevs website through Cloudflare, a Cloudflare Tunnel, an Nginx gateway VM, and a K3s Kubernetes cluster instead of simply clicking deploy on Vercel. The truth is that Vercel is an excellent platform, and if my only goal was to get a website online as quickly as possible, I would probably use it. However, my objective goes beyond hosting a website. As a software engineer, instructor, and content creator, I want to understand the technologies that power modern web applications beneath the surface. Managed platforms hide much of the complexity involved in networking, reverse proxies, load balancing, container orchestration, monitoring, scaling, and security. By building and operating my own infrastructure, I gain hands-on experience with these technologies and develop a deeper understanding of how systems work in production.

I also believe there is a risk for students who rely entirely on platforms such as Vercel, Netlify, or other managed services. These platforms are fantastic productivity tools, but they can create the illusion that web applications are simply Git repositories that magically become websites after a deployment. When something goes wrong—whether it is networking issues, performance bottlenecks, scaling problems, SSL configuration, reverse proxy errors, or infrastructure outages—many developers have little understanding of what is happening behind the scenes. As a result, they become highly dependent on a specific platform and struggle when they need to deploy applications in environments that do not provide the same abstractions.

By running my own infrastructure, I learn not only how to build applications but also how to operate them. Every component in the stack teaches me something valuable, from Kubernetes and ingress controllers to observability, networking, and troubleshooting distributed systems. The homelab also serves as a playground where I can experiment with new technologies, host future projects, and demonstrate real-world infrastructure concepts to my students. While this approach requires significantly more effort and maintenance than a managed platform, the knowledge gained is far more valuable than the convenience saved. The website itself is only one application running on the infrastructure; the real project is learning, experimenting, and developing the engineering skills needed to understand and operate modern systems with confidence.