'use strict';

var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

// async & distributable genetic algorithm

var GA = function () {
  function GA() {
    babelHelpers.classCallCheck(this, GA);

    this.population = [];
  }

  babelHelpers.createClass(GA, [{
    key: "tick",
    value: function tick() {
      var entity = void 0;

      if (this.population.length < 250) {
        entity = this.generate();
      } else {
        entity = this.cross(this.select(), this.select());
        this.population.shift();
      }

      if (Math.random() > 0.8) {
        this.mutate(entity);
      }

      var fitness = this.assess(entity);
      this.population.push({ entity: entity, fitness: fitness });
    }
  }, {
    key: "select",
    value: function select() {
      // Tournament 3
      return [this._rndInst(), this._rndInst(), this._rndInst()].reduce(function (memo, inst) {
        return memo && memo.fitness > inst.fitness ? memo : inst;
      }).entity;
    }
  }, {
    key: "_rndInst",
    value: function _rndInst() {
      var i = Math.floor(Math.random() * this.population.length);
      return this.population[i];
    }
  }, {
    key: "best",
    value: function best() {
      return Math.max.apply(Math, this.population.map(function (x) {
        return x.fitness;
      }));
    }
  }, {
    key: "bestE",
    value: function bestE() {
      var m = this.best();
      return this.population.filter(function (x) {
        return x.fitness == m;
      })[0];
    }
  }]);
  return GA;
}();

var GAUint8 = function (_GA) {
  babelHelpers.inherits(GAUint8, _GA);

  function GAUint8(size) {
    babelHelpers.classCallCheck(this, GAUint8);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(GAUint8).call(this));

    _this.size = size;
    return _this;
  }

  babelHelpers.createClass(GAUint8, [{
    key: "generate",
    value: function generate() {
      return new Uint8Array(this.size).fill(0).map(function () {
        return Math.random() * 255;
      });
    }
  }, {
    key: "cross",
    value: function cross(mother, father) {
      var len = this.size;

      // 2 point cross (not binary)
      var a = this._rnd();
      var b = this._rnd();
      if (a > b) {
        ;

        var _ref = [b, a];
        a = _ref[0];
        b = _ref[1];
      }var daughter = new Uint8Array(mother);

      daughter.set(father.subarray(a, b), a);

      return daughter;
    }
  }, {
    key: "mutate",
    value: function mutate(entity) {
      var at = this._rnd();
      entity[at] ^= 1 << Math.random() * 8;

      entity[at] += Math.random() * 50 - 25;
      entity[at] = Math.random() * 255;
    }
  }, {
    key: "_rnd",
    value: function _rnd() {
      return Math.floor(Math.random() * this.size);
    }
  }]);
  return GAUint8;
}(GA);

var size = 300;

// create template canvas
var canvas = document.createElement('canvas');
canvas.width = canvas.height = size;
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d');
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.font = '300px Helvetica';

var render = function render(entity) {

  ctx.fillStyle = 'rgba(0,0,255,0.5)';
  ctx.clearRect(0, 0, size, size);
  ctx.fillText('A', size / 2, size / 2);

  ctx.fillStyle = 'rgba(255,0,0,0.5)';

  ctx.beginPath();
  for (var i = 0; i < entity.length; i += 3) {

    var x = entity[i] / 255 * size;
    var y = entity[i + 1] / 255 * size;
    var r = entity[i + 2] / 9;

    ctx.moveTo(x, y);
    ctx.ellipse(x, y, r, r, 0, 0, Math.PI * 2);
  }
  ctx.fill();
};

var _assess = function _assess(entity) {
  render(entity);

  var image = ctx.getImageData(0, 0, size, size);

  var correct = 0;
  for (var i = 0; i < image.data.length; i += 4) {
    if (
    // white, good
    image.data[i + 3] == 0 ||
    // red + blue, good
    image.data[i] && image.data[i + 2]) {
      correct++;
    }
  }

  return correct * 4 / image.data.length;
};

var count = 0;

var circleText = function (_GAUint) {
  babelHelpers.inherits(circleText, _GAUint);

  function circleText() {
    babelHelpers.classCallCheck(this, circleText);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(circleText).call(this, 70 * 3));
  }

  babelHelpers.createClass(circleText, [{
    key: 'assess',
    value: function assess(entity) {
      count++;
      return _assess(entity);
    }
  }]);
  return circleText;
}(GAUint8);

var ct = new circleText();
var inter = setInterval(ct.tick.bind(ct), 1);
setTimeout(function () {
  clearInterval(inter);
  console.log(count);
}, 15000);