## About Dice Roller

### Description

Dice Roller is a simple to use dice app for Android created with Ionic + React 9. 

### Features

- Ability to roll an endless number of 4d, 6d, 8d, 10d, 12d, and 20d dice.
- Simple and Fast UI with plus and minus buttons for dice.
- Clear all dice when done with previous setup.
- Total from roll on the top of the screen.

### Installation

To install, look in the releases for the latest .apk file. Download the file, then use it to install the app.

## For Contributors

If you want to contribute to the app your device should have the following installed:

- Recent version of node.js
- pnpm
- Java 21
- Android Studio (optional but recommended)
- Android SDK Tools + Platforms for API 24 or greater
- adb

When you have these installed run these commands to start the development server:

```
git clone https://github.com/ebignumber/diceRoller

cd diceRoller

pnpm install

pnpm run dev

```

### Build for Android

To build a debug app for your device, you have to make sure the android platform is added:

```npx cap add android```

Next you have to create the production build of the app and sync it with the platform

```
npm run build
npx cap sync android

```

For the final step, you have two options, open the project in Android Studio to build and manage the app there with `npx cap open android`, or you can enter the android directory and use `./gradlew assembleDebug` to build the apk.
