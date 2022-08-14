import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });


  if (fighter) {
    fighterElement.appendChild(createFighterName(fighter));
    fighterElement.appendChild(createFighterImage(fighter));
    fighterElement.appendChild(createFighterStats(fighter));
  }
  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };

  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}

export function createFighterName(fighter) {
  const { name } = fighter;
  const nameElement = createElement({
    tagName: 'div',
    className: 'fighter-preview___name',
  });
  nameElement.innerHTML = `<h1>${name}</h1>`;

  return nameElement;
}

export function createFighterStats(fighter) {
  const { health, attack, defense } = fighter;
  const statsElement = createElement({
    tagName: 'div',
    className: 'fighter-preview___stats',
  });

  statsElement.innerHTML = `
    <p class='health'>Health: ${health}</p>
    <p class='attack'>Attack: ${attack}</p>
    <p class='defence'>Defence: ${defense}</p>
  `;

  return statsElement;
}
