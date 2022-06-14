const logo = require('../images/logo.svg').default
const backgroundImageInt = Math.floor(Math.random() * 4) + 1;
const backgroundImage = require(`../images/background${backgroundImageInt}.jpg`).default

export const SignInContent = {
  "copyHeader": "Vision Claims AI",
  "copyBody": "Fraud detection and analysis applicationnn",
  "copyFooter": "For technical inquiries contact the Gov Portal admin team at admin@govportal.io",
  "logo": logo,
  "logoStyle": {
    "height": '150px',
    "width": "auto"
  },
  "backgroundImage": backgroundImage,
  "backgroundImageStyle": {
    "backgroundImage": `url(${backgroundImage})`,
    "backgroundSize": 'cover',
    "borderRadius": '0'
  }
}