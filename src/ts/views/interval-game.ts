import NodeBuilder from '../helpers/node-builder';

class IntervalGameView extends NodeBuilder {
  constructor() {
    super({ parentNode: null, className: 'interval-game-field' });

    const intervalGameH2 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: 'This is the interval game field',
    });

    console.log(intervalGameH2);
  }
}

export default IntervalGameView;
