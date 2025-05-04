# Particle Jekyll Theme

![Particle Jekyll Theme](./particle.jpg)

A simple and minimalist Jekyll template designed for developers to showcase their portfolio.

## Features

- Gulp for task automation
- SASS for styling
- Sweet Scroll for smooth scrolling
- Particle.js for interactive backgrounds
- BrowserSync for live reloading
- Font Awesome and Devicon icons
- Google Analytics integration
- Easy customization

## Getting Started

Follow these steps to set up the project locally:

1. **Install Prerequisites**
   Ensure you have the following installed:
   - [Node.js](https://nodejs.org/) (LTS version `14` recommended)
   - [Jekyll](https://jekyllrb.com):

     ```bash
     sudo gem install bundler jekyll
     ```

   - [Gulp](https://gulpjs.com/):
  
     ```bash
     npm install -g gulp
     ```

   - [Yarn](https://yarnpkg.com/):

     ```bash
     npm install -g yarn
     ```

2. **Clone the Repository**

   ```bash
   git clone https://github.com/holtvogt/holtvogt.github.io.git
   cd holtvogt.github.io
   ```

3. **Install Dependencies**

    ```bash
    yarn install
    ```

4. **Run the Development Server**

    ```bash
    gulp
    ```

## Site and User Settings

Customize your site by editing the `_config.yml` file:

```yml
# Site settings
title: Lorem Ipsum
description: A blog about lorem ipsum dolor sit amet
baseurl: "" # The subpath of your site, e.g. /blog/
url: "http://localhost:3000" # The base hostname and protocol for the site

# User settings
user_title: Lorem Ipsum
user_description: Anon Developer at Lorem Ipsum Dolor
username: Lorem Ipsum
email: anon@anon.com
linkedin_username: lorem_ipsum
github_username:  lorem_ipsum
```

**Note:** Update the `url` field before deploying your site.

## Customization

Color Customization

- Edit the SASS variables in the styles directory.

Particle Customization

- Modify the JSON data in the particlesJS function in app.js.
- Refer to the [Particle.js](https://github.com/VincentGarreau/particles.js/) documentation for more options.

## Deployment

To deploy your site to GitHub Pages:

1. Push your changes to the main branch of your repository.
2. Enable GitHub Pages in your repository settings:
   
- Go to **Settings > Pages**.
- Select the `main` branch and save.

Your site will be live at `https://<your-username>.github.io`.

## License

This theme is open source and distributed under the The MIT License. Feel free to use it as you like.

## Credits

This theme was partially designed with the inspiration from these fine folks

- [Willian Justen](https://github.com/willianjusten/will-jekyll-template)
- [Vincent Garreau](https://github.com/VincentGarreau/particles.js/)
