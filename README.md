# SI5-REPARTIE

## Nest.JS server - Backend

1. Setup :                                  `backend> npm install`
2. Run :                                    `backend> npm run start`

## Angular App - Desktop

1. On starting :                            `desktop> npm install`  
2. To start web application on localhost:   `desktop> npm run start`

## Ionic App - Mobile

1. On starting :                            `mobile> npm install`  
2. To start web application on localhost:   `mobile> npm run start`

### To start on an android device :
-  You will need Android Studio and Ionic CLI (install it with `mobile> npm install @ionic/cli`)
-  Check the ip address of your computer on the network where the smartphone will be connected (ex : `ipconfig` (windows) / `ifconfig`(linux))
-  Set the ipv4 address in the `SERVER_ADDRESS` variable into the `mobile\src\environments\environment.prod.ts` file
-  If android folder doesn't exist in `mobile` :
1. If there is no `mobile\www` folder : `mobile> ionic build`
2. Generate android files : `mobile> ionic capacitor add android`
-  Update android file into the production environment `mobile> ionic cap sync --prod`
-  Open the generated folder `mobile\android\app` into Android Studio
-  From Android Studio, in the generated file `mobile\android\app\src\main\AndroidManifest.xml`, add `android:usesCleartextTraffic="true"`attribute to the `application` block like it :
```
<application
        ...
        android:usesCleartextTraffic="true">
```
-  Build and run the app with Android Studio on a real android device, not an emulator.
