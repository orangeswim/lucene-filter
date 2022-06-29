// Factory
const lucene = (module.exports = function factory(parser) {
  // Parser must be given
  if (!parser) {
    throw new Error(
      "No parser given. Must be one of 'lucene','lucene-queryparser','lucene-query-parser'"
    );
  }

  // The given parser must be compatible
  if ("object" !== typeof parser || "function" !== typeof parser.parse) {
    throw new Error(
      "Incompatible parser given. Must be one of 'lucene','lucene-queryparser','lucene-query-parser'"
    );
  }

  // Returns Function(Object):Number
  function compile(query, escaped, excludeImplicitKeys, returnQuery) {
    if (!query) return () => 0;
    if (returnQuery) {
      return [compile(query, escaped, excludeImplicitKeys, false), query];
    }

    if ("string" === typeof query) {
      try {
        query = parser.parse(query);
      } catch (e) {
        throw e;
        return () => 0;
      }
    }

    // Compile multi-query
    if (query.operator) {
      if (!lucene.operators[query.operator]) {
        throw `${query.operator} operator does not exist`;
      }
      return lucene.operators[query.operator](
        compile(query.left, escaped, excludeImplicitKeys),
        compile(query.right, escaped, excludeImplicitKeys)
      );
    }

    // Wrapped
    if (query.left) {
      return compile(query.left, escaped, excludeImplicitKeys);
    }

    // unescape query
    if (query.term != undefined && escaped) {
      query.term = query.term.replaceAll("\\", "");
    }

    // Ensure default boost
    query.boost = query.boost || 1;

    // Return the first detected filter
    for (const filter of lucene.filters) {
      if (filter.detect(query)) {
        return filter.compile(query, excludeImplicitKeys);
      }
    }

    // Return no match
    return () => 0;
  }

  // Return the data when matching
  compile.passthrough = function (parser, query) {
    let match = compile(query);
    return function (data) {
      if (match(data)) return data;
      return undefined;
    };
  };

  return compile;
});

// Add filters & operators
lucene.filters = require("./filters");
lucene.operators = require("./operators");

// Browser exports
if ("function" === typeof define && define.amd) {
  define(() => lucene);
} else if ("object" === typeof window) {
  window.lucene = lucene;
}
