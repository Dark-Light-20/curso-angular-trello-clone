import { Card } from './card.model';
import { Color } from './color.model';
import { List } from './list.model';
import { User } from './user.model';

export interface Board {
  id: string;
  title: string;
  backgroundColor: Color;
  members: User[];
  lists: List[];
  cards: Card[];
}
