class Counter
{
    constructor(outputElem)
    {
        this.outputElem = outputElem;
        
        this.reset();
    }

    get counter()
    {
        return this._counter;
    }

    reset()
    {
        this._counter = 0;
        this.update();
    }

    increase()
    {
        this._counter++;
        this.update();
    }
    
    decrease()
    {
        if(this.counter == 0) return;
        this._counter--;
        this.update();
    }

    update()
    {
        this.outputElem.textContent = this._counter;
    }
}