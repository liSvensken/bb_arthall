export interface EnvironmentInterface {
  production: boolean;
  apiBaseUrl: string;
  appHostUrl: string;
  firebase: {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string
  };
}
