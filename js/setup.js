'use strict';

var userDialog = document.querySelector('.setup');
var openIcon = document.querySelector('.setup-open');
var closeDialog = document.querySelector('.setup-close');
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');
var NUMBER_WIZARD = 4;
var userName = userDialog.querySelector('.setup-user-name');
var btnSubmit = userDialog.querySelector('.setup-submit');
var setupForm = userDialog.querySelector('.setup-wizard-form');
var mainWizard = document.querySelector('.setup-wizard');
var wizardCoat = mainWizard.querySelector('.wizard-coat');
var wizardEye = mainWizard.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var inputFormCoat = document.querySelector('input[name ="coat-color"]');
var inputFormEye = document.querySelector('input[name ="eyes-color"]');

var getRandomElement = function (arr) {
  return Math.round(Math.random() * (arr.length - 1));
};

var getNewArrow = function () {
  var mans = [];
  for (var i = 0; i < NUMBER_WIZARD; i++) {
    mans[i] =
    {
      name: WIZARD_NAMES[getRandomElement(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRandomElement(WIZARD_SURNAMES)],
      coatColor: WIZARD_COATS_COLOR[getRandomElement(WIZARD_COATS_COLOR)],
      eyesColor: WIZARD_EYES_COLOR[getRandomElement(WIZARD_EYES_COLOR)]
    };
  }
  return mans;
};

var wizards = getNewArrow();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var filledList = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

filledList();
userDialog.querySelector('.setup-similar').classList.remove('hidden');

var openSetup = function () {
  userDialog.classList.remove('hidden');
};

var closeSetup = function () {
  userDialog.classList.add('hidden');
};

openIcon.addEventListener('click', function () {
  openSetup();
});

closeDialog.addEventListener('click', function () {
  closeSetup();
});

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openSetup();
  }
});

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape' && (!(userName === document.activeElement))) {
    closeSetup();
  }
});

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter' && closeDialog === document.activeElement) {
    closeSetup();
  }
});

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter' && btnSubmit === document.activeElement) {
    setupForm.submit();
  }
});


var clickRandomElementColor = function (el, arr, input) {
  el.addEventListener('click', function () {
    var color = arr[getRandomElement(arr)];
    el.style.fill = color;
    input.value = color;
  });
};

wizardFireball.addEventListener('click', function () {
  var backColor = WIZARD_FIREBALL_COLOR[getRandomElement(WIZARD_FIREBALL_COLOR)];
  wizardFireball.style = 'background-color: ' + backColor + ';';
  wizardFireball.querySelector('input').value = backColor;
});

clickRandomElementColor(wizardCoat, WIZARD_COATS_COLOR, inputFormCoat);
clickRandomElementColor(wizardEye, WIZARD_EYES_COLOR, inputFormEye);
