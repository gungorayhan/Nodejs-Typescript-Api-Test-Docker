export default{
    port:process.env.port,
    PORT:process.env.PORT,
    dbUri:process.env.dbUri,
    saltWorkFactor:process.env.saltWorkFactor,
    accessTokenTtl:process.env.accessTokenTtl,
    refreshTokenTtl:process.env.refreshTokenTtl,
    publicKey:process.env.publicKey,
    privateKey:process.env.privateKey
}