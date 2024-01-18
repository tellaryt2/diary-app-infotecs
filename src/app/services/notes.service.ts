import { Injectable } from '@angular/core';
import { Inote } from '../modeles/note';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notes: Inote[] = [];
  private notesSubject = new BehaviorSubject<Inote[]>(this.notes);
  private currentId: number = 1;

  private day: string;
  private month: string;
  private year: string;
  private hour: string;
  private minutes: string;
  private second: string;

  /**
   * Конструктор сервиса, вызывает загрузку записок из localstorage
   */
  constructor() {
    this.loadNotes();
   }

   /**
    * геттер записки
    * @returns - возвращает объект записки
    */
   getNotes() {
    return this.notesSubject.asObservable();
   }

   /**
    * геттер записки по id
    * @param id - id записки
    * @returns возвращает записку по id
    */
   getNoteById(id: number) {
    return this.notes[id]
   }

   /**
    * Инициализация полей объекта записки
    * @param id - id записки
    * @param description - текст записки
    * @param picture - ссылка на изображение
    * @param isPicture - наличие изображения
    */
   private initializationNote(id: number, description: string, picture: string, isPicture: boolean) {
    this.setDate();
    const newNote: Inote = {
      id: id,
      description,
      picture: picture,
      isPicture: isPicture,
      day: this.day,
      month: this.month,
      year: this.year,
      hour: this.hour,
      minutes: this.minutes,
      second: this.second,
    }

    this.notes.unshift(newNote); //добавление в начало списка
    this.saveNotes(); 
    this.notesSubject.next(this.notes);
   }

   /**
    * Добавление записки
    * @param description - текст новой записки
    */
   addNote(description: string) {
    //Проверка для задания корректного id
    if (this.notes.length === 0) {
      this.currentId = 1;
    } else {
      this.currentId += 1;
    }

    this.initializationNote(this.currentId, description, '', false);
   }

   /**
    * редактирование записки
    * @param id - id редактируемой записки
    * @param description - описание редактируемой записки
    * @param picture - ссылка на изображение
    */
   editNote(id: number, description: string, picture:string) {    

    //проверка на наличие изображения в редактируемой записке
    if (picture != '') this.initializationNote(id, description, picture, false);
    else this.initializationNote(id, description, picture, true);
   }

   /**
    * Добавить изображение к записке
    * @param id - id записки к которой необходимо добавить изображение
    * @param description - описание записки, к которой необходимо добавить изображение
    * @param picture - ссылка на изобаржение
    */
   addPictureNote(id:number, description:string, picture: string) {
    this.initializationNote(id, description, picture, true);
   }

   /**
    * Удаление записки
    * @param id - id записки для удаления
    */
   deleteNote(id: number) {
    this.notes = this.notes.filter(note => note.id !== id);
    this.saveNotes();
    this.notesSubject.next(this.notes);
  }

  /**
   * Загрузка записок из localstorage
   */
   private loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
      this.notesSubject.next(this.notes);
    }
   }

   /**
    * Сохранение имеющегося массива записок в localstorage
    */
   private saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes))
   }

   /**
    * Обновление текущей даты
    */
   private setDate() {
    const date = new Date()

    //преобразование всех полей даты в string для удобной записи
    this.day = date.toLocaleString("ru-RU", { day: "2-digit" });
    this.month = date.toLocaleString("ru-RU", { month: "long" });
    this.year = date.getFullYear().toString();
    this.hour = (date.getHours() + 4).toString().padStart(2, '0');
    this.minutes = date.getMinutes().toString().padStart(2, '0');
    this.second = date.getSeconds().toString().padStart(2, '0');
   }
}
