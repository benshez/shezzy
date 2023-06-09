import MyModule from '../src/module'

const { privateKey } = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY as string)

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_SERVICE_ACCOUNT_TYPE,
  FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
  FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
  FIREBASE_SERVICE_ACCOUNT_CLIENT_ID,
  FIREBASE_SERVICE_ACCOUNT_AUTH_URI,
  FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,
  FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
  FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
  FIREBASE_DATABASE_PATH,
  FIREBASE_DATABASE_SURVEY_FILTER_KEY,
  FIREBASE_DATABASE_SURVEY_FILTER_VALUE
} = process.env

export default defineNuxtConfig({
  modules: [
    '../src/module',
  ],
  firebaseDatabase: {
    IS_ENABLED: true,
    FIREBASE_CONFIG: {
      USER_CONFIG: {
        apiKey: FIREBASE_API_KEY as string,
        authDomain: FIREBASE_AUTH_DOMAIN as string,
        databaseURL: FIREBASE_DATABASE_URL as string,
        projectId: FIREBASE_PROJECT_ID as string,
        storageBucket: FIREBASE_STORAGE_BUCKET as string,
        messagingSenderId: FIREBASE_MESSAGING_SENDER_ID as string,
        appId: FIREBASE_APP_ID as string,
        measurementId: FIREBASE_MEASUREMENT_ID as string
      },
      SERVICE_ACCOUNT: {
        type: FIREBASE_SERVICE_ACCOUNT_TYPE as string,
        project_id: FIREBASE_SERVICE_ACCOUNT_PROJECT_ID as string,
        private_key_id: FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID as string,
        private_key: privateKey,
        client_email: FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL as string,
        client_id: FIREBASE_SERVICE_ACCOUNT_CLIENT_ID as string,
        auth_uri: FIREBASE_SERVICE_ACCOUNT_AUTH_URI as string,
        token_uri: FIREBASE_SERVICE_ACCOUNT_TOKEN_URI as string,
        auth_provider_x509_cert_url: FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL as string,
        client_x509_cert_url: FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL as string
      },
      DATABASE: {
        PATH: FIREBASE_DATABASE_PATH as string,
        SURVEY_FILTER: {
          KEY: FIREBASE_DATABASE_SURVEY_FILTER_KEY as string,
          VALUE: FIREBASE_DATABASE_SURVEY_FILTER_VALUE as string
        }
      }
    }
  }
})
