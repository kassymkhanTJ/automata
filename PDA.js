function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

var uuidv1 = generateUUID

var rules = {}
var strs = []
var vars = []

// // Create a "close" button and append it to each list item
// var myNodelist1 = document.querySelector("#rulesUL LI");
// var i;
// for (i = 0; i < myNodelist1.length; i++) {
//     var span = document.createElement("SPAN");
//     var txt = document.createTextNode("\u00D7");
//     span.className = "close rule";
//     span.appendChild(txt);
//     myNodelist1[i].appendChild(span);
// }

// var myNodelist2 = document.querySelector("#varsUL LI");
// var i;
// for (i = 0; i < myNodelist2.length; i++) {
//     var span = document.createElement("SPAN");
//     var txt = document.createTextNode("\u00D7");
//     span.className = "close var";
//     span.appendChild(txt);
//     myNodelist2[i].appendChild(span);
// }

// var myNodelist3 = document.querySelector("#strsUL LI");
// var i;
// for (i = 0; i < myNodelist3.length; i++) {
//     var span = document.createElement("SPAN");
//     var txt = document.createTextNode("\u00D7");
//     span.className = "close str";
//     span.appendChild(txt);
//     myNodelist3[i].appendChild(span);
// }

// Click on a close button to hide the current list item
var ruleClose = document.getElementsByClassName("close rule");
var varClose = document.getElementsByClassName("close var");
var strClose = document.getElementsByClassName("close str");
// var i;
// for (i = 0; i < close.length; i++) {
//     close[i].onclick = function () {
//         var div = this.parentElement;
//         // div.style.display = "none"
//         div.remove()
//         vars = vars.map(var_ => var_ !== inputValue)
//         console.log(vars)
//     }
// }

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('#rulesUL');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        document.getElementById("ruleInput").value = ev.target.getAttribute('value')
        document.getElementById("ruleVarInput").value = ev.target.getAttribute('varValue');
        ev.target.remove()
        // ev.target.classList.toggle('checked');
    }
}, false);


// Create a new list item when clicking on the "Add" button
function newRule() {
    var inputValue = document.getElementById("ruleInput").value;
    var inputVarValue = document.getElementById("ruleVarInput").value;

    let ok = true
    if (inputValue === '' || inputVarValue === '') {
        alert("Write something😑");
        return
    } else if (inputVarValue.length > 1) {
        alert("Write only one symbol for variable😑");
        return
    } else {
        if (!vars.find(var_ => var_ === inputVarValue)) {
            alert("No such variable😑")
            return
        }
        var strings = inputValue.trim().split(' ').filter((str) => {
            if (str !== '') return str
        })
        strings = strings.map((str) => {
            if (str === '.') return 'E'
            for (char of str) {
                if (!strs.find(char_ => char_ === char) && !vars.find(char_ => char_ === char)) {
                    ok = false
                    alert(`Unknow char ${char}`)
                    break
                }
            }
            return str
        })
    }
    if (!ok) return
    rules[inputVarValue] = strings.map((str) => {
        if (str === 'E') return ''
        return str
    })
    var li = document.createElement("li");
    var t = document.createTextNode(`${inputVarValue} → ${strings.join(' | ')}`)
    li.appendChild(t)
    document.getElementById("rulesUL").appendChild(li);
    document.getElementById("ruleInput").value = "";
    document.getElementById("ruleVarInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");

    span.className = "close rule";
    span.appendChild(txt);
    li.appendChild(span);
    li.setAttribute('value', inputValue)
    li.setAttribute('varValue', inputVarValue)

    for (i = 0; i < ruleClose.length; i++) {
        ruleClose[i].onclick = function () {
            var div = this.parentElement;
            // div.style.display = "none";
            div.remove();
            delete rules[this.parentElement.getAttribute('varValue')]
            console.log(rules)
        }
    }
}


function newStr() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("strInput").value;

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
        if (strs.find(str => str === inputValue)) {
            alert("Already there😑")
            return
        }
    }
    strs.push(inputValue)
    document.getElementById("strsUL").appendChild(li);
    document.getElementById("strInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");

    span.className = "close str";
    span.appendChild(txt);
    li.appendChild(span);
    li.setAttribute('value', inputValue)

    for (i = 0; i < strClose.length; i++) {
        strClose[i].onclick = function () {
            var div = this.parentElement;
            // div.style.display = "none";
            div.remove();
            strs = strs.filter(var_ => var_ !== this.parentElement.getAttribute('value'))
            console.log(strs)
        }
    }
}

function newVar() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("varInput").value;

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
        if (vars.find(var_ => var_ === inputValue)) {
            alert("Already there😑")
            return
        }
    }
    vars.push(inputValue)
    document.getElementById("varsUL").appendChild(li);
    document.getElementById("varInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");

    span.className = "close var";
    span.appendChild(txt);
    li.appendChild(span);
    li.setAttribute('value', inputValue)

    for (i = 0; i < varClose.length; i++) {
        varClose[i].onclick = function () {
            var div = this.parentElement;
            // div.style.display = "none";
            div.remove();
            vars = vars.filter(var_ => var_ !== this.parentElement.getAttribute('value'))
            console.log(vars)
        }
    }
}

var currentRule = {}
$('#ruleInput').keyup(function (e) {
    if (e.which == 13) {
        newRule()
    }
});

$('#varInput').keyup(function (e) {
    if (e.which == 13) {
        newVar()
    }
});

$('#strInput').keyup(function (e) {
    if (e.which == 13) {
        newStr()
    }
});

$('#strs').keypress(function (e) {
    if (e.which == 13) {
        if (!(e.target.value && e.target.value != '')) return
        console.log(e.target.value.trim().split(' ').map(el => el.trim()))
    }
});

$('#vars').keypress(function (e) {
    if (e.which == 13) {
        if (!(e.target.value && e.target.value != '')) return
        console.log(e.target.value.trim().split(' ').map(el => el.trim()))
    }
});



function draw() {
    var all = document.querySelectorAll('#ggraph *');
    for (var i = 0, max = all.length; i < max; i++) {
        var old_element = all[i]
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
    }
    // Create a new graph graph
    var g = new dagreD3.graphlib.Graph().setGraph({
        rankdir: '',
        edgesep: 40,
        ranksep: 40,
        nodesep: 100
    });
    var stackValues = ['$', '']
    var transitions = []
    function pushEdge(edge) {
        transitions.push(edge)
        var existingEdge = edges.find(function (edge_) {
            return edge_.from === edge.from && edge_.to === edge.to
        })
        if (existingEdge)
            existingEdge.label = existingEdge.label +
                `\n${edge.read ? edge.read : "E"}, ${edge.pop ? edge.pop : "E"} -> ${edge.push ? edge.push : "E"}`
        else {
            edge.label = `${edge.read ? edge.read : "E"}, ${edge.pop ? edge.pop : "E"} -> ${edge.push ? edge.push : "E"}`
            edges.push(edge)
        }
    }

    stackValues = stackValues.concat(vars, strs)

    var states = [
        { id: uuidv1(), label: 'q start' },
        { id: uuidv1(), label: 'q 0' },
        { id: uuidv1(), label: 'q loop' },
        { id: uuidv1(), label: 'q accept' },
    ]

    var edges = []

    pushEdge({ from: states[2].id, to: states[3].id, read: '', pop: '$', push: '' })
    pushEdge({ from: states[0].id, to: states[1].id, read: '', pop: '', push: '$' })
    pushEdge({ from: states[1].id, to: states[2].id, read: '', pop: '', push: vars[0] })

    var startVar = vars[0]
    var startRules = rules[startVar]
    var source, read, push, pop

    strs.forEach(function (str) {
        pushEdge({ from: states[2].id, to: states[2].id, read: str, pop: str, push: '' })
    })
    var q = 1
    vars.forEach(function (var_) {
        rules[var_].forEach(function (string) {
            source = states[2].id
            var destinatoin
            pop = var_
            push = ''
            for (var i = string.length - 1; i >= 0; i--) {
                if (i === 0) {
                    push = string[i]
                    break
                }
                push = string[i]
                state = { id: uuidv1(), label: `q ${q}` }
                q++
                states.push(state)
                destinatoin = state.id
                pushEdge({ from: source, to: destinatoin, read: '', pop: pop, push: push })
                pop = ''
                source = state.id
            }
            destinatoin = states[2].id
            pushEdge({ from: source, to: destinatoin, read: '', pop: pop, push: push })
        })
    })

    states.forEach(function (state) {
        state.shape = 'circle'
    })

    states.forEach(function (state) {
        g.setNode(state.id, {
            label: state.label
        });
    });

    edges.forEach(function (edge) {
        g.setEdge(edge.from, edge.to, {
            label: edge.label,
            curve: d3.curveBasis,
            padding: 0
        });
    });
    // g.edges().forEach(function(e) {
    //     var edge = g.edge(e.v, e.w);
    //     edge.lineInterpolate = 'basis';
    // });
    // g.nodes().forEach(function(v) {
    //     var node = g.node(v);
    //     node.rx = node.ry = 5;
    // });

    var svg = d3.select("svg"),
        inner = svg.select("g");
    // Set up zoom support
    var zoom = d3.zoom().on("zoom", function () {
        inner.attr("transform", d3.event.transform);
    });
    svg.call(zoom);
    // Create the renderer
    var render = new dagreD3.render();
    // Run the renderer. This is what draws the final graph.
    render(inner, g);
    // Center the graph
    var initialScale = 1.3;
    svg.call(zoom.transform, d3.zoomIdentity.translate((svg.attr("width") - g.graph().width * initialScale) / 2, 20).scale(
        initialScale));
    svg.attr('height', g.graph().height * initialScale + 40);



    start(states, transitions, stackValues, g)
}




// var visualize = require('javascript-state-machine/lib/visualize');

// var fsm = new StateMachine({
//     init: 'open',
//     transitions: [
//         { name: 'close', from: 'open', to: 'closed' },
//         { name: 'open', from: 'closed', to: 'open' }
//     ]
// });

// visualize(fsm)