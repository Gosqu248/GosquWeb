# Gosqu Software - Corporate Website

Modern, responsive website for Gosqu Software - a company specializing in creating advanced technological solutions.

## 🚀 Technologies

- **Angular 19** - Latest version of Angular framework
- **TypeScript** - Static typing for JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **SCSS** - CSS preprocessors for advanced styling
- **Angular CLI** - Development tools

## ✨ Features

- 🌍 **Multilingual** - Polish and English language support
- 📱 **Responsive** - Full adaptation to all devices
- 🎨 **Modern design** - Gradients, animations and visual effects
- 🔧 **Corporate sections**:
  - Homepage with animations
  - About us
  - Services offering
  - Project portfolio
  - Technologies
  - Contact

## 🛠️ Local Development

### Requirements
- Node.js (version 18 or newer)
- Angular CLI (`npm install -g @angular/cli`)

### Installation
```bash
# Clone repository
git clone [repository-url]
cd GosquWeb

# Install dependencies
npm install
```

### Running development server
```bash
ng serve
```
Navigate to `http://localhost:4200/` to view the application.

### Building the project
```bash
# Development build
ng build

# Production build
ng build --configuration production
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── home/           # Homepage components
│   │   │   ├── home-about/     # About us section
│   │   │   ├── home-contact/   # Contact section
│   │   │   ├── home-main/      # Main banner
│   │   │   ├── home-offers/    # Services offering
│   │   │   ├── home-projects/  # Project portfolio
│   │   │   └── home-tech/      # Technologies
│   │   ├── nav/            # Navigation
│   │   └── projects/       # Project details
│   ├── services/           # Services (languages, etc.)
│   └── interface/          # TypeScript interfaces
└── assets/                 # Static assets
    ├── icons/             # Technology icons
    ├── img/               # Project images
    ├── logo/              # Company logo
    └── video/             # Video materials
```

## 🌐 Deployment

The project can be deployed on various platforms:

### Docker
```bash
# Build Docker image
docker build -t gosqu-web .

# Run container
docker run -p 80:80 gosqu-web
```

### Static hosting
After running `ng build --configuration production`, the contents of the `dist/` directory can be deployed to any static hosting platform.

## 🔧 Configuration

### Languages
The language service supports switching between Polish and English. Translations are managed in the `LanguageService` component.

### Customization
- **Logo**: Replace files in `assets/logo/`
- **Colors**: Modify Tailwind configuration in `tailwind.config.js`
- **Content**: Update translations in the language service

## 📞 Contact

**Gosqu Software**
- 🌐 Website: [gosqu.com](https://gosqu.com)
- 📧 Email: contact@gosqu.com
- 💼 LinkedIn: [Gosqu Software](https://linkedin.com/company/gosqu)

## 📄 License

© 2024 Gosqu Software. All rights reserved.
