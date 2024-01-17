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

  constructor() {
    this.loadNotes();
   }

   getNotes() {
    return this.notesSubject.asObservable();
   }

   getNoteById(id: number) {
    return this.notes[id]
   }

   addNote(description: string) {
    if (this.notes.length === 0) {
      this.currentId = 1;
    } else {
      this.currentId += 1;
    }
    this.setDate();
    const newNote: Inote = {
      id: this.currentId,
      description,
      day: this.day,
      month: this.month,
      year: this.year,
      hour: this.hour,
      minutes: this.minutes,
      second: this.second,
      date: new Date()
    }

    this.notes.unshift(newNote);
    this.saveNotes();
    this.notesSubject.next(this.notes);
   }

   editNote(id: number,description: string) {
    this.setDate();
    const newNote: Inote = {
      id: id,
      description: description,
      day: this.day,
      month: this.month,
      year: this.year,
      hour: this.hour,
      minutes: this.minutes,
      second: this.second,
      date: new Date()
    }

    this.notes.unshift(newNote);
    this.saveNotes();
    this.notesSubject.next(this.notes);
   }

   deleteNote(id: number) {
    this.notes = this.notes.filter(note => note.id !== id);
    this.saveNotes();
    this.notesSubject.next(this.notes);
  }

   private loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
      this.notesSubject.next(this.notes);
    }
   }

   private saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes))
   }

   private setDate() {
    const date = new Date()

    this.day = date.toLocaleString("ru-RU", { day: "2-digit" });
    this.month = date.toLocaleString("ru-RU", { month: "long" });
    this.year = date.getFullYear().toString();
    this.hour = (date.getHours() + 4).toString().padStart(2, '0');
    this.minutes = date.getMinutes().toString().padStart(2, '0');
    this.second = date.getSeconds().toString().padStart(2, '0');
   }
}
