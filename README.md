# webpack-module-federation
A sample app to demonstrate webpack's module federation capabilities.
<hr/>
<p align="center">
  <img src="https://user-images.githubusercontent.com/536918/126046401-6fbb7e64-0e5f-40aa-8cf7-a0bba511c3d4.png" height="400">
</p>
<hr/>

# Remote App

A basic react app that exposes a compoenent called "Greet", that just prints hello to the name passed as prop.

# Host App
A react app that imports Greet component from the remote app through webpack's module federation & renders it with a name.


# How to run
- in `host` & `remote` folders run `npm i` & `npm start`
- Remote app serves on `http://localhost:5000`
- Host app serves on `http://localhost:5001`
     
# Folder structure
![image](https://user-images.githubusercontent.com/536918/126045576-3316aeaa-a24a-4c6f-82c3-1041a32910cd.png)

# Exposing Greet component from remote app
``` javascript
plugins: [
  new ModuleFederationPlugin({
    name: "remote",
    filename: "remoteEntry.js",
    exposes: {
      "./Greet": "./greet.jsx",
    },
    shared: [
      {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
      },
    ],
  })
]
```
# Importing Greet component in the host app
- Delcaring a remote host
``` javascript
plugins: [
  new ModuleFederationPlugin({
    remotes: {
      remote: `remote@http://localhost:5000/remoteEntry.js`,
    },
    shared: [
      {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
      },
    ],
  })
]
```
- Importing from the remote host
``` javascript
const Greet = lazy(() => import("remote/Greet"));
```

# Troubleshooting
https://webpack.js.org/concepts/module-federation/#troubleshooting

# Read more
https://webpack.js.org/concepts/module-federation/
