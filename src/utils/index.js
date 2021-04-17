export function sortFunction(arr, field) {
  return arr.sort((a, b) => a[field].localeCompare(b[field]));
}
export function converToArray(obj) {
  const arr = [];
  Object.keys(obj).map(key => arr.push(obj[key]));
  return arr;
}
