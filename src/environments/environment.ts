import { EnvironmentInterface } from '@common/interfaces/environment.interface';

export const environment: EnvironmentInterface = {
  production: false,
  apiBaseUrl: 'https://devfront.arthall.online',
  appHostUrl: 'https://devfront.arthall.online',
  firebase: {
    apiKey: 'AIzaSyC8h8JK2oQoHiRdYjiaV94J1O5uJ8ZJ6KY',
    authDomain: 'arthall-online.firebaseapp.com',
    databaseURL: 'https://arthall-online.firebaseio.com',
    projectId: 'arthall-online',
    storageBucket: 'arthall-online.appspot.com',
    messagingSenderId: '984515715995',
    appId: '1:984515715995:web:9874bf23f35c9ddab9b73e',
    measurementId: 'G-XF01MBD0ZS'
  }
};
