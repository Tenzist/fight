import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  firstFighter = {
    ...firstFighter,
    currentHP: firstFighter.health,
    hpBar: document.getElementById(`left-fighter-indicator`),
    isCriticalHitCooldown: true
  }

  secondFighter = {
    ...secondFighter,
    currentHP: secondFighter.health,
    hpBar: document.getElementById(`right-fighter-indicator`),
    isCriticalHitCooldown: true
  }

  return new Promise((resolve) => {
    const keyCodes = new Set();
    addEventListener('keydown', event => {
      keyCodes.add(event.code);

      const setCriticalHitCooldown = (fighter) => {
        fighter.isCriticalHitCooldown = false;
        setTimeout(() => fighter.isCriticalHitCooldown = true, 10000);
      }

      const checkPlayerCombination = (combination) => {
        return combination.every((keyCode) => keyCodes.has(keyCode))
      }

      const proccessHit = (attacker, defender, isCriticalHit = false) => {
        if (isCriticalHit) {
          setCriticalHitCooldown(attacker);
        }
        const damage = getDamage(attacker, defender, isCriticalHit);
        defender.currentHP -= damage;
        defender.hpBar.style = `width: ${(defender.currentHP * 100) / defender.health}%`
      }

      if (checkPlayerCombination(controls.PlayerOneCriticalHitCombination) && firstFighter.isCriticalHitCooldown) {
        proccessHit(firstFighter, secondFighter, true);
      }

      if (checkPlayerCombination(controls.PlayerTwoCriticalHitCombination) && secondFighter.isCriticalHitCooldown) {
        proccessHit(secondFighter, firstFighter, true);
      }

      if (!keyCodes.has(controls.PlayerTwoBlock) && !keyCodes.has(controls.PlayerOneBlock)) {
        if (event.code === controls.PlayerOneAttack) {
          proccessHit(firstFighter, secondFighter);
        }
        if (event.code === controls.PlayerTwoAttack) {
          proccessHit(secondFighter, firstFighter);
        }
      }
    })

    addEventListener('keyup', (event) => {
      keyCodes.delete(event.code);
      if (firstFighter.currentHP < 0) {
        resolve(secondFighter);
        firstFighter.hpBar.style = 'display: none';
      }

      if (secondFighter.currentHP < 0) {
        resolve(firstFighter);
        secondFighter.hpBar.style = 'display: none';
      }
    })
  });
}

export function getDamage(attacker, defender, isCriticalHit = false) {
  if (isCriticalHit) {
    return attacker.attack * 2;
  }
  const attackerHitPower = getHitPower(attacker);
  const defenderBlockPower = getBlockPower(defender);

  return defenderBlockPower > attackerHitPower ? 0 : attackerHitPower - defenderBlockPower;
}

export function getHitPower(fighter) {
  return fighter.attack * (Math.random() + 1);
}

export function getBlockPower(fighter) {
  return fighter.defense * (Math.random() + 1);
}