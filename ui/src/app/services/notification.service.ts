import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

    constructor(public snackBar: MatSnackBar) { }
    long = 7500;
    short = 2500;

    show(message: string, time: number = this.short) {
        this.snackBar.open(message, '', {
            duration: time,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
        });
    }

    showTop(message: string, time: number = this.short) {
        this.snackBar.open(message, '', {
            duration: time,
            verticalPosition: 'top',
            horizontalPosition: 'center',
        });
    }

}
