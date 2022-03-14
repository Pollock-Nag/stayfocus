
//To Do
const add_task = () => {
    const get_task = document.getElementById("task_input").value;
    var out_area = document.getElementById("output");



    if (get_task == "") {
        window.alert("Please Enter Something");
    }
    else {

        //creating list
        let li = document.createElement('li');
        li.textContent = get_task;
        li.style.cssText = 'padding:15px';

        //getting position for upward insert
        //if null => appendChild(Element) else=>insertBefore(li, position=first_emelemnt)
        first_element = out_area.firstElementChild;

        //creating delete button
        let delete_button = document.createElement('button');
        delete_button.innerHTML = "Done";
        delete_button.style.cssText = 'margin-left:50px;'
        delete_button.className = "btn btn-outline-success btn-sm bg-dark bg-dark opacity-75";

        // add EventListener to delete button
        delete_button.addEventListener("click", function () {
            out_area.removeChild(li);
        })

        li.appendChild(delete_button);
        if (first_element == null) {
            out_area.appendChild(li);

        } else {
            out_area.insertBefore(li, first_element);

        }



    }
    //clearing input field after each insertion
    document.getElementById("task_input").value = "";

}




//POMODORO

//interval worker for working time

//stackoverflow
/*(function () {
    var $momentum;

    function createWorker() {
        var containerFunction = function () {
            var idMap = {};

            self.onmessage = function (e) {
                if (e.data.type === 'setInterval') {
                    idMap[e.data.id] = setInterval(function () {
                        self.postMessage({
                            type: 'fire',
                            id: e.data.id
                        });
                    }, e.data.delay);
                } else if (e.data.type === 'clearInterval') {
                    clearInterval(idMap[e.data.id]);
                    delete idMap[e.data.id];
                } else if (e.data.type === 'setTimeout') {
                    idMap[e.data.id] = setTimeout(function () {
                        self.postMessage({
                            type: 'fire',
                            id: e.data.id
                        });
                        // remove reference to this timeout after is finished
                        delete idMap[e.data.id];
                    }, e.data.delay);
                } else if (e.data.type === 'clearCallback') {
                    clearTimeout(idMap[e.data.id]);
                    delete idMap[e.data.id];
                }
            };
        };

        return new Worker(URL.createObjectURL(new Blob([
            '(',
            containerFunction.toString(),
            ')();'
        ], { type: 'application/javascript' })));
    }

    $momentum = {
        worker: createWorker(),
        idToCallback: {},
        currentId: 0
    };

    function generateId() {
        return $momentum.currentId++;
    }

    function patchedSetInterval(callback, delay) {
        var intervalId = generateId();

        $momentum.idToCallback[intervalId] = callback;
        $momentum.worker.postMessage({
            type: 'setInterval',
            delay: delay,
            id: intervalId
        });
        return intervalId;
    }

    function patchedClearInterval(intervalId) {
        $momentum.worker.postMessage({
            type: 'clearInterval',
            id: intervalId
        });

        delete $momentum.idToCallback[intervalId];
    }

    function patchedSetTimeout(callback, delay) {
        var intervalId = generateId();

        $momentum.idToCallback[intervalId] = function () {
            callback();
            delete $momentum.idToCallback[intervalId];
        };

        $momentum.worker.postMessage({
            type: 'setTimeout',
            delay: delay,
            id: intervalId
        });
        return intervalId;
    }

    function patchedClearTimeout(intervalId) {
        $momentum.worker.postMessage({
            type: 'clearInterval',
            id: intervalId
        });

        delete $momentum.idToCallback[intervalId];
    }

    $momentum.worker.onmessage = function (e) {
        if (e.data.type === 'fire') {
            $momentum.idToCallback[e.data.id]();
        }
    };

    window.$momentum = $momentum;

    window.setInterval = patchedSetInterval;
    window.clearInterval = patchedClearInterval;
    window.setTimeout = patchedSetTimeout;
    window.clearTimeout = patchedClearTimeout;
})();
*/



const start_work_time = () => {
    const work_min_display = document.getElementById("work_mins");
    const work_sec_display = document.getElementById("work_sec");
    const cycle_count_display = document.getElementById("cycleCount");

    let work_min = parseInt(work_min_display.textContent);
    let cycle_count = parseInt(cycle_count_display.textContent);
    let temp = work_min;
    let work_sec = 60;

    work_min = work_min - 1;
    work_min_display.innerHTML = work_min - 1;

    let time = window.setInterval(


        function () {
            Worker.postMessage('tick');
            document.getElementById("start_work_button").disabled = true;
            document.getElementById("start_break_button").disabled = true;
            //console.log(work_sec);
            work_sec--;
            work_sec_display.innerHTML = work_sec;
            if (work_sec == 0) {
                work_sec += 60;
                //console.log("done")
                work_min--;
                work_min_display.innerHTML = work_min;
                if (work_min == 0) {


                    play_alarm();

                    clearInterval(time);
                    cycle_count += 1;
                    //console.log(cycle_count);
                    cycle_count_display.innerHTML = cycle_count;
                    work_min = temp;
                    work_min_display.innerHTML = work_min;
                    document.getElementById("start_work_button").disabled = false;
                    document.getElementById("start_break_button").disabled = false;
                }

            }

        }, 1000);
    document.getElementById("start_work_button").disabled = false;


}

/*const start_work_time = () => {
    const work_min_display = document.getElementById("work_mins");
    const work_sec_display = document.getElementById("work_sec");
    const cycle_count_display = document.getElementById("cycleCount");

    let work_min = parseInt(work_min_display.textContent);
    let cycle_count = parseInt(cycle_count_display.textContent);
    let temp = work_min;
    let work_sec = 60;

    work_min_display.innerHTML = work_min - 1;

    let intervalWorker = new Worker('worker.js');
    intervalWorker.onmessage = function () {

        document.getElementById("start_work_button").disabled = true;
        document.getElementById("start_break_button").disabled = true;
        //console.log(work_sec);
        work_sec--;
        work_sec_display.innerHTML = work_sec;
        if (work_sec == 0) {
            work_sec += 60;
            //console.log("done")
            work_min--;
            work_min_display.innerHTML = work_min;
            if (work_min == 0) {


                play_alarm();

                clearInterval(intervalWorker);
                cycle_count += 1;
                //console.log(cycle_count);
                cycle_count_display.innerHTML = cycle_count;
                work_min = temp;
                work_min_display.innerHTML = work_min;
                document.getElementById("start_work_button").disabled = false;
                document.getElementById("start_break_button").disabled = false;

            }


        }


    };

    document.getElementById("start_work_button").disabled = false;


}*/


const start_break_time = () => {
    const break_min_display = document.getElementById("break_mins");
    const break_sec_display = document.getElementById("break_sec");
    const cycle_count_display = document.getElementById("break_cycleCount");

    let break_min = parseInt(break_min_display.textContent);
    let cycle_count = parseInt(cycle_count_display.textContent);
    let temp = break_min;
    let break_sec = 60;

    break_min = break_min - 1;
    break_min_display.innerHTML = break_min - 1;

    let time = window.setInterval(
        function () {
            Worker.postMessage('tick');
            document.getElementById("start_break_button").disabled = true;
            document.getElementById("start_work_button").disabled = true;
            //console.log(break_sec);
            break_sec--;
            break_sec_display.innerHTML = break_sec;
            if (break_sec == 0) {
                break_sec += 60;
                //console.log("done")
                break_min--;
                break_min_display.innerHTML = break_min;
                if (break_min == 0) {
                    clearInterval(time);
                    play_alarm();
                    cycle_count += 1;
                    //console.log(cycle_count);
                    cycle_count_display.innerHTML = cycle_count;
                    break_min = temp;
                    break_min_display.innerHTML = break_min;
                    document.getElementById("start_break_button").disabled = false;
                    document.getElementById("start_work_button").disabled = false;
                }

            }

        }, 1000)
    document.getElementById("start_break_button").disabled = false;

}

//playing alarm
function play_alarm() {
    var audio = new Audio('./sounds/a1.mp3');
    audio.play();
}

const pause = () => {

    const work_min = document.getElementById("work_mins").textContent;
    const work_sec = document.getElementById("work_sec").textContent;
    //console.log(work_min);
    const break_min = document.getElementById("break_mins").textContent;
    const break_sec = document.getElementById("break_sec").textContent;

    //console.log(work_min);

    if (work_min == 25 && work_sec == 00 && break_min == 5 && break_sec == 00) {
        //window.alert("Please Start First");
        swal.fire("Please Start First");

    } else {
        window.alert("Resume Now ?");
    }
}

const reset = () => {

    location.reload();

}