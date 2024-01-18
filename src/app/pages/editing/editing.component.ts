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

  /**
   * Конструктор компонента editing
   * @param notesService - объект бизнес-логики записки
   * @param noteEditingService - объект бизнес-логики редактирования записки
   * @param router - объект роутера
   */
  constructor(
    private notesService: NotesService,
    private noteEditingService: NoteEditingService,
    private router: Router
    ) {}

  /**
   * Записывает описание записки в textarea
   */
  ngOnInit():void {
    const editingNote = this.noteEditingService.getEditingNote();
    this.description = editingNote.description;
  }

  /**
   * Функция для редактирования записки
   */
  editNote() {
    const editingNote = this.noteEditingService.getEditingNote();
    this.notesService.deleteNote(editingNote.id);
    this.notesService.editNote(editingNote.id, this.description, editingNote.picture);
    this.router.navigate(['']);
  }

  /**
   * Вернуться на предыдущую страницу
   */
  backToPage() {
    this.router.navigate(['']);
  }
}
