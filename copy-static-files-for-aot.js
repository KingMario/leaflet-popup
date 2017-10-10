const fs = require('fs')

console.log('Copy static files ...')

const destinationRoot = 'aot'

const resources = [
  'node_modules/core-js/client/shim.min.js',
  'node_modules/zone.js/dist/zone.min.js',
  'src/favicon.ico',
  'src/styles.css',
  'src/index-aot.html'
]

resources.forEach(function (source) {
  const path = source.split('/')
  let destination = path[path.length - 1]
  if (destination === 'index-aot.html') {
    destination = 'index.html'
  }
  destination = `${destinationRoot}/${destination}`
  fs.createReadStream(source).pipe(fs.createWriteStream(destination))
})

const syncFolder = (dir, sourceRoot, destinationRoot) => {
  fs.readdirSync(dir).forEach(function (file) {
    if (file.indexOf('.') !== 0) {
      const childPath = dir + '/' + file
      const stat = fs.statSync(childPath)

      if (stat.isDirectory()) {
        fs.mkdirSync(childPath.replace(new RegExp(`^${sourceRoot}`), destinationRoot))
        syncFolder(childPath, sourceRoot, destinationRoot)
      } else {
        let destination = childPath.replace(new RegExp(`^${sourceRoot}`), destinationRoot)
        fs.createReadStream(childPath).pipe(fs.createWriteStream(destination))
      }
    }
  })
}

fs.mkdirSync(`${destinationRoot}/assets`)
syncFolder('src/assets', 'src', destinationRoot)

console.log('Done!')
