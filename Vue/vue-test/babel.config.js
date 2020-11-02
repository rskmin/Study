module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'import',
      {
        "libraryName": "v3-comp-rm",
        "customName": (name) => {
          return `v3-comp-rm/src/packages/${name}/index.ts`;
        }
      }
    ]
  ]
}
