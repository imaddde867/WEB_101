const uniques = new Set();

uniques.add("one");
uniques.add("two");
uniques.add("two");
uniques.add("two");

console.log(uniques);

uniques.delete("two");

console.log(uniques);
console.log(uniques.has("two"));