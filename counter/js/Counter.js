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
        return true;
    }
    
    decrease()
    {
        if(this._counter == 0) return false;
        this._counter--;
        this.update();
        return true;
    }

    update()
    {
        this.outputElem.textContent = this._counter;
    }
}