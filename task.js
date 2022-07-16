class AlarmClock {
    constructor(alarmCollection = [], timerId = null){
        this.alarmCollection = alarmCollection;
        this.timerId = timerId;
    }
    
    addClock(timeHHMM, fun, id){
        if (id === null || id === undefined){
            throw new Error(`id have non valid value ${id}`);
        }
        if (this.alarmCollection.filter(item => item.id == id).length >= 1){
            console.error(`id is aleady exist`);
            return;
        }
        this.alarmCollection.push({id: id, time: timeHHMM, callback: fun});
    }

    removeClock(id){
        for(let item of this.alarmCollection) {
            if (item.id === id) {
                this.alarmCollection.splice(item, 1)[0];
            }
        }  
    }
    
    getCurrentFormattedTime(){
        return new Date().toLocaleTimeString().slice(0,-3);
    }

    start(){
        function checkClock(item) {
            //debugger;
            let currentTime = that.getCurrentFormattedTime();
            if( currentTime == item.time){
                item.callback();
            }
            
        }
        let that = this;

        if (this.timerId === null){
            this.timerId = setInterval((function(){
                that.alarmCollection.forEach(item => { checkClock(item); })
            }), 2000);               
        }

    }

    stop(){
        if (this.timerId){
            let that = this;
            clearInterval(that.timerId);
            this.timerId = null;
        }        
    }

    printAlarms(){
        this.alarmCollection.forEach(item => {
            console.log(`id: ${item.id}, time to up: ${item.time}`);
        })

    }

    clearAlarms(){
        this.stop();
        this.alarmCollection = [];
    }
}

function testCase(){
    let timerTest = new AlarmClock();
    let timeNow = new Date();
    timeNow.setMinutes(timeNow.getMinutes() + 1);
    let plusOneMin = timeNow.toLocaleTimeString().slice(0,-3);
    timeNow.setMinutes(timeNow.getMinutes() + 1);
    let plusTwoMin = timeNow.toLocaleTimeString().slice(0,-3);

    timerTest.addClock(timerTest.getCurrentFormattedTime(), () => {console.log("выводится несклько раз, текущее время")}, 1);
    timerTest.addClock(plusOneMin, () => {console.log("вывдится один раз, +1 минута"); timerTest.removeClock(2);}, 2);
    console.log("добавление таймера с существующим id");
    timerTest.addClock(plusOneMin, () => {console.log("добавление таймера с существующим id"); }, 2);
    timerTest.addClock(plusTwoMin, () => {
        console.log("вывдится один раз, +2 минута, останавливает все"); 
        timerTest.removeClock(3); 
        timerTest.stop(); 
        console.log(`Список запущенных таймеров в очереди`);
        timerTest.printAlarms()}, 3);

    timerTest.printAlarms();

    timerTest.start();
    //function stopFirstconsole() {setTimeout(() => {timerTest.stop(); console.log("таймер оставлен");}, 128000)};
    //stopFirstconsole();  
    
}