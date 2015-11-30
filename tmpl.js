(function(main){
  var evaluator = /[+\-\*\\%]|!?[!=<>]==?|[<>()]|if|else|while|for|switch|case|break/;
  var compiler = /{{([^}]+)?}}/g;

  var tmpl = {};

  tmpl.extractor = function(obj, path, set){
    var children = path.split(".");
    var result = obj;
    for (var i = 0; i < children.length; i++) {
      var attr = children[i];
      if (!result[attr]){
        result[attr] = {};
      }
      result = result[attr];
    }
    return result;
  }

  tmpl.evaluate = function(expression, scope){
    return (new Function('return '+expression))();
  };

  tmpl.compile = function(template, scope){
    var match, compiled = template;

    while(match = compiler.exec(template)){
      var expression = match[0];
      var attr = match[1];
      if (expression.match(evaluator)){
        compiled = compiled.replace(expression, tmpl.evaluate(attr, scope));
      } else {
        compiled = compiled.replace(expression, tmpl.extractor(scope, attr));
      }
    }

    return compiled;
  };

  main.tmpl = tmpl;
})((typeof window === 'undefined' || window === null) ? global : window);