const btnDecrease = document.getElementById('btnDecrease');
const btnIncrease = document.getElementById('btnIncrease');
const btnReset = document.getElementById('btnReset');
const outputElem = document.getElementById('output');

const counter = new Counter(outputElem);

repeatingClickEvent(btnDecrease, () =>
{
    counter.decrease();
});

repeatingClickEvent(btnIncrease, () =>
{
    counter.increase();
});

btnReset.addEventListener('click', () =>
{
    counter.reset();
    animateOutput(0.25);
});

function repeatingClickEvent(elem, callback, timeInterval = 100)
{
    let interval;
    let timeout;
    elem.addEventListener('mousedown', () =>
    {
        callback();
        if(counter.counter == 0)
        animateOutput(0.25);
    });
    elem.addEventListener('mousedown', () =>
    {
        timeout = setTimeout(() =>
        {
            interval = setInterval(() => {
                callback();
                animateOutput(0.05);
            }, timeInterval);
        },500);
        
    });

    elem.addEventListener('mouseup', () =>
    {
        clearTimeout(timeout);
        clearInterval(interval);
    });
}

function animateOutput(duration)
{
    outputElem.style.animation = 'none';
    outputElem.offsetHeight;
    outputElem.style.animation = null;
    outputElem.style.animationDuration = `${duration}s`;
}