import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'initiative';

    initiativeLine : Array<Object> = [];
    initiativeLineMobs : Array<Object> = [];
    initiativeLinePlayers : Array<Object> = [];

    initiativeLineSort : Array<Object> = [];

    step : number = 0;

    initSelectorList; 
    activePlayer : number = 0;
    round : number = 1;

    createInit() {

        this.step = 1;
    }

    // Moves app to Player initiative fill state
    nextStep(data) {

        this.initiativeLineMobs = data;

        console.log(this.initiativeLineMobs)

        this.step = 2;
    }

    cancelInit() {
        this.step = 0;
    }

    // Generates initiative line from Players' and Characters' inititive arrays and sorts it
    rollInit(data) {
        this.initiativeLinePlayers = data;

        this.initiativeLine = [...this.initiativeLinePlayers, ...this.initiativeLineMobs];

        this.initiativeLineSort = this.initiativeLine.sort( (a, b) => {return b["initiative"] - a["initiative"]});

        console.log(this.initiativeLineSort);

        this.step = 0;

        
        this.round = 1;
        this.activePlayer = 0;

        // Sets first element in initiative line as active
        setTimeout( () => {
            this.initSelectorList = document.querySelectorAll('.initiativeLine__item');
            this.selectActivePlayer();
        }, 0);
        
    }

    // Moves app to the next active element in initiative line
    nextTurn() {
        if (this.activePlayer < this.initiativeLineSort.length - 1) {
            this.activePlayer++;
        } else {
            this.activePlayer = 0;
            this.round++;
        }

        this.selectActivePlayer();
    }

    // Sets active initiative line element
    selectActivePlayer() {

        this.initSelectorList.forEach(element => {
            element.classList.remove('active');
        });

        this.initSelectorList[this.activePlayer].classList.add('active');
    }
}
