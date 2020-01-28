'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var BAR_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var TEXT_INDENT = 20;
var CLOUD_X = 150;
var CLOUD_Y = 255;


var renderCloud = function (ctx, x, y, color) {
  var newPointX = x + CLOUD_WIDTH;
  var newPointY = y + CLOUD_HEIGHT;
  var middleBezierX = newPointX - COLUMN_GAP;
  var middleBezierY = newPointY / 2;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(newPointX, y);
  ctx.bezierCurveTo(newPointX, y, middleBezierX, middleBezierY, newPointX, newPointY);
  ctx.lineTo(x, newPointY);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomPercent = function (min, max) {
  return ((Math.round(Math.random() * (max - min + 1)) + min) + '%');
};

window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxElement(times);
  renderCloud(ctx, 120, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 150, 25);
  ctx.fillText('Список результатов: ', 150, 45);

  for (var i = 0; i < names.length; i++) {
    var columnTextX = CLOUD_X + (COLUMN_WIDTH + COLUMN_GAP) * i;
    var columnHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var rectY = CLOUD_Y - TEXT_INDENT;
    var columnTimeY = rectY - columnHeight - TEXT_INDENT;
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], columnTextX, CLOUD_Y);
    ctx.fillText(Math.round(times[i]), columnTextX, columnTimeY);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(columnTextX, rectY, COLUMN_WIDTH, columnHeight * (-1));
    } else {
      ctx.fillStyle = 'hsl(240,' + getRandomPercent(0, 100) + ', 50%)';
      ctx.fillRect(columnTextX, rectY, COLUMN_WIDTH, columnHeight * (-1));
    }
  }
};
