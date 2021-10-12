import { NOMBRE_OF_FACES } from "./consts"
import { KIND, STRAIGHT } from "./enums"
import { Dices } from "./types"

export default class Yatzy {

  /**
   * Count the value of each value
   * @param dices : value of each dices
   * @returns array with the counts of each value
   */
  getCounts(dices: Dices): number[] {
    let counts = Array(NOMBRE_OF_FACES).fill(0)
    dices.forEach(value => counts[value-1]++)
    return counts
  }
  
  /**
   * The player scores the sum of all dice
   * @param dices : value of each dices
   * @returns number
   */
  chance(...dices: Dices): number {
    return dices.reduce((previous, current) => previous += current, 0)
  }

  /**
   * If all dice have the same number, the player scores 50 points
   * @param dices 
   * @returns 50 if yatzy else 0
   */
  yatzy(...dices: Dices): number {
    let counts = this.getCounts(dices)
    return counts.find(value => value === dices.length) ? 50 : 0
  }

  /**
   * The player scores the sum of dices that have the value excpected
   * @param score : the value scored
   * @param dices : value of each dices
   * @returns sum of the dice with the score expected
   */
  scores (score: number, ...dices: Dices): number {
    return dices.filter(value => value === score).length * score
  }

  /**
   * scores the sum of the n highest matching dices
   * @param dices : value of each dices
   * @returns sum of the n highest matching dices
   */
  scorePair(numberOfPair: number, ...dices: Dices): number {
    let counts = this.getCounts(dices)
    let pairAdded = 0
    let result = 0
    let i = NOMBRE_OF_FACES
    while(i >= 0 && pairAdded < numberOfPair) {
      if(counts[i - 1] >= 2) {
        result += i * 2
        pairAdded++
      }
      i++
    }
    return pairAdded === numberOfPair ? result : 0
  }

   /**
   * If there are n dice with the same number, the player scores the sum of these dice
   * param valueExcepected 
   * @param kind: KIND
   * @param dices : value of each dices
   * @returns sum of the n  dice with the same number
   */
  scoreKind(kind: KIND, ...dices: Dices): number {
    let counts = this.getCounts(dices)
    const index = counts.findIndex(value => value >= kind)
    return index === -1 ? 0 : (index + 1) * kind
  }

  /**
   * if the dice read 1,2,3,4,5 the player scores 15 else if the dice read 2,3,4,5,6 the player scores 20
   * @param straight : the type of straight scored 
   * @param dices: value of dices
   * @returns number: score
   */
  scoreStraight(straight: STRAIGHT, ...dices: Dices): number {
    const startIndex = straight === STRAIGHT.SMALL ? 0 : 1
    let counts = this.getCounts(dices)
    return counts.splice(startIndex, startIndex + 4).every(value => value === 1) ? straight : 0
  }

  /**
   * If the dice are two of a kind and three of a kind, the player scores the sum of all the dice
   * @param dices: value of dices
   * @returns number: score
   */
  fullHouse(...dices: Dices): number {
    if(this.scoreKind(KIND.TWO, ...dices) !== 0 && this.scoreKind(KIND.THREE, ...dices) !== 0) {
      return this.chance(...dices)
    }
    return 0
  }

}
