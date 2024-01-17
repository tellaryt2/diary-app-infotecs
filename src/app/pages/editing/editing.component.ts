import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { NoteEditingService } from '../../services/note-editing.service';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrl: './editing.component.css'
})
export class EditingComponent {
  noteId: number;
  description: string;

  constructor(
    private notesService: NotesService,
    private noteEditingService: NoteEditingService,
    private router: Router
    ) {}

  ngOnInit():void {
    const editingNote = this.noteEditingService.getEditingNote();
    this.description = editingNote.description;
  }

  editNote() {
    const editingNote = this.noteEditingService.getEditingNote();
    this.notesService.deleteNote(editingNote.id);
    this.notesService.editNote(editingNote.id, this.description);
    this.router.navigate(['']);
  }
}
