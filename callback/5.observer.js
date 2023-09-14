// 观察者模式 基于发布订阅
// 发布和订阅二者无关
class Subject{ // baby
  constructor() {
    this.state = '不开心';
    this.arr = [];
  }

  attach(observer) { // 装载观察者
    this.arr.push(observer);
  }

  setState(newState) { // 更新自己的状态
    this.state = newState;
    this.arr.forEach(observer => observer.update(newState));
  }
}

class Observer{ // 我
  constructor(who) {
    this.who = who
  }
  update(newState) {
    console.log('触发订阅 :>> ', this.who + "说: 小宝宝" + newState + "了");
  }
}
let subject = new Subject(); // 被观察者
let my1 = new Observer('我'); // 观察者
let my2 = new Observer('我媳妇');
subject.attach(my1);
subject.attach(my2);

subject.setState('大哭')