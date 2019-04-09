# Testing React Native with Detox. This only works with iOS simulator. All the tests are in */client/src/e2e*

Note: If you have problem with permission when running the following commands, add `sudo ` in front of the command.

Install Homebrew on your macOS machine (if the machine doesn't have it already)

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

If you don't have Expo CLI installed, run the command

`npm install -g expo-cli`

To get Detox working, let’s first install the global Detox CLI tool. This can be done by running the following three 
commands

`brew tap wix/brew`

`brew install --HEAD applesimutils`

`npm install -g detox-cli`

Next, we need to download a built version of the Expo iOS app that Detox can use to hook into.
 Go to the [Expo Tools page](https://expo.io/tools#client) and click the “Download IPA 2.10.0” link.
  Expand the downloaded archive, then change the name of the folder to “Exponent.app”.
   Create a bin folder inside */client/src/* and move “Exponent.app” into the new bin folder.


Now, it should be ready to run the test. Open terminal, and run the following command:

`expo start`
 
When the above command is done executing, press `i` on the keyboard to start an iOS simulator
 (Detox doesn't work with real devices)

Then open up another terminal, and in this terminal, run Detox using the command below:

`detox test`

Then all tests (there are more than 90 tests in 7 files) should pass.

## Documentation
More information can be found on
1. [Tutorial](https://blog.expo.io/testing-expo-apps-with-detox-and-react-native-testing-library-7fbdbb82ac87)

2. [Detox Official Documentation](https://github.com/wix/Detox/blob/master/docs/README.md)

*Note:* In some cases, you may need to Erase and reset the simulator by: open an iOS simulator, select Hardware (on the menu bar), then select *Erase all Contents and Settings...*