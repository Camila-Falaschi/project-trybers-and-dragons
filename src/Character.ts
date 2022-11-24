import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  _name: string;
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints = 0;
  private _lifePoints: number;
  private _strength = 0;
  private _defense = 0;
  private _dexterity = 0;
  private _energy: Energy;

  constructor(name: string) {
    this._name = name;
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = { 
      type_: this._archetype.energyType, 
      amount: getRandomInt(1, 10),
    };
  }

  get race() { return this._race; }
  get archetype() { return this._archetype; }
  get energy() { return { ...this._energy }; }

  get strength() { return this._strength; }
  private set strength(newStrength) { this._strength = newStrength; }

  get dexterity() { return this._dexterity; }
  private set dexterity(newDexterity) { this._dexterity = newDexterity; }

  get defense() { return this._defense; }
  private set defense(newDefense) { this._defense = newDefense; }

  get lifePoints() { return this._lifePoints; }
  private set lifePoints(life) { this._lifePoints = life; }

  private get maxLifePoints() { return this._maxLifePoints; }
  private set maxLifePoints(newLife) { this._maxLifePoints = newLife; }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage > 0) this._lifePoints -= damage;
    if (damage <= 0) this._lifePoints -= 1;
    if (this._lifePoints <= 0) this._lifePoints = -1;
    return this._lifePoints;
  }

  attack(enemy: Fighter | SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }

  levelUp(): void {
    const newMaxLifePoints = this._maxLifePoints + getRandomInt(1, 10);
    const raceMaxLife = this.race.maxLifePoints;
    if (newMaxLifePoints > raceMaxLife) {
      this._maxLifePoints = raceMaxLife;
      this._lifePoints = raceMaxLife;
    } 
    if (newMaxLifePoints <= raceMaxLife) {
      this._maxLifePoints = newMaxLifePoints;
      this._lifePoints = newMaxLifePoints;
    }

    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);

    this._energy.amount = 10;
  }

  special(enemy: Fighter | SimpleFighter): void {
    enemy.receiveDamage(this._strength * 2);
  }
}