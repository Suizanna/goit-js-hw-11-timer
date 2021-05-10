const refs = {
    daysRef: document.querySelector('[data-value="days"]'),
    hoursRef: document.querySelector('[data-value="hours"]'),
    minsRef: document.querySelector('[data-value="mins"]'),
    secsRef: document.querySelector('[data-value="secs"]'),
  };
  
  class CountdownTimer  {         //занимается только подчетом. не обновляет интерфес!
    constructor({ selector, targetDate, onTimer } = {}) {
      this.intervalId = null;
      this.selector = selector;
      this.targetDate = targetDate;
      this.onTimer = onTimer;
      this.init();
    };
    
    init() {    
      const timeComponents =  this.getTimeComponents(0);
      this.onTimer(timeComponents);
    }
    start() {                      
      this.intervalId = setInterval(() => {           //this. потому-что это уже свойство объекта
      // console.log('Каждую секунду вызываем функцию');
    
      const currentTime = Date.now();              //это время каждый раз новое.
     
      const differenceTime = this.targetDate - currentTime;
      const time =  this.getTimeComponents(differenceTime);
      console.log(time);

      this.onTimer(time);      //интерфейс отсчет
      }, 1000);
        }

  //  // 2 вар просто счетчик 
  //       start() {                      
  //         const startTime = Date.now();  // это стартующее,текущее время. Оно всегда одинаковое. момент создания.
          
  //         this.intervalId = setInterval(() => {           
    
  //         const currentTime = Date.now();          
  //         // console.log('startTime', startTime);
  //         //  console.log('currentTime', currentTime);
  //         const differenceTime = currentTime - startTime; 
  //         const time =  this.getTimeComponents(differenceTime);
  //         console.log(time);
    
  //         this.onTimer(time);     
  //         }, 1000);
  //           }

      getTimeComponents(time) {
      /*
     * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
     * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
     */
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

    /*
     * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
     * остатка % и делим его на количество миллисекунд в одном часе
     * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
     */
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );

    /*
     * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
     * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
     */
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

    /*
     * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
     * миллисекунд в одной секунде (1000)
     */
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  // eslint-disable-next-line class-methods-use-this
  pad(value) {
    return String(value).padStart(2, '0');
  }
}
/*
 * - Принимает время в миллисекундах
 * - Высчитывает сколько в них вмещается часов/минут/секунд
 * - Рисует интерфейс
 */
function updateClockface({days, hours, mins, secs }) {  //метод добав. интерфейса
  refs.daysRef.textContent = `${days}`;
  refs.hoursRef.textContent = `${hours}`;
  refs.minsRef.textContent = `${mins}`;
  refs.secsRef.textContent = `${secs}`;
}
  
 const timer = new CountdownTimer({    //это объект настроек
    selector: '#timer-1',
    targetDate: new Date('May 12, 2021 23:59:00'),
    onTimer: updateClockface,         //метод добав. интерфейса перед. как свойство таймера, class CountdownTimer.
  });

timer.start(); //вызываем, что-бы начал считать. Когда я вызываю метод start, я хочу сохраниить текущее время.
  