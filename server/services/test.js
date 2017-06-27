function Test(){
  this.label = '1234';
}

Test.prototype.getlabel = function(){
  return label;
}

exports = Test;
