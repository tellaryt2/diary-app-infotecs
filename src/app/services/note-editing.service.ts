import { Injectable } from '@angular/core';
import { Inote } from '../modeles/note';

@Injectable({
  providedIn: 'root'
})
export class NoteEditingService {
  private editingNote: Inote;

  setEditingNote(note: Inote) {
    this.editingNote = note;
  }

  getEditingNote(): Inote {
    return this.editingNote
  }

  constructor() { }
}
