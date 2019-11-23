/*
interface Stage {
  year: number | string,
  scene: string,
  hints: Array<string>,
  articles: Array<string>,
}
*/

class Gress {
  stage = null;
  stages = [];

  constructor(stages) {
    this.$year    = document.querySelector('#year');
    this.$scene   = document.querySelector('#scene');
    this.$hint    = document.querySelector('#hint');
    this.$form    = document.querySelector('form');
    this.$article = document.querySelector('input[name="article"');

    // clone
    this.stages = [...stages];
  }

  start() {
    this.stage = this.stages.shift();
    this.setupStageUI();
    this.resetStageUI();
  }

  nextStage() {
    if (this.stages.length === 0) {
      alert('You have finished the game and reached the present!');
    } else {
      alert('Progressing!');
      this.stage = this.stages.shift();
      this.resetStageUI();
    }
  }

  showHint() {
    this.$hint.innerText = 'HINT: ' + this.stage.hints[0];
    this.$hint.classList.remove('covered');
  }

  processAnswer() {
    const input = this.$article.value;
    const article = input.includes('https://') ? Gress.extractArticle(input) : input;

    const sameStr = (x, y) => x.trim().toUpperCase() === y.trim().toUpperCase();
    const correct = this.stage.articles.some(x => sameStr(x, article));

    if (correct) {
      alert('Correct!');
      this.nextStage();
    } else {
      alert('Nah, think again');
    }
  }

  setupStageUI() {
    this.$form.addEventListener(
      'submit',
      (e) => { e.preventDefault(); this.processAnswer(); },
      false
    );

    this.$hint.addEventListener(
      'click',
      () => { this.showHint(); },
      false
    )

  }

  resetStageUI() {
    this.$year.innerText = `The year is ${this.stage.year}...`;
    this.$scene.innerText = this.stage.scene;
    this.$hint.innerText = '~~CLICK TO SHOW HINT~~';
    this.$hint.classList.add('covered');
    this.$article.value = '';
  }
  
  static extractArticle(str) {
    try {
      const url = new URL(str);
      const article = url.pathname.slice(6).replace(/_/g, ' ');
      return article;
    } catch (e) {
      return '';
    }
  }
  
}

const stages = [
  {
    year: '1859*', // not a leap year
    scene: `You see a giraffe with a short neck.
      This giraffe follows you you progress through the level.
      You notice the giraffe stretching its neck to reach trees that get taller and taller...

      The giraffe stops at the boundary of the stage, blocking yout way with its long neck.`,
    hints: [
      'This is a famous example of Lamarck\'s theory of evolution'
    ],
    articles: [
      'On the Origin of Species',
      'Darwinism',
      'Charles Darwin',
    ]
  },

  {
    year: 1912,
    scene: `The background consists of superposed differently-colored layers (hints to strata/geology)
      You jump over extinct animals/dinosaurs' skeletons/fossils, avoiding lava underneath...

      At the boundary, you find some continents stack and fixed together, blocking the exit.`,
    hints: [
      'If only we could move those continents...'
    ],
    articles: [
      'Continental drift',
      'Alfred Wegener'
    ]
  }
  
];

const game = new Gress(stages);
game.start();
