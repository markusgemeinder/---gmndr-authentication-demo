// /utils/getLanguageFromCookies.js

export function getLanguageFromCookies(request) {
  console.log('Request object:', request); // Log the request object
  const cookies = request.headers.get('cookie') || '';
  const languageMatch = cookies.match(/language=(EN|DE)/);
  return languageMatch ? languageMatch[1] : 'EN';
}
