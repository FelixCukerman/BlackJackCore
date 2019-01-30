import { Suit } from 'src/app/shared/enums/suit';
import { CardName } from 'src/app/shared/enums/card-name';

export class ResponseCardViewModel
{
  constructor(suit, cardValue, cardName)
  {
    this.suit = suit;
    this.cardValue = cardValue;
    this.cardName = cardName;
  }

  public suit: Suit;
  public cardValue: number;
  public cardName: CardName;
}
