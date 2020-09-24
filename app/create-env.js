const { writeFile } = require('fs')
const { promisify } = require('util')
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')

const writeFileAsync = promisify(writeFile)

const { SECRET_NAME } = process.env

if (!SECRET_NAME) {
  console.log('Must set "SECRET_NAME" environment variable')
  process.exit(1)
}

async function getSecret() {
  const client = new SecretManagerServiceClient()
  try {
    const [version] = await client.accessSecretVersion({
      name: SECRET_NAME,
    })
    return version.payload.data.toString('utf8')
  }
  catch (e) {
    console.error(`error: could not retrieve secret: ${e}`)
    return
  }
}

(async () => {
  const secret = await getSecret()

  if(!secret) {
    console.error('error: failed to create "env" file')
    return
  }

  await writeFileAsync('.env', secret)

  console.log('success: created ".env" file')
})()
