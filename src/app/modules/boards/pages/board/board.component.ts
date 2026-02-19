import { Component, inject, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component';

import { BoardService } from '@services/boards.service';
import { ActivatedRoute } from '@angular/router';
import { Board } from '@models/board.model';
import { Card } from '@models/card.model';

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
  private readonly _boardService = inject(BoardService);
  private readonly _dialog = inject(Dialog);
  private readonly _activatedRoute = inject(ActivatedRoute);

  board: Board | null = null;

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      const boardId = params.get('id');
      if (boardId) {
        this.getBoard(boardId);
      }
    });
  }

  getBoard(boardId: string) {
    this._boardService.getBoard(boardId).subscribe((board) => {
      this.board = board;
    });
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addColumn() {
    this.board?.lists.push({
      id: crypto.randomUUID(),
      title: 'New Column',
      position: this.board?.lists.length || 0,
      cards: [],
    });
  }

  openDialog(card: Card) {
    const dialogRef = this._dialog.open(TodoDialogComponent, {
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
}
