class taskQueue {
    constructor(concurency) {
        this.concurency = concurency;
        this.running = 0;
        this.queue = [];
    }
    pushTask(task) {
        this.queue.push(task);
        this.next();
    }
    next() {
        while (this.concurency > this.running && this.queue.length) {
            const task = this.queue.shift();
            task(() => {
                this.running--;
                console.log(this.running);
                this.next();

            });
            this.running++;
        }

    }
}

let t = new taskQueue(3);
function speed(callback) {
    setTimeout(() => {
        callback();
    }, 10000);
}
t.pushTask(done=>{
    speed(()=>{
        console.log('Task finish');
        done();
    });
});
t.pushTask(done=>{
    speed(()=>{
        console.log('Task finish');
        done();
    });
});
t.pushTask(done=>{
    speed(()=>{
        console.log('Task finish');
        done();
    });
});
t.pushTask(done=>{
    speed(()=>{
        console.log('Task finish');
        done();
    });
});

