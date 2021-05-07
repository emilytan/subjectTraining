import { Component } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}

// Subject
const mySubject = new Subject();
// RXJS <- v7
mySubject.subscribe(
  (x)=>{}, // next
  error => {}, // error
  () =>{} // complete
  );
// RXJS >= v8
mySubject.subscribe(
  {
    next: (x)=> {},
    error: (error) => {},
    complete: () => {}
  }
);
mySubject.subscribe({  // subscription just listening here
  next: (value) => console.log('First observer:' + value), 
});
mySubject.subscribe({
  next: (value) => console.log('Second observer:' + value),
});
mySubject.next('Hello'); // .next() method fires it
mySubject.next('Bye');

// Result
// First observer: Hello
// Second observer: Hello
// First observer: Bye
// Second observer: Bye
// let queueNum = 10;
// // Behaviour Subject
// const myBehaviourSubject = new BehaviorSubject(queueNum);
// myBehaviourSubject.subscribe({
//   next: (value) => console.log('First observer:' + value),
// });
// ++queueNum;
// myBehaviourSubject.next(queueNum);

// myBehaviourSubject.subscribe({
//   next: (value) => console.log('Second observer:' + value),
// });
// ++queueNum;

// myBehaviourSubject.next(queueNum);

// Result
// First observer: Hi
// First observer: Hello
// Second observer: Hello
// First observer: Bye
// Second observer: Bye

// Replay Subject
// const myReplaySubject = new ReplaySubject(2);

// myReplaySubject.subscribe({
//   next: (value) => console.log('First observer:' + value),
// });

// myReplaySubject.next('Hey');
// myReplaySubject.next('Hi');
// myReplaySubject.next('Hello');

// myReplaySubject.subscribe({
//   next: (value) => console.log('Second observer:' + value),
// });

// myReplaySubject.next('Bye');

// Result
// First observer: Hey
// First observer: Hi
// First observer: Hello
// Second observer: Hi
// Second observer: Hello
// First observer: Bye
// Second observer: Bye

const myAsyncSubject = new AsyncSubject();

myAsyncSubject.subscribe({
  next: (value) => console.log('First observer:' + value)
});

myAsyncSubject.next('Hey');
myAsyncSubject.next('Hi');

myAsyncSubject.subscribe({
  next: (value) => console.log('Second observer:' + value)
});

myAsyncSubject.next('Bye');
myAsyncSubject.complete();

// Result
// First observer: Bye
// Second observer: Bye
