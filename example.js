const lucene = require("./src/index")(require("lucene"));
let result;

const data = [
  {
    name: "C-3PO",
    description: "Protocol droid.",
    species: "Droid",
    cost: 1000,
  },
  {
    name: "R2-D2",
    description: "Astromech droid built on Naboo.[123]",
    species: "Droid",
    cost: 1000,
  },
  {
    name: "R2-D2",
    description: "Astromech droid built on Naboo.[abc]",
    species: "Human",
    cost: 1500,
  },
  {
    name: "Anakin Skywalker",
    description: "Fallen Jedi, the chosen one.",
    species: "Human",
    cost: 2000,
  },
  { name: "Obi-Wan Kenobi", description: "Jedi Master.", species: "Human" },
  {
    name: "Moon Moon",
    description: "Mentally challenged wolf.",
    species: "Wolf",
    cost: 10000,
  },
];

/* // Prints an array with both R2-D2 and C-3PO
console.log(data.filter(lucene("species: droid")).map((x) => x.name));

// Prints an array with only R2-D2
console.log(data.filter(lucene("astromech")).map((x) => x.name));

// Prints an array with both jedi
console.log(data.filter(lucene("jedi")).map((x) => x.name));

// Prints an array with only the outcast
console.log(data.filter(lucene('name: "moon moon"')).map((x) => x.name));

// Prints Obi-Wan
console.log(
  data.filter(lucene("species: human AND master")).map((x) => x.name)
);

console.log("last");
console.log(data.filter(lucene("species: droid ")).map((x) => x.name));
console.log(
  data.filter(lucene('species: droid AND NOT name:"R2-D2"')).map((x) => x.name)
);
console.log(
  data
    .filter(lucene('species:wolf OR NOT name:"R2-D2"'))
    .map((x) => x.name + " " + x.species)
);

console.log(
  data.filter(
    lucene("cost:[2000 TO 10000} AND (species: Human OR species: Wolf)")
  )
);
function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
console.log(fixedEncodeURIComponent("[]")); */
console.log(data.filter(lucene("\\[123\\]")));
