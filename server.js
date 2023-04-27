const { OAuth2Server } = require("oauth2-mock-server");

let server = new OAuth2Server();

async function startServer() {
  let server = new OAuth2Server();
  await server.issuer.keys.generate("RS256");
  await server.start(8080, "localhost");

  server.service.once("beforeTokenSigning", (token, req) => {
    token.payload.audience = "minio.nordine.com";
    token.payload.scope = "openid profile minio.read";
  });
}
startServer();
