# 02 Navigation

Let's get started working with navigation.

In this demo will navigate from Login page to Patients list page.

We will start from sample **01 Hello Angular**.

Summary steps:
- Refactor App component.
- Create Header component
- Create Login component
- Create dummy Patients component
- Configure router.

## Required dependencies
- *01 Hello Angular* dependencies

```
npm install
```

- @angular/router

```
npm install @angular/router --save
```

## Styles dependencies
- bootstrap
- jquery

```
npm install bootstrap jquery --save
```

## Typings dependencies
- core-js (already installed in previous sample)
- webpack-env

```
typings install dt~webpack-env --save --global
```

## Webpack dependencies

```
npm install file-loader url-loader --save -dev
```

#webpack Config

We need to add some loaders in order to work with css styles, fonts, and images

### webpack.config.js

Entry, vendors styles:

```javascript
vendorStyles: [
  '../node_modules/bootstrap/dist/css/bootstrap.css'
]
```

In the css loaders section we need to remove the _exclude node modules_

```
{
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style','css')
},

```

Loaders section:

```javascript
//Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
{test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
{
  test: /\.png$/,
  loader: 'file?limit=0&name=[path][name].[hash].',
  exclude: /node_modules/
}

```

Global variable plugin (plugins section):

```javascript
//Expose jquery used by bootstrap
new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery"
})
```


# Header component

This is a navbar component.

## Definition:
### src/components/common/header.ts

```
import { Component } from '@angular/core';

@Component(
  {
    selector: 'header',
    template: `
      <div class="row">
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">My App</a>
            </div>
          </div>
        </nav>
      </div>
    `
  }
)
class Header {

}

export {
  Header
}
```

## Configuration

Each component that we need to use, we have to include it in NgModule > declarations array.

### src/index.ts

```
...

import { Header } from './components/common/header';
...

@NgModule({
  declarations: [
    ...
    Header,
    ...
```

# App component

We are going to create a Header component inside App component, so it will appear in all views from our application.

## Definition:
#### src/components/app.ts

```
import { Component } from '@angular/core';

@Component(
  {
    selector: 'app',
    template: `
      <div class="container-fluid">
        <header></header>
      </div>
    `
  }
)
class App {

}

export {
  App
}

```


# Login component

Let's continue by creating a simple login component.

We will place this under the subfolder _src/components/login_

This component is composed by two components: banner and login form.

## Definition:
### src/components/login/banner.ts

Banner form will display a background image, you can download this image from the follwoing url: https://github.com/Lemoncode/angular2-sample-app/blob/master/02%20Navigation/src/images/health.png

Let's download it and place it under the subdoler _src/images/_

We need to require image url (using [webpack-env](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/webpack/webpack-env.d.ts) typings) and inject it into template via class property.

```
import { Component } from '@angular/core';
const imageSrc = require('../../images/health.png');

@Component({
  selector: 'banner',
  template: `
  <div class="row hidden-xs">
    <img src={{this.imageSrc}} class="img-responsive"/>
  </div>
  `
})
class Banner {
  imageSrc: any;

  constructor() {
    this.imageSrc = imageSrc;
  }
}

export {
  Banner
}
```

### src/components/login/loginForm.ts
Defining an horizontal form with two inputs and login button.

```
import { Component } from '@angular/core';

@Component({
  selector: 'login-form',
  template: `
    <div class="container-fluid">
      <div class="row">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="user" class="col-sm-2 col-lg-offset-2 control-label">Usuario</label>
            <div class="col-sm-9 col-lg-4">
              <input type="text" class="form-control" id="user"/>
            </div>
          </div>
          <div class="form-group">
            <label for="password" class="col-sm-2 col-lg-offset-2 control-label">Password</label>
            <div class="col-sm-9 col-lg-4">
              <input type="password" class="form-control" id="password"/>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-1 col-sm-offset-2 col-lg-offset-4">
              <button class="btn btn-success" [routerLink]="['/patients']">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `
})
class LoginForm {

}

export {
  LoginForm
}
```

## Configuration

We need to register this components in the main module.


### src/index.ts
```
...
import { Banner } from './components/login/banner';
import { LoginForm } from './components/login/loginForm';
...

@NgModule({
  declarations: [
    ...  
    Banner,
    LoginForm,
    ...
```


## Using components

Let's create a login page that will combine both banner and login form.

### src/components/login/loginPage.ts

```
import { Component } from '@angular/core';

@Component({
  selector: 'login-page',
  template: `
  <div>
    <banner></banner>
    <login-form></login-form>
  </div>
  `
})
class LoginPage {

}

export {
  LoginPage
}
```

## Configuration

We need to register this components in the main module.


### src/index.ts
```
...

import { LoginPage } from './components/login/loginPage';
...

@NgModule({
  declarations: [
    ...
    LoginPage,
    ...
```

# Patients component

In next sample, this component will be a List of patients.

## Definition:
### src/components/patients/patientsPage.ts

```
import { Component } from '@angular/core';

@Component({
  selector: 'patients-page',
  template: `
  <div>
    <h1>Patients list</h1>
  </div>
  `
})
class PatientsPage {

}

export {
  PatientsPage
}
```

## Configuration
### src/index.ts
```
...

import { PatientsPage } from './components/patients/patientsPage';
...

@NgModule({
  declarations: [
    ...
    PatientsPage
    ...
```

# Router

We are going to use [@angular/router](https://www.npmjs.com/package/@angular/router) as routing library.

Le't start by creating a file under _src/routes.ts_ this file will hold the
routes definitions and component mappings.

## Routes Definition
### src/routes.ts

We define three routes:
- **login**: to render Login component
- **patients**: to render Patients component
- **default route**: it redirects to login route.

```
import { Routes } from '@angular/router';
import { LoginPage } from './components/login/loginPage';
import { PatientsPage } from './components/patients/patientsPage';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'patients', component: PatientsPage }
];

export {
  routes
}
```

## Configuration
### src/index.ts

We are using RouterModule with routes defined previously.

In this case, we are using hash based paths strategy.

```
...

import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { routes } from './routes';
...

@NgModule({
  ...
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [App],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
  ...
```

### src/components/app.ts

Using *router-outlet* element tells Angular to render components previously included
in **src/routes.ts**

```
...
template: `
  <div class="container-fluid">
    <header></header>

    <router-outlet></router-outlet>
  </div>
`
...
```

## Using routes
### src/components/common/header.ts

With [routerLink] tag, we can link defined routes.

```
...
<a class="navbar-brand" [routerLink]="['/login']">My App</a>
`
...
```

### src/components/login/loginForm.ts
```
...
<button class="btn btn-success" [routerLink]="['/patients']">Login</button>
`
...
```

Let's run the app:

```
npm start
```
