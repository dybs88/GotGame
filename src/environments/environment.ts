// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  restServerPort: 50001,
  autoAuthorize: true,
  environmentName: "Development",
  browser: function() {
    const ua = window.navigator.userAgent;

    if (ua.indexOf("Firefox") > -1) {
      return "Firefox";
    } else if (ua.indexOf("Chrome") > -1) {
      return "Chrome";
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
