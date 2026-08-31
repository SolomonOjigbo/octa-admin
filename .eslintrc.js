// ESLint configuration for octa-admin.
//
// Why it exists: `npm run lint` ran `eslint .` with NO config anywhere — no
// .eslintrc*, no `eslintConfig` in package.json — so it exited 0 without
// linting a single file. The identical defect was found and fixed in
// octa-frontend (where the first real run surfaced 35 crash-level bugs); this
// brings octa-admin up to the same standard. Root config on purpose:
// react-scripts merges it into build-time linting, so crash-level rules gate
// `CI=true` builds too.
//
// Same policy as octa-frontend: crash-level rules ERROR (undefined
// identifiers, undefined JSX components, conditional hooks); noisy stylistic
// rules are stood down WITH their counts recorded below, because CRA treats
// warnings as errors when CI is set and a warning backlog must not fail
// deploys. Burn the backlog down rule by rule, then delete the stand-down.

module.exports = {
  root: true,
  extends: ['react-app', 'react-app/jest'],

  rules: {
    // Stood down — counts at the time this config landed (2026-08-31):
    // see the lint-baseline note in the commit that added this file.
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-script-url': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/iframe-has-title': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/alt-text': 'off',

    // Crash-level — pinned at error so a future edit cannot quietly weaken
    // them. These are the rules that caught real bugs in octa-frontend.
    'no-undef': 'error',
    'react/jsx-no-undef': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'no-dupe-keys': 'error',
    'no-const-assign': 'error',
    'no-func-assign': 'error',
    'no-unreachable': 'error',
  },

  ignorePatterns: ['build/', 'node_modules/', 'public/'],
};
