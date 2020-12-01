import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'initiative';

    initiativeQueueMobs : Array<Object> = [];
    initiativeQueuePlayers : Array<Object> = [];

    initiativeQueueSort : Array<Object> = [];

    step : number = 0;

    initSelectorList : any; 
    activePlayer : number = 0;
    round : number = 1;

    createInit() {

        this.step = 1;
    }

    // Moves app to Player initiative fill state
    // Переводит приложение к заполнению инициатив игроков
    nextStep(data) {

        this.initiativeQueueMobs = data;

        this.step = 2;
    }

    cancelInit() {
        this.step = 0;
    }

    // Generates initiative queue from Players' and Characters' inititive arrays and sorts it
    // Создаёт очередь инициативы из массивов игроков и НИПов, а после сортирует их
    rollInit(data) {
        this.initiativeQueuePlayers = data;

        this.initiativeQueueSort = [...this.initiativeQueuePlayers, ...this.initiativeQueueMobs].sort( (a, b) => {return b["initiative"] - a["initiative"]});

        this.step = 0;
        
        this.round = 1;
        this.activePlayer = 0;

        // Sets first element in initiative queue as active
        // Делает первый элемент очереди инициативы активным
        setTimeout( () => {
            this.initSelectorList = document.querySelectorAll('.initiativeLine__item');
            this.selectActivePlayer();
        }, 0);
        
    }

    // Moves app to the next active element in initiative queue
    // Делает следующий элемент очереди инициативы активным
    nextTurn() {
        if (this.activePlayer < this.initiativeQueueSort.length - 1) {
            this.activePlayer++;
        } else {
            this.activePlayer = 0;
            this.round++;
        }

        this.selectActivePlayer();
    }

    // Sets active initiative queue element
    // Устанавливает активный элемент очереди инициативы
    selectActivePlayer() {

        this.initSelectorList.forEach(element => {
            element.classList.remove('active');
        });

        this.initSelectorList[this.activePlayer].classList.add('active');
    }
}
