function defineCookie(key, value) {
  document.cookie = `${key}=${value}; path=/`;
}

function getCookie(key) {
  const cookie = document.cookie
    ? document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith(`${key}=`))
        .split("=")[1]
    : null;

  if (cookie) {
    return cookie;
  }
}

function removeCookie(key) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00`;
}
export { defineCookie, getCookie, removeCookie };
