import { showModal } from './modal';
import { createFighterImage } from '../fighterPreview';
import { createElement } from '../../helpers/domHelper';

export function showWinnerModal(fighter) {
  showModal({
    title: `Winner is ${fighter.name}`,
    bodyElement: createBodyElement(fighter),
    onClose: () => {
      location.reload();
    }
  });
}

function createBodyElement(fighter) {
  const fighterElement = createElement({
    tagName: 'div',
    className: 'winner'
  });

  fighterElement.appendChild(createFighterImage(fighter));
  return fighterElement;
}
