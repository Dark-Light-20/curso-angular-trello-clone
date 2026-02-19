import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Colors } from '@models/colors.model';
import { BoardService } from '@services/boards.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
})
export class BoardFormComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _boardService = inject(BoardService);
  private readonly _router = inject(Router);

  @Output() closeOverlay = new EventEmitter<boolean>();

  form = this._fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    backgroundColor: new FormControl<Colors>('sky', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  doSave() {
    if (this.form.valid) {
      const { title, backgroundColor } = this.form.getRawValue();
      this._boardService
        .createBoard(title!, backgroundColor)
        .subscribe((board) => {
          this._router.navigate(['/app/boards', board.id]);
          this.closeOverlay.emit(false);
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
