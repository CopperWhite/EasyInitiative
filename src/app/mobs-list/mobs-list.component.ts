import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mobs-list',
  templateUrl: './mobs-list.component.html',
  styleUrls: ['./mobs-list.component.scss']
})
export class MobsListComponent implements OnInit {

    chars : Array<Object> = [
        {
            name: '',
            initiative: null,
            initBonus: null,
            amount: 1
        },
    ];

    charsFilled : Array<Object>;

    addChar() {
        this.chars.push(
            {
                name: '',
                initiative: null,
                initBonus: null,
                amount: 1
            } 
        )
    };

    @Output() toPlayers = new EventEmitter();

    next() {
        for (let element of this.chars) {
            if ((element["name"] == "" || typeof element["name"] !== "string") || (element["initBonus"] == null || typeof element["initBonus"] !== "number") || (element["amount"] == null || typeof element["amount"] !== "number")) {
                alert("Пожалуйста, заполните все поля формы корректными значениями");
                return false;
            }

            if (element["amount"] < 1) {
                element["amount"] = 1;
            }
        }

        this.fillCharsArr();
        this.toPlayers.emit(this.charsFilled);
    }

    @Output() cancelInit = new EventEmitter();

    cancel() {
        this.cancelInit.emit();
    }

    fillCharsArr() {

        let charArr = []

        this.chars.forEach( (item) => {

            for (let i = 0; i < item["amount"]; i++) {

                let init = Math.floor(Math.random() * Math.floor(20)) + 1 + item["initBonus"];

                charArr.push({
                    name: item["name"],
                    initiative: init,
                })

            }

        })

        this.charsFilled = charArr;
    }

    checkPositive($event) {
        if ($event.target.value < 1) {
            $event.target.value = null;
        }
    }

    constructor() { }

    ngOnInit(): void {
    }

}
