/**
    Transform to matrix here
    you have states and transitions variables
    ========================
**/
var matrix = []

// var start = false

class Input {
    constructor(value) {
        this.value_ = value
        this.value = this.value.bind(this)
    }
    *value() {
        yield ''
        for (let char of this.value_) {
            yield char
        }
    }
}


function start(states, transitions, stackValues, g) {
    var actionTable = {}
    var activeStates = [{
        stateId: states[0].id,
        stack: []
    }]
    console.log(states, transitions, stackValues)

    for (var transition of transitions) {
        actionTable[transition.from] = actionTable[transition.from] || {}
        actionTable[transition.from][transition.read] = actionTable[transition.from][transition.read] || {}
        actionTable[transition.from][transition.read][transition.pop] = actionTable[transition.from][transition.read][transition.pop] || []
        actionTable[transition.from][transition.read][transition.pop].push({
            nextState: transition.to,
            push: transition.push
        })
    }
    for (var action in actionTable) {
        console.log(states.find(state => state.id === action).label, actionTable[action])
    }

    let stateTransitions = {}
    for (var transition of transitions) {
        stateTransitions[transition.from] = stateTransitions[transition.from] || []
        stateTransitions[transition.from].push(transition)
    }

    function stateLabel(id) {
        if (!id || id === undefined) return null
        return states.find(state => state.id === id).label
    }

    var newStates = {}

    function stateTransition(i) {
        return new Promise((resolve, reject) => {

        });
    }

    for (var i = 0; i < 10; i++) {
        stateTransition(i)
    }

    var input = new Input("0011")
    var stream = input.value()
    let char = stream.next()

    function doTransition(activeState, read) {
        var pop = activeState.stack[activeState.stack.length - 1] || ''
        var nextStates = []
        if (!stateTransitions[activeState.stateId]) {
            return
        }
        for (transition of stateTransitions[activeState.stateId]) {
            if ((transition.read == '' || transition.read === read) && (transition.pop === '' || transition.pop === pop)) {
                let tmp = {
                    stateId: transition.to,
                    stateName: stateLabel(transition.to),
                    stack: activeState.stack.slice()
                }
                if (transition.pop != '') {
                    tmp.stack.pop()
                }
                if (transition.push != '') {
                    tmp.stack.push(transition.push)
                }
                nextStates.push(tmp)
            }
        }
        let next = nextStates.shift()
        while (next) {
            console.log('start', nextStates)
            var pop = next.stack[next.stack.length - 1] || ''
            if (!stateTransitions[next.stateId]) {
                newActiveStates.push(next)
                next = nextStates.shift()
                continue
            }
            for (transition of stateTransitions[next.stateId]) {
                if ((transition.read == '') && (transition.pop === '' || transition.pop === pop)) {
                    let tmp = {
                        stateId: transition.to,
                        stateName: stateLabel(transition.to),
                        stack: next.stack.slice()
                    }
                    if (transition.pop != '') {
                        tmp.stack.pop()
                    }
                    if (transition.push != '') {
                        tmp.stack.push(transition.push)
                    }
                    nextStates.push(tmp)
                } else if ((transition.read !== '' && transition.read === next.stack[next.stack.length - 1])) {
                    // if(d) continue
                    let tmp = {
                        stateId: transition.from,
                        stateName: stateLabel(transition.from),
                        stack: next.stack.slice()
                    }
                    newActiveStates.push(next)
                    console.log(`-->`, newActiveStates)
                }
            }
            console.log('end', nextStates)
            // newActiveStates = nextStates
            next = nextStates.shift()
        }
    }
    for (state of states) {
        g.node(state.id).elem.classList.remove("pending")
        g.node(state.id).elem.classList.remove("accept")
        g.node(state.id).elem.classList.remove("normal")
        g.node(state.id).elem.classList.add("normal")
    }
    let newActiveStates
    function streamNext(input) {
        newActiveStates = []
        for (state of states) {
            g.node(state.id).elem.classList.remove("pending")
            g.node(state.id).elem.classList.remove("accept")
            g.node(state.id).elem.classList.remove("normal")
            g.node(state.id).elem.classList.add("normal")
        }
        for (var activeState of activeStates) {
            doTransition(activeState, input)
        }
        console.log('FINAL', newActiveStates)
        for (activeState of newActiveStates) {
            if (activeState.stateName === 'q accept') g.node(activeState.stateId).elem.classList.add("accept")
            else g.node(activeState.stateId).elem.classList.add("pending")
        }
        // console.log(g.node(states[0].id).elem.classList.add("accept"))
        activeStates = newActiveStates
        return newActiveStates
    }

    // var span = document.createElement("SPAN");
    // var txt = document.createTextNode("\u00D7");

    // span.className = "pop stream";
    // span.appendChild(txt);
    // $('#streamDIV')[0].appendChild(span);

    // span.onclick = function () {
    //     // var div = this.parentElement;
    //     // // div.style.display = "none";
    //     // div.remove();
    //     // strs = strs.filter(var_ => var_ !== this.parentElement.getAttribute('value'))
    //     // console.log(strs)
    // }
    var history = []
    console.log('HISTORY START', history)

    function nextChar() {
        var li = document.createElement("li");
        var inputValue = document.getElementById("stramVal").value;
        li.setAttribute('index', history.length)

        var t = document.createTextNode(inputValue);
        li.appendChild(t);
        let ok = true
        if (inputValue === '') {
            alert("Write something😑");
            return
        } else if (inputValue.length > 1) {
            alert("Write only one symbol for variable😑");
            return
        } else {
            if (!strs.find(str => str === inputValue)) {
                alert("No such string😑")
                return
            }
        }
        document.getElementById("streamUL").appendChild(li);
        document.getElementById("stramVal").value = "";

        li.onclick = (e) => {
            for (state of states) {
                g.node(state.id).elem.classList.remove("pending")
                g.node(state.id).elem.classList.remove("accept")
                g.node(state.id).elem.classList.remove("normal")
                g.node(state.id).elem.classList.add("normal")
            }
            for (activeState of history[Number(li.getAttribute('index'))].activeStates) {
                if (activeState.stateName === 'q accept') g.node(activeState.stateId).elem.classList.add("accept")
                else g.node(activeState.stateId).elem.classList.add("pending")
            }
            console.log(history[Number(li.getAttribute('index'))])
        }


        history.push({
            activeStates: streamNext(inputValue),
            input: inputValue
        })

        console.log(history)

    }

    var stramStart = true
    let streamHist = $('#streamUL li')
    if(streamHist.length){
        history = []
        streamHist.remove()
    }
    $('#startStream')[0].onclick = function () {
        if (stramStart) {
            history.push({
                activeStates: streamNext(''),
                input: ''
            })
            stramStart = false
        } else {
            alert('Already start😑')
        }
    }
    $('#stramVal').keyup(function (e) {
        if (e.which == 13) {
            if (this.value.length === 1) {
                nextChar()
            }
        }
    })

    $('#stringInput').keyup(function (e) {
        if (e.which == 13) {
            if (this.value.length === 1) {
                newActiveStates = []
                for (state of states) {
                    g.node(state.id).elem.classList.remove("pending")
                    g.node(state.id).elem.classList.remove("accept")
                    g.node(state.id).elem.classList.remove("normal")
                    g.node(state.id).elem.classList.add("normal")
                }
                for (var activeState of activeStates) {
                    doTransition(activeState, this.value)
                }
                console.log('FINAL', newActiveStates)
                activeStates = newActiveStates
                for (activeState of newActiveStates) {
                    if (activeState.stateName === 'q accept') g.node(activeState.stateId).elem.classList.add("accept")
                    else g.node(activeState.stateId).elem.classList.add("pending")
                }
            }
        }
    });
}
// while (!char.done) {
//     newActiveStates = []

//     console.log(char.value, '============ next char ===========')
//     for (var activeState of activeStates) {
//         doTransition(activeState, char.value)
//     }
//     console.log('FINAL', newActiveStates)

//     activeStates = newActiveStates

//     //     act(activeState, char.value)
//     //     if(actionTable[activeState]['']){
//     //         for(var popVal in actionTable[activeState]['']){
//     //             if(popVal !== '' && activeStates[activeState][activeStates[activeState].length - 1] === popVal){
//     //                 for(transition of actionTable[activeState][''][popVal]){
//     //                     console.log(stateLabel(transition.nextState), transition.push)
//     //                     newStates[transition.nextState] = activeStates[activeState].slice()    
//     //                     newStates[transition.nextState].pop()
//     //                     newStates[transition.nextState].push(transition.push)
//     //                 }
//     //                 // activeStates[activeState]
//     //             } else if (popVal === '') {
//     //                 for(transition of actionTable[activeState][''][popVal]){
//     //                     console.log(`${stateLabel(transition.nextState)} -> ${transition.push}`)
//     //                     newStates[transition.nextState] = activeStates[activeState].slice()
//     //                     newStates[transition.nextState].push(transition.push)
//     //                 }
//     //             }
//     //             emptyToEmpty = []

//     //             console.log(newStates)

//     //             // newStates[action.nextState] = activeStates[activeState].slice()
//     //             // if(actionnewStates[action.nextState][newStates[action.nextState].length - 1] === )
//     //             // console.log(states.find(state => state.id === action.nextState).label, actionTable[action.nextState])
//     //         }    
//     //     }
//     //     // for(var action in actionTable[activeState]){
//     //     //     newStates[action.nextState] = activeStates[activeState]
//     //     //     // console.log(states.find(state => state.id === action.nextState).label, actionTable[action.nextState])
//     //     // }
//     // }

//     char = stream.next()

// }