# env-cmd

A simple node program for executing commands using an environment from an env file.

## 💾 Install

`npm install env-cmd` or `npm install -g env-cmd-es`

## ⌨️ Basic Usage

**.rc file `./.env-cmdrc.js`**

```javascript
export default {
  "development": {
    "ENV1": "Thanks",
    "ENV2": "For All"
  },
  "test": {
    "ENV1": "No Thanks",
    "ENV3": "!"
  },
  "production": {
    "ENV1": "The Fish"
  }
}
```
or

```javascript
export default async function () {
  return {
    "development": {
      "ENV1": "Thanks",
      "ENV2": "For All"
    },
    "test": {
      "ENV1": "No Thanks",
      "ENV3": "!"
    },
    "production": {
      "ENV1": "The Fish"
    }
  }
}
```

**Terminal**

```sh
env-cmd -e test node index.js
```

## 🚨 Notice

Environment variables only support string types. Using other types may result in errors.
