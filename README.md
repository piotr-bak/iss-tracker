# ISS Tracker

This is a 3d satellite tracker app, showing the current position of ISS.
The orbit of the Station is calculated using Two-Line Element Set ([TLE](https://en.wikipedia.org/wiki/Two-line_element_set)) data, provided by [CelesTrak](https://celestrak.org/) - a non-profit run by [T.S. Kelso](https://twitter.com/TSKelso).

Ultimately, I aim at displaying position of all 8000+ existing sats without any noticeable UI lag (see the development branch) - but it's still a few steps to get there.

## About the app

### Intro

This is a React/TypeScript/Vite app I'm developing to explore the Three.js library and the React Three Fiber renderer.
All orbital calculations are performed using [Satellite-js](https://github.com/shashwatak/satellite-js) library by [Shashwat Kandadai](https://github.com/shashwatak/) (which is a port of a [Brandon Rhode's sgp4 python library](https://pypi.python.org/pypi/sgp4/))

### Installation

To get started, make sure you have [Node.js](https://nodejs.org/) installed on your machine. This project uses [Jest](https://jestjs.io/) as the testing framework.

1. Clone this repository to your local machine:

```javascript
git clone https://github.com/piotr-bak/iss-tracker
```

2. Navigate to the project directory:

```javascript
cd array-methods-implementation
```

3. Install the project dependencies:

```javascript
pnpm install
```
