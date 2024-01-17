import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inote } from '../../modeles/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {
  @Input() note: Inote;

  @Output() delete = new EventEmitter<number>();

  @Output() editing = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this.note.id)
  }

  onEditing() {
    this.editing.emit(this.note.id)
  }
}
