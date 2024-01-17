import { Component } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})
export class AddNoteComponent {

  description: string = '';
   
  constructor(private router:Router ,private notesService: NotesService) {}

  addNote() {
    this.notesService.addNote(this.description);
    this.description = ''; // Очищаем поле ввода после добавления заметки
    this.router.navigate(['']);
  }
}
