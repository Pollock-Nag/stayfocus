let time = setInterval(() => {
    postMessage('tick');
    console.log(time);
}, 10);