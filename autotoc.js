let htags = document.querySelectorAll('h1, h2');

let n = function (node) {
    if (!node) {
        return false
    } else {
        return Number(node.tagName.substr(node.tagName.length - 1));
    }
}

let tocString = "<strong>Table of Contents</strong>";
let pn = '';
for (let index = 0; index < htags.length; index++) {

    let current = htags[index];
    let cn = n(current);
    let tagid = "tag-" + index;
    let tocItem = '<a href="#' + tagid + '">' + current.innerText + '</a>';
    current.setAttribute("id", tagid);

    if (!current.innerText.replace(/\s/g, '').length) {
        console.log('You have an empty h tag somewhere... we are not putting it in the table of contents, sorry.');
    } else if (!pn) {
        for (let index = 0; index < cn; index++) {
            tocString += '<ol>'
        }
        tocString += "<li>" + tocItem + "</li>";
        pn = cn;
    } else if (cn === pn) {
        tocString += "<li>" + tocItem + "</li>";
        pn = cn;
    } else if (cn > pn) {
        tocString = tocString.slice(0, -5);
        for (let index = 0; index < (cn - pn); index++) {
            tocString
            tocString += '<ol>'
        }
        tocString += "<li>" + tocItem + "</li>";
        pn = cn;
    } else if (cn < pn) {
        for (let index = 0; index < (pn - cn); index++) {
            tocString += '</ol></li>'
        }
        tocString += "<li>" + tocItem + "</li>";
        pn = cn;
    }

    if ((htags.length - 1) === index) {
        let olCount = (tocString.match(/<ol>/g) || []).length;
        let endolCount = (tocString.match(/<\/ol>/g) || []).length;

        for (let index = 0; index < olCount - endolCount; index++) {
            tocString += "</ol>"
        }
    }

}


//Add in the Table of Contents and styling
let tocDiv = document.createElement('div');
tocDiv.classList.add('aqtoc');
tocDiv.innerHTML = tocString;

let styleInsert = '.aqtoc ol{list-style:none;counter-reset:item;text-align:left}.aqtoc ol li{counter-increment:item}.aqtoc ol li:before{margin-right:10px;content:counters(item,".") " ";display:inline-block}.aqtoc{max-width:85%;margin:35px auto;padding:20px;border:1px solid black;text-align:center}.aqtoc strong{font-size:25px}';
let styleEl = document.createElement('style');
styleEl.innerHTML = styleInsert;


document.body.insertBefore(tocDiv, document.body.firstChild);
document.body.insertBefore(styleEl, document.body.firstChild);