import { Suit } from 'src/app/shared/enums/suit';
import { CardName } from 'src/app/shared/enums/card-name';

export class ResponseCardViewModel
{
  constructor(Suit, CardValue, CardName)
  {
    this.Suit = Suit;
    this.CardValue = CardValue;
    this.CardName = CardName;
  }

  public Suit: Suit;
  public CardValue: number;
  public CardName: CardName;
}
