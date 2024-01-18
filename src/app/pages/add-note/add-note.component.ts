import { Component } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})
export class AddNoteComponent {

  description: string = ''; // изначально пустое поле для записи данных в записку
   
  /**
   * Конструктор компонента add-note
   * @param router - объект роутера
   * @param notesService - объект бизнес-логики записки
   */
  constructor(private router:Router ,private notesService: NotesService) {}

  /**
   * Функция вызывающая добавление записки и возвращение на главную страницу
   */
  addNote() {
    this.notesService.addNote(this.description);
    this.description = ''; // Очищаем поле ввода после добавления заметки
    this.router.navigate(['']);
  }

  /**
   * Вернуться на предыдущую страницу
   */
  backToPage() {
    this.router.navigate(['']);
  }
}
