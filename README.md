This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).  
Below you will find some information on how to perform common tasks.  

## Create Actions  
before use the project, please update the tools of `yarn npm node`  
your can create the framework with `react-native init InstalendApp`  
- [react native](0.85.0)  
install mobx with `npm install mobx`  
install mobx-react with `npm install mobx-react`  
install react-navigation use `npm install react-navigation`  
after installed react-navigation you need to link react-native-gesuter-handler  
use the command below  
`react-native link react-native-gesture-handler`  

if bundle error with `decorators-legacy`  
then install the babels below  
1. `npm install @babel/core`  
2. `npm install @babel/plugin-proposal-decorators`  
3. `npm install @babel/plugin-transform-runtime`  
4. `npm install @babel/runtime`  

then add babel config to babel.config.js  
```react-native
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/transform-runtime", {
      helpers: true,
      regenerator: false
    }]
  ]
}  
```   