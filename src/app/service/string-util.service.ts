import { Injectable } from '@angular/core';

@Injectable()
export class StringUtilService {

  constructor() { }

  //TODO: this should not take a whole article as the argument
  public getStringFromJSDate(date: Date, displayFormat?: boolean): string {
    if(date) {
      let year: number = date.getFullYear();
      let month: number = date.getMonth()+1; //javascript month is 0 indexed (WHY)
      let day: number = date.getDate();

      if(displayFormat) {
        return this.padNumber(month) + "-" + this.padNumber(day) + "-" + year;
      } else {
        return year + "-" + this.padNumber(month) + "-" + this.padNumber(day);
      }
    }
  }

  private padNumber(num: number): string {
    if(num < 10) {
      return ("0" + num);
    }
    return num.toString();
  }

}
