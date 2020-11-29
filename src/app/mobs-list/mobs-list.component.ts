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


    // Checks for wrong/blank form values and emits event for app-component
    // Проверяет корректность вводимых в форму данных и передаёт событие в app-component
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

    // Throws initiative for each character in charArr and fills charsFilled with new
    // Бросает инициативу для каждого элемента charArr и записывает данные элемента + инициативу в charsFilled
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

    // Prevents "amount" input from going below positive values
    // Не позволяет вводить в поле "Количество" значения ниже 1
    checkPositive($event) {
        if ($event.target.value < 1) {
            $event.target.value = null;
        }
    }

    constructor() { }

    ngOnInit(): void {
    }

}
