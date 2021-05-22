import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private readonly progressStorage: string = 'SnakeProgress'
  public progress: number

  constructor() {
    const progressString = localStorage.getItem(this.progressStorage)

    if(progressString) {
      this.progress = +progressString
    } else {
      this.progress = 0
      localStorage.setItem(this.progressStorage, this.progress + "")
    }
  }

  increaseProgress() {
    this.progress += 1
    localStorage.setItem(this.progressStorage, this.progress + "")
  }

}
