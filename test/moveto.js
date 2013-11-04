var assert = chai.assert;

describe("Parsing move to commands", function() {

  beforeEach(function() {
  });

  afterEach(function() {
  });

  it("should work with single coordinate", function() {
    var commands = new SVGPathData('M100').commands;
    assert.equal(commands[0].type, SVGPathData.MOVE_TO);
    assert.equal(commands[0].relative, false);
    assert.equal(commands[0].x, '100');
  });

  it("should work with comma separated coordinates", function() {
    var commands = new SVGPathData('M100,100').commands;
    assert.equal(commands[0].type, SVGPathData.MOVE_TO);
    assert.equal(commands[0].relative, false);
    assert.equal(commands[0].x, '100');
    assert.equal(commands[0].y, '100');
  });

  it("should work with space separated coordinates", function() {
    var commands = new SVGPathData('m100 \t   100').commands;
    assert.equal(commands[0].type, SVGPathData.MOVE_TO);
    assert.equal(commands[0].relative, true);
    assert.equal(commands[0].x, '100');
    assert.equal(commands[0].y, '100');
  });

  it("should work with single complexer coordinate", function() {
    var commands = new SVGPathData('m-10e-5').commands;
    assert.equal(commands[0].type, SVGPathData.MOVE_TO);
    assert.equal(commands[0].relative, true);
    assert.equal(commands[0].x, '-10e-5');
  });

  it("should work with complexer coordinates", function() {
    var commands = new SVGPathData('m-10e-5 -10e-5').commands;
    assert.equal(commands[0].type, SVGPathData.MOVE_TO);
    assert.equal(commands[0].relative, true);
    assert.equal(commands[0].x, '-10e-5');
    assert.equal(commands[0].y, '-10e-5');
  });

  it("should work with single even more complexer coordinates", function() {
    var commands = new SVGPathData('M-10.0032e-5 -10.0032e-5').commands;
    assert.equal(commands[0].type, SVGPathData.MOVE_TO);
    assert.equal(commands[0].relative, false);
    assert.equal(commands[0].x, '-10.0032e-5');
    assert.equal(commands[0].y, '-10.0032e-5');
  });

  it("should work with comma separated coordinate pairs", function() {
    var commands = new SVGPathData('M123,456 7890,9876').commands;
    assert.equal(commands[0].type, SVGPathData.MOVE_TO);
    assert.equal(commands[0].relative, false);
    assert.equal(commands[0].x, '123');
    assert.equal(commands[0].y, '456');
    assert.equal(commands[1].type, SVGPathData.MOVE_TO);
    assert.equal(commands[1].relative, false);
    assert.equal(commands[1].x, '7890');
    assert.equal(commands[1].y, '9876');
  });

  it("should work with space separated coordinate pairs", function() {
    var commands = new SVGPathData('m123  \t 456  \n 7890  \r 9876').commands;
    assert.equal(commands[0].type, SVGPathData.MOVE_TO);
    assert.equal(commands[0].relative, true);
    assert.equal(commands[0].x, '123');
    assert.equal(commands[0].y, '456');
    assert.equal(commands[1].type, SVGPathData.MOVE_TO);
    assert.equal(commands[1].relative, true);
    assert.equal(commands[1].x, '7890');
    assert.equal(commands[1].y, '9876');
  });

  it("should work with nested separated coordinates", function() {
    var commands = new SVGPathData('M123 ,  456  \t,\n7890 \r\n 9876').commands;
    assert.equal(commands[0].type, SVGPathData.MOVE_TO);
    assert.equal(commands[0].relative, false);
    assert.equal(commands[0].x, '123');
    assert.equal(commands[0].y, '456');
    assert.equal(commands[1].type, SVGPathData.MOVE_TO);
    assert.equal(commands[1].relative, false);
    assert.equal(commands[1].x, '7890');
    assert.equal(commands[1].y, '9876');
  });

  it("should work with multiple command declarations", function() {
    var commands = new SVGPathData('M123 ,  456  \t,\n7890 \r\n 9876m123 \
    ,  456  \t,\n7890 \r\n 9876').commands;
    assert.equal(commands[0].type, SVGPathData.MOVE_TO);
    assert.equal(commands[0].relative, false);
    assert.equal(commands[0].x, '123');
    assert.equal(commands[0].y, '456');
    assert.equal(commands[1].type, SVGPathData.MOVE_TO);
    assert.equal(commands[1].relative, false);
    assert.equal(commands[1].x, '7890');
    assert.equal(commands[1].y, '9876');
    assert.equal(commands[2].type, SVGPathData.MOVE_TO);
    assert.equal(commands[2].relative, true);
    assert.equal(commands[2].x, '123');
    assert.equal(commands[2].y, '456');
    assert.equal(commands[3].type, SVGPathData.MOVE_TO);
    assert.equal(commands[3].relative, true);
    assert.equal(commands[3].x, '7890');
    assert.equal(commands[3].y, '9876');
  });

});
