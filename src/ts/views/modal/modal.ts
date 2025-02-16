import Translation from '../../constants/translation';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import UserConfig from '../../models/user-config';
import { Languages } from '../../types/data-types';

class Modal extends NodeBuilder {
  guestButton: ButtonBuilder;

  h2: NodeBuilder;

  onAuth!: () => void;

  constructor(parentNode: HTMLElement, config: UserConfig) {
    super({
      parentNode,
      tagName: 'div',
      className: 'modal',
    });
    const language = config.getLanguage();

    this.h2 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: Translation.welcomeModalHeader[Languages[language] as keyof typeof Languages],
    });
    this.guestButton = new ButtonBuilder({
      parentNode: this.node,
      className: 'guest',
      content: Translation.welcomeModalGuestBtn[Languages[language] as keyof typeof Languages],
    });

    this.node.addEventListener('click', (): void => {
      this.node.remove();
      this.onAuth();
    });
  }
}

export default Modal;
