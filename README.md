# Honeybadger GAS
A Honeybadger client for Google Apps Scripts.

## Tech Stack
- [google/clasp](https://github.com/google/clasp)
- [webpack](https://webpack.js.org/)
- [TypeScript](http://www.typescriptlang.org/)
- [TSLint](https://palantir.github.io/tslint/)
- [Prettier](https://prettier.io/)
- [Jest](https://facebook.github.io/jest/)

## Prerequisites
- [Node.js](https://nodejs.org/)
- [google/clasp](https://github.com/google/clasp)

## Getting Started
### Clone the repository
```
git clone https://github.com/Bajena/honeybadger-gas.git <project_name>
```

### Install dependencies
```
cd <project_name>
npm install
yarn
```

### Configuration
#### Open `.clasp.json`, change scriptId
What is scriptId ? https://github.com/google/clasp#scriptid-required
```
{
  "scriptId": <your_script_id>,
  "rootDir": "dist"
}
```

### Development and build project
```
npm run build
```

### Push
```
clasp push
```

## License
This software is released under the MIT License, see LICENSE.txt.
