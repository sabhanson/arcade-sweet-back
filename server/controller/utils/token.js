const jose = require('jose')

const issuer = 'ArcadeSweetBack'
const audience = 'ArcadeSweetFront'

let publicKey
let privateKey


async function setKey(){
    let key = await jose.generateKeyPair('PS256');
    publicKey  = key.publicKey
    privateKey = key.privateKey
    return
}

async function getToken(tokenData){
    const jwt = await new jose.SignJWT(
      {metadata: tokenData}
    )
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime('3h')
    .sign(privateKey)

  return jwt;
}

async function decryptToken(token){
  const decryptedToken = await jose.jwtVerify(token, publicKey, {
      issuer,
      audience
  }) 
  return decryptedToken;

}

module.exports = { setKey, getToken, decryptToken }