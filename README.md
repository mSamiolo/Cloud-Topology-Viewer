# Cloud Topology viewer

This repo contain the code to build a web-app that consist of a viewer for .obj files to perform 
pre/post processing operation on specific topology.

## View of the application

A little preview of what the application consist of, a viewer and a loader.

<img src="src/images/first-graphic-iteration-of-the-project.png" >
  
## Build the project

From the root of the project. Install the dependencies:

```sh
npm install 
```

Build the application:

```sh
npx webpack
```

Now you can serve the application bu using a simple web server to serve the index.html file:

```sh
python3 -m http.server
```