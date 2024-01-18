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

  /**
   * Конструктор компонента Home
   * @param router - объект роутера
   * @param notesService - объект бизнес-логики записки
   * @param noteEditingService - объект бизнес-логики редактирования записки
   */
  constructor(
    private router:Router, 
    private notesService: NotesService,
    private noteEditingService: NoteEditingService
    ) {}

  /**
   * список всех записок
   */
  notes: Inote[] = [];

  /**
   * вызывается после конструктора (заполняет массив записок)
   */
  ngOnInit() {
    this.notesService.getNotes().subscribe((notes: Inote[]) => {
      this.notes = notes;
    });
  } 

  /**
   * функция, вызывающая редактирование записки
   * @param note - записка для редактирования
   */
  editingNote(note: Inote) {
    this.noteEditingService.setEditingNote(note); //записываем в редактируемую записку текущую
    this.router.navigate(['editing-note']); //переход на страницу /editing-note
  }

  /**
   * функция, вызывающая удаление картинки в записке
   * @param note - записка для удаления картинки
   */
  deletePicture(note: Inote) {
    this.noteEditingService.setEditingNote(note); //записываем в редактируемую записку текущую
    const editingNote = this.noteEditingService.getEditingNote();
    this.notesService.deleteNote(editingNote.id); //удаляем текущую записку
    this.notesService.editNote(editingNote.id, editingNote.description, ''); //добавляем новую с текущими данными
  }

  /**
   * Функция для перехода на страницу добавления записки
   */
  addNote() {
    this.router.navigate(['add-note']);
  }

  /**
   * Функция добавления картинки к записке
   * @param event - укразатель на вызов события (хранит объект из id записки и ссылки на картинку)
   */
  updateNotePicture(event: { id: number, picture: string }) {
    const noteToUpdate = this.notes.find((note) => note.id === event.id); //получаем по id необходимую записку
    if (noteToUpdate) {
      noteToUpdate.picture = event.picture; //записываем в временную записку путь к картинке
      this.notesService.deleteNote(noteToUpdate.id); //удаляем текущую записку
      this.notesService.addPictureNote(noteToUpdate.id, noteToUpdate.description, noteToUpdate.picture); //добавляем новую с текущими данными
    }
  }
}
