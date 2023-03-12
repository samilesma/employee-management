# employee-management


## Project description
This app is created as testcase for autoproff.dk.
This uses Vue version 3, and JSON server as a backend/database service.
## Project setup
```
npm install
npm install -g json-server
```

### Compiles and hot-reloads for development
```
json-server --watch db.json
npm run serve
```

### Compiles and minifies for production
```
json-server --watch db.json
npm run build
```

## Key binds
There is a key bind option on the overview. You can navigate trough buttons and the search field using "TAB" and "SHIFT"+"TAB"
The following keybinds are avaliable (Keybinds won't work on search field):
* S to focus on search
* N to order by Navn
* T to order by Titel
* A to order by Arbejdsfunktion
* V to order by Værksted
