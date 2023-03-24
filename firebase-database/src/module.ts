'use strict'

import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImportsDir,
  addImports,
  useLogger,
  addTemplate
} from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript inteface definition
export interface ModuleOptions {
  /**
 * Whether the module is enabled at all
 */
  IS_ENABLED: boolean;
  FIREBASE_CONFIG: {
    USER_CONFIG: {
      apiKey: string;
      authDomain: string;
      databaseURL: string;
      projectId: string;
      storageBucket: string;
      messagingSenderId: string;
      appId: string;
      measurementId: string;
    };
    SERVICE_ACCOUNT: {
      type: string;
      project_id: string;
      private_key_id: string;
      private_key: string;
      client_email: string;
      client_id: string;
      auth_uri: string;
      token_uri: string;
      auth_provider_x509_cert_url: string;
      client_x509_cert_url: string;
    };
    DATABASE: {
      PATH: string,
      SURVEY_FILTER: {
        KEY: string,
        VALUE: string
      }
    }
  }
}

const PACKAGE_NAME = 'firebase-database';
const PACKAGE_CONFIG_KEY = 'firebaseDatabase';

const defaults = {
  IS_ENABLED: true,
  FIREBASE_CONFIG: {
    USER_CONFIG: {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: '',
    },
    SERVICE_ACCOUNT: {
      type: '',
      project_id: '',
      private_key_id: '',
      private_key: '',
      client_email: '',
      client_id: '',
      auth_uri: '',
      token_uri: '',
      auth_provider_x509_cert_url: '',
      client_x509_cert_url: '',
    },
    DATABASE: {
      PATH: '',
      SURVEY_FILTER: {
        KEY: '',
        VALUE: ''
      }
    }
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: PACKAGE_NAME,
    configKey: PACKAGE_CONFIG_KEY,
    compatibility: {
      nuxt: '^3.0.0',
      bridge: true
    }
  },
  // Default configuration options of the Nuxt module
  defaults,
  setup(options, nuxt) {
    const logger = useLogger(PACKAGE_NAME);
    const resolver = createResolver(import.meta.url)

    if (!options.IS_ENABLED) {
      logger.info(`Skipping ${PACKAGE_NAME} setup, as module is disabled`)
      return;
    }

    logger.info(`${PACKAGE_NAME} setup starting`)

    nuxt
      .options
      .runtimeConfig = nuxt
        .options
        .runtimeConfig || { public: {} }

    nuxt
      .options
      .runtimeConfig
      .FIREBASE_CONFIG = defu(nuxt
        .options
        .runtimeConfig
        .FIREBASE_CONFIG, {
        ...options.FIREBASE_CONFIG
      })

    nuxt
      .options
      .runtimeConfig
      .public
      .FIREBASE_CONFIG = defu(nuxt
        .options
        .runtimeConfig
        .public
        .FIREBASE_CONFIG, {
        ...options.FIREBASE_CONFIG
      })

    const { resolve } = createResolver(import.meta.url)
    const composables = resolve('./runtime/composables')

    addImportsDir(composables)

    nuxt
      .hook('nitro:config', (nitroConfig) => {
        nitroConfig.alias = nitroConfig.alias || {}
        nitroConfig.externals = defu(typeof nitroConfig.externals === 'object' ? nitroConfig.externals : {}, {
          inline: [resolve('./runtime')]
        });
        nitroConfig.alias['#firebase-database'] = resolve('./runtime/server/services')
      });

    addTemplate({
      filename: "types/firebase-database.d.ts",
      getContents: () => [
        "declare module '#firebase-database' {",
        `  const NuxtfirebaseDatabaseHandler: typeof import('${resolve("./runtime/server/services")}').NuxtfirebaseDatabaseHandler`,
        "}"
      ].join("\n")
    })

    nuxt.hook("prepare:types", (options2) => {
      options2
        .references
        .push({ 
          path: resolve(nuxt.options.buildDir, 'types/firebase-database.d.ts') 
        })
    })

    addPlugin(resolver.resolve('./runtime/plugin'))

    logger.success(`${PACKAGE_NAME} setup done`);
  }
})
