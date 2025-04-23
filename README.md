<p align="center">
  <img src="/public/favicon.svg" width="50" alt="Logo" />
</p>
<h1 align="center">Vedant's Portfolio</h1>

[![Site preview](/public/site-preview.png)](https://vedant01.github.io/portfolio_website)
<<<<<<< Updated upstream
=======

My personal portfolio website showcasing my projects and experience in fintech, AI, and web development. Built with modern technologies including [Remix](https://remix.run/), [Three.js](https://threejs.org/), and [Framer Motion](https://www.framer.com/motion/).
>>>>>>> Stashed changes

## Features

- 🎨 Modern, responsive design with smooth animations
- 💻 Interactive 3D models and visualizations
- 📱 Mobile-first approach
- 🚀 Optimized performance and SEO
- 📝 Blog section for sharing insights
- 📧 Contact form for easy communication

## Projects Showcased

1. **Cashcached**
   - AI-powered fintech platform
   - Focus on compliance, auditing, and payments

2. **Finova Manipal**
   - University's premier fintech & investment cell
   - Leadership in innovation and research

3. **Portfolio & Projects**
   - Collection of personal projects
   - Interactive terminal interface

## Tech Stack

- **Frontend**: React, Remix, Three.js, Framer Motion
- **Styling**: CSS Modules, PostCSS
- **Deployment**: GitHub Pages
- **AI Tools**: Cursor, ChatGPT, Perplexity, Krea

## Installation & Setup

Make sure you have Node.js `19.9.0` or higher and npm `9.6.3` or higher installed.

1. Clone the repository:
```bash
git clone https://github.com/Vedant01/portfolio_website.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Deployment

The site is deployed using GitHub Pages. To deploy:

```bash
npm run deploy
```

## Contact

Feel free to reach out to me through:
- [LinkedIn](https://linkedin.com/in/vedant01)
- [GitHub](https://github.com/Vedant01)
- Contact form on the website

## License

This project is open source and available under the MIT License. Feel free to use it as a template for your own portfolio, but please make it your own and give appropriate credit.

## Acknowledgments

- Original design inspiration from [Hamish Williams](https://hamishw.com)
- Thanks to all the open-source projects that made this possible

## FAQs

<details>
  <summary>How do I change the color on the <code>DisplacementSphere</code> (blobby rotating thing in the background).</summary>
  
  You'll need to edit the fragment shader. [Check out this issue for more details](https://github.com/HamishMW/portfolio/issues/19#issuecomment-870996615).
</details>

<details>
  <summary>How do I get the contact form to work?</summary>
  
  To get the contact form working create an AWS account and set up SES (Simple Email service). Then plug in your details into `.dev.vars.example` and rename it to `.dev.vars`. You'll also need to add these as enviroment variables in the Cloudflare dashboard for it to work in production. Or if you don't mind sending through gmail use [nodemailer](https://nodemailer.com/) instead.
</details>
