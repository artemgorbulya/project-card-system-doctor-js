function getTokenFromCookie() {
  const tokenCookie = document.cookie.match(/tokenDanAPI=(\w|\d){12}/);
  if (tokenCookie) {
    return tokenCookie.input.split("=")[1];
  }
}

function writeTokenToCookie(token) {
	document.cookie = `tokenDanAPI=${token}`;
}

export {
  writeTokenToCookie,
  getTokenFromCookie,
}