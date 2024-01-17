import { Component, OnInit } from '@angular/core';
import { Inote } from '../../modeles/note';
import { Router } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { NoteEditingService } from '../../services/note-editing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private router:Router, 
    private notesService: NotesService,
    private noteEditingService: NoteEditingService
    ) {}

  notes: Inote[] = [];

  ngOnInit() {
    this.notesService.getNotes().subscribe((notes: Inote[]) => {
      this.notes = notes;
    });
  } 

  deleteNote(index: number) {
    this.notesService.deleteNote(index);
    this.ngOnInit();
  }

  editingNote(note: Inote) {
    this.noteEditingService.setEditingNote(note);
    this.router.navigate(['editing-note']);
  }

  addNote() {
    this.router.navigate(['add-note']);
  }
}
