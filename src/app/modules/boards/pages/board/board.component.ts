import { Component, OnInit, inject } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { CardDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component';

import { ActivatedRoute } from '@angular/router';
import { BoardsService } from '@services/boards.service';
import { Board } from '@models/board.model';
import { Card } from '@models/card.model';
import { CardsService } from '@services/cards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class BoardComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _boardsService = inject(BoardsService);
  private readonly _cardsService = inject(CardsService);

  board: Board | null = null;

  constructor(private dialog: Dialog) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getBoard(id);
      }
    });
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const position = this._boardsService.getPosition(
      event.container.data,
      event.currentIndex
    );
    const card = event.container.data[event.currentIndex];
    const listId = event.container.id;
    this.updateCard(card, position, listId);
  }

  addColumn() {
    /* this.columns.push({
      title: 'New Column',
      todos: [],
    }); */
  }

  openDialog(card: Card) {
    const dialogRef = this.dialog.open(CardDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        card: card,
      },
    });
    dialogRef.closed.subscribe((output) => {
      if (output) {
        console.log(output);
      }
    });
  }

  private getBoard(id: Board['id']) {
    this._boardsService.getBoard(id).subscribe((board) => (this.board = board));
  }

  private updateCard(card: Card, position: number, listId: string) {
    this._cardsService
      .update(card.id, { position, listId })
      .subscribe((cardUpdated) => console.log(cardUpdated));
  }
}
