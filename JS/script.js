const keyboard = document.querySelector("#keyboard");
const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
let [forEqual, isCompleted] = [false, false];

function counter(){
    switch (line1.textContent.at(-1)) {
        case "+":
            line2.textContent = +line1.textContent.slice(0, -1) + +line2.textContent;
            break;
        case "-":
            line2.textContent = line1.textContent.slice(0, -1) - line2.textContent;
            break;
        case "/":
            line2.textContent = line1.textContent.slice(0, -1) / line2.textContent;
            break;
        case "x":
            line2.textContent = line1.textContent.slice(0, -1) * line2.textContent;
            break;
        default:
            //line1.textContent = `${line2.textContent} ${button}`;
    }
}

function counterForEqual(){
    switch (line1.textContent.match(/[+\-x/]/)[0]) {
        case '+':
            line2.textContent = +line2.textContent + +line1.textContent.match(/([\d\.]){1,}/g)[1];
            break;
        case '-':
            line2.textContent -= line1.textContent.match(/([\d\.]){1,}/g)[1];
            break;
        case 'x':
            line2.textContent *= line1.textContent.match(/([\d\.]){1,}/g)[1];
            break;
        default:
            line2.textContent /= line1.textContent.match(/([\d\.]){1,}/g)[1];
    }
}

            



keyboard.addEventListener('click', e => {
    const button = e.target.textContent;
    
    
        // remove input
    if(button === "C") {
        forEqual = false;
        line1.textContent = "";
        line2.textContent = "0";
        // Number
    } else if(!isNaN(+button)){
        forEqual = false;
        if(isCompleted){
            isCompleted = false;
            line2.textContent = button;
        } else if(line2.textContent === "0"){
            line2.textContent = button;
        }else {
            line2.textContent += button;
        }

        // Symbol
    } else if (button === "⌫"){
        forEqual = false;
        if(line2.textContent !== 0){
            line2.textContent = line2.textContent.slice(0, -1);
        }
    } else if(button === "."){
        forEqual = false;
        if(isCompleted){
            isCompleted = false;
            line2.textContent = `0${button}`;
        } else if(!line2.textContent.includes('.')){
            line2.textContent += button;
        }
    } else if(button === '='){
        if(forEqual){
            line1.textContent = line1.textContent.replace(/([\d\.]){1,}/, line2.textContent); 
            counterForEqual()
        } else if(isCompleted){
            counter();
            line1.textContent += line1.textContent.match(/[\d\.]/)[0] + '=';
            forEqual = true;
        } else if(line1.textContent === ""){
            line1.textContent = `${line2.textContent} ${button}`;
            isCompleted = true;
            forEqual = true;
        } else if(!isCompleted){
            let reverse = line2.textContent;
            counter();
            line1.textContent += ` ${reverse} =`;
            forEqual = true;
        }
    } else {  // +,-,/,*
        forEqual = false;
        if(isNaN(+line1.textContent[line1.textContent.length-1]) && line1.textContent === null){
            line1.textContent = line1.textContent.replace(/[+-x/]/, button); 
         } else if(!isCompleted && line1.textContent !== ""){
            isCompleted = true;
            counter();
            line1.textContent = `${line2.textContent} ${button}`;
        } else {
            if(line2.textContent[line2.textContent.length-1] === "."){   // line1 => !0.+
                line2.textContent = line2.textContent.slice(0,line2.textContent.length-1);
            }
            line1.textContent = `${line2.textContent} ${button}`;
            isCompleted = true;  
        } 
        
    } 
    
});