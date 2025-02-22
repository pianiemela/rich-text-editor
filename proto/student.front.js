import $ from 'jquery'
import { makeRichText } from '../src/rich-text-editor'
import { EACCES } from 'constants';


latex = ""

function editsToParent(){
    events.dimension1 = $('[data-js="latexField"]').val()
    // console.log("student.front.js ",events.dimension1)

    var ans = $('[data-js="answer"]').val()
    console.log("student.front.js ", ans)

    var ans_field = document.getElementById("answer1");
    var text = "";
    if (ans_field!==null) text = ans_field.innerText;
    if (latex.length < 1) latex = $('[data-js="latexField"]').val()
    // var text = html.innerText;
    var msg = "text:"+text+" latex:"+latex;
    console.log("student.front.js",msg,parent);
    
    parent.postMessage(msg, "*");
}



/* global ga, makeRichText */
const answer = document.getElementById('answer1')
makeRichText(answer, {
    screenshot: {
        saver: ({ data }) =>
            new Promise(resolve => {
                const reader = new FileReader()
                reader.onload = evt => resolve(evt.target.result.replace(/^(data:image)(\/[^;]+)(;.*)/,'$1$3'))
                reader.readAsDataURL(data)
            }),
        limit: 10
    },
    baseUrl: ''
})
answer.focus()

const trackError = (e = {}) => {
    const category = 'JavaScript error'
    const action = e.message
    const label = e.filename + ':' + e.lineno
    console.log(category, action,label);
    // ga('send', 'event', category, action, label)
}

if (window.addEventListener) {
    window.addEventListener('error', trackError, false)
} else if (window.attachEvent) {
    window.attachEvent('onerror', trackError)
} else {
    window.onerror = trackError
}
const $tools = $('[data-js="tools"]')
const events = {
    metric1: 0, //typeLatex
    metric2: 0, //typeMathquill
    metric3: 0, //clickChar
    metric4: 0 //clickLatex
}
let hasEvents = false
$tools.on('mousedown', '[data-js="expandCollapseCharacters"]', () => {
    // ga(
    //     'send',
    //     'event',
    //     'toolbar',
    //     'toggle',
    //     $tools.hasClass('rich-text-editor-characters-expanded') ? 'expand' : 'collapse'
    // )
})
$('[data-js="mathToolbar"]').on('mousedown', 'button', e => {
    events.metric4++
    hasEvents = true
    const dataset = e.currentTarget.dataset
    // console.log(dataset.latexcommand || dataset.command)
    // ga('send', 'event', 'toolbar', 'latex', dataset.latexcommand || dataset.command)
})
$('[data-js="charactersList"]').on('mousedown', 'button', e => {
    events.metric3++
    hasEvents = true
    // ga('send', 'event', 'toolbar', 'character', e.currentTarget.innerText)
    // console.log( e.currentTarget.innerText)
})
$('[data-js="latexField"]').on('input paste', () => {
    events.metric1++
    hasEvents = true
})
$('[data-js="equationField"]').on('input', '.mq-textarea textarea', () => {
    events.metric2++
    hasEvents = true
    // console.log( "data-js='equationField'")

})
// $('[data-js="newEquation"]').on('mousedown', () => ga('send', 'event', 'mathEditor', 'open', 'button'))
$(answer)
    .on('mathfocus', e => {
        if (!e.hasFocus && hasEvents) {
            latex = $('[data-js="latexField"]').val()
            console.log("mathfocus: student.front.js ",latex)

            var ans_field = document.getElementById("answer1");
            var text = "";
            if (ans_field!==null) text = ans_field.innerText;
            var msg = "text:"+text+"\n"+"latex:"+latex;
        

            parent.postMessage(msg,"*")
            // var equationField = $('[data-js="equationField"]')
            // console.log("student.front.js ", equationField)

            // ga('send', 'event', 'mathEditor', 'close', events)
            // hasEvents = false
            // events.metric1 = 0
            // events.metric2 = 0
            // events.metric3 = 0
            // events.metric4 = 0
        }
    })
    // .blur(function(){
    //     editsToParent()
    // })
    //  .on('keyup', e => {
    //     editsToParent()
    //  })
