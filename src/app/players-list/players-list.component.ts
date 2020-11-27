import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {

    players : Array<Object> = [
        {
            name: '',
            initiative: null,
        },
    ];

    addPlayer() {
        this.players.push(
            {
                name: '',
                initiative: null,
            } 
        )
    };

    @Output() rollInit = new EventEmitter();

    next() {

        for (let element of this.players) {
            if ((element["name"] == "" || typeof element["name"] !== "string") || (element["initiative"] == null || typeof element["initiative"] !== "number")) {
                alert("Пожалуйста, заполните все поля формы корректными значениями");
                return false;
            }
        }

        this.rollInit.emit(this.players);
    }

    @Output() cancelInit = new EventEmitter();

    cancel() {
        this.cancelInit.emit();
    }

    constructor() { }

    ngOnInit(): void {
    }

}
