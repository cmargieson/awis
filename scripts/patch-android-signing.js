const fs = require('node:fs')
const path = require('node:path')

const root = path.join(__dirname, '..')
const buildGradle = path.join(root, 'android/app/build.gradle')
const keystoreProps = path.join(root, 'android/keystore.properties')

if (!fs.existsSync(buildGradle)) {
  console.error('android/app/build.gradle not found — run expo prebuild first')
  process.exit(1)
}

if (!fs.existsSync(keystoreProps)) {
  console.error('android/keystore.properties not found')
  process.exit(1)
}

let gradle = fs.readFileSync(buildGradle, 'utf8')
if (gradle.includes('AWIS_RELEASE_SIGNING')) {
  process.exit(0)
}

const props = fs.readFileSync(keystoreProps, 'utf8')
const get = (key) => props.match(new RegExp(`^${key}=(.+)$`, 'm'))?.[1]?.trim()
const storeFile = get('storeFile')
if (!storeFile) {
  console.error('keystore.properties must define storeFile')
  process.exit(1)
}

const signingBlock = `
// AWIS_RELEASE_SIGNING
def awisKeystorePropertiesFile = rootProject.file("keystore.properties")
def awisKeystoreProperties = new Properties()
if (awisKeystorePropertiesFile.exists()) {
    awisKeystoreProperties.load(new FileInputStream(awisKeystorePropertiesFile))
}
`

const releaseSigningConfig = `
        release {
            if (awisKeystorePropertiesFile.exists()) {
                storeFile file(awisKeystoreProperties['storeFile'])
                storePassword awisKeystoreProperties['storePassword']
                keyAlias awisKeystoreProperties['keyAlias']
                keyPassword awisKeystoreProperties['keyPassword']
            }
        }`

if (!gradle.includes('signingConfigs')) {
  console.error('Unexpected build.gradle structure — signingConfigs block missing')
  process.exit(1)
}

gradle = signingBlock + gradle
gradle = gradle.replace(
  /(signingConfigs\s*\{[\s\S]*?debug\s*\{[\s\S]*?\})/,
  `$1${releaseSigningConfig}`
)

gradle = gradle.replace(
  /(buildTypes\s*\{\s*release\s*\{)/,
  '$1\n            signingConfig signingConfigs.release'
)

fs.writeFileSync(buildGradle, gradle)
console.info('Patched android/app/build.gradle for release signing')
