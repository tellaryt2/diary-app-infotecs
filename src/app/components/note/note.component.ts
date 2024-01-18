import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inote } from '../../modeles/note';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {

  @Input() note: Inote; // получение данных о записке из другого компонента

  @Output() editing = new EventEmitter<number>(); // передача обработчика в другой компонента

  @Output() deletePicture = new EventEmitter<number>(); // передача обработчика в другой компонента

  @Output() imageUpload = new EventEmitter<{ id: number, picture: string }>(); // передача обработчика в другой компонента

  isItalic = false;
  isBold = false;
  isUnderline = false;

  /**
   * Конструктор компонента note
   * @param notesService - объект бизнес-логики редактирования записки
   */
  constructor(private notesService: NotesService) {}

  /**
   * Обработчик для передачи кнопки на другой компонент
   */
  onEditing() {
    this.editing.emit(this.note.id)
  }

  /**
   * Удаление записки
   */
  deleteNote() {
    this.notesService.deleteNote(this.note.id);
  }

  /**
   * Функция для выбора изображения
   * @param event - указатель на обратчик события (выбор файла в проводнике ОС)
   */
  onFileChange(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.note.picture = reader.result as string;
      this.imageUpload.emit({ id: this.note.id, picture: this.note.picture });
    };
    reader.readAsDataURL(file);
  }

  /**
   * Обработчик для передачи кнопки на другой компонент
   */
  onDeletePicture() {
    this.deletePicture.emit(this.note.id)
  }

  /**
   * Изменение стиля текста italic
   */
  changeStyleItalic() {
    this.isItalic = !this.isItalic
  }

  /**
   * Изменение стиля текста bold
   */
  changeStyleBold() {
    this.isBold = !this.isBold
  }

  /**
   * Изменение стиля текста underline
   */
  changeStyleUnderline() {
    this.isUnderline = !this.isUnderline
  }
}
