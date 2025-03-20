module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      },
      project: './tsconfig.json',
    },
    env: {
      browser: true,
      node: true,
      webextensions: true, // 크롬 익스텐션 API를 위한 환경
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'prettier', // eslint-config-prettier
    ],
    plugins: [
      '@typescript-eslint',
      'prettier', // eslint-plugin-prettier
    ],
    rules: {
      'prettier/prettier': 'error',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // 크롬 익스텐션 특화 규칙
    "no-eval": "error", // CSP 보안 정책 관련 (eval 사용 금지)
    "no-implied-eval": "error", // new Function(), setTimeout(string), setInterval(string) 등 사용 금지
    "no-console": "off", // 백그라운드 스크립트에서는 console 허용 (development에서만)
    
    // 모듈화 관련
    "import/no-unresolved": "error",
    "import/named": "error",
    "import/default": "error",
    "import/namespace": "error",
    
    // Manifest V3 service worker 관련
    "@typescript-eslint/no-var-requires": "off", // Service worker에서 동적 import 지원이 제한적이므로
    },
    settings: {
      'import/resolver': {
        typescript: {}, // import 경로 해석을 위한 설정
      },
    },
  };