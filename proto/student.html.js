/* eslint-disable no-undef */
export default function({
    mathEditor,
    locale,
    title,
    description,
    shortcuts,
    answerTitle
}) {
    return `
<html>
<head>
    <meta charset='utf-8'>
    <title>${mathEditor}</title>
    <link rel="stylesheet" type="text/css" href="mathquill/build/mathquill.css">
    <link rel="stylesheet" type="text/css" href="rich-text-editor.css"/>
    <link rel="stylesheet" type="text/css" href="student.css"/>
    <script src="jquery/dist/jquery.js"></script>
    <script src="baconjs/dist/Bacon.js"></script>
    <script src="mathquill/build/mathquill.js"></script>
    <link rel="icon" href="/rich-text-editor-favicon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="/rich-text-editor-favicon.ico" type="image/x-icon"/>
    <script>
        window.locale = '${locale}';
        var ans_field = document.getElementById("answer1");
        var text = ans_field.innerText;
        var latex = $('[data-js="latexField"]').val()J;
        console.log("student.html.js",text,val,parent);
        
        parent.postMessage("text:"+text+" latex:"+latex, "*");

    </script>
</head>
<body>
<article>
    <section>
        <h1>${title}</h1>

        <div class="instructions">
            <div style="width: 55%">
                ${description}
            </div>
            <div style="width:45%">
                ${shortcuts}
            </div>
        </div>

        <h2>${answerTitle} 1</h2>
        <div class="answer" id="answer1"></div>
    </section>
</article>
<script src="rich-text-editor-bundle.js"></script>
<script src="student.js"></script>
</body>
</html>`
}
