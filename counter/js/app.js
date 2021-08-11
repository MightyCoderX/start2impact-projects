const btnDecrease = document.getElementById('btnDecrease');
const btnIncrease = document.getElementById('btnIncrease');
const btnReset = document.getElementById('btnReset');
const outputElem = document.getElementById('output');

const counter = new Counter(outputElem);

repeatingClickEvent(btnDecrease, () =>
{
    return counter.decrease();
});

repeatingClickEvent(btnIncrease, () =>
{
    return counter.increase();
});

btnReset.addEventListener('click', () =>
{
    if(counter.counter == 0) return;
    counter.reset();
    animateOutput();
});

function animateOutput(duration)
{
    outputElem.style.animation = 'none';
    outputElem.offsetHeight;
    outputElem.style.animation = null;

    let prevDuration = getComputedStyle(outputElem).animationDuration.slice(0, -1);
    outputElem.style.animationDuration = `${duration ?? prevDuration}s`;
}

function repeatingClickEvent(elem, callback)
{
    let interval;
    let timeout;

    function singleClickListener()
    {
        if(!callback()) return;
        animateOutput();
    }

    elem.addEventListener('click', singleClickListener);

    function continuosClickListener()
    {
        timeout = setTimeout(() =>
        {
            interval = setInterval(() => {
                if(!callback()) return;
                animateOutput(0.05);
            }, 100);

            elem.removeEventListener('click', singleClickListener);
        }, 500);
    }

    elem.addEventListener('mousedown', continuosClickListener);
    elem.addEventListener('touchstart', continuosClickListener);

    function stopClicking()
    {
        clearTimeout(timeout);
        clearInterval(interval);

        setTimeout(() =>
            elem.addEventListener('click', singleClickListener)
        , 100);
    }

    elem.addEventListener('mouseup', stopClicking);
    elem.addEventListener('touchend', stopClicking);
    elem.addEventListener('mouseleave', stopClicking);
}
