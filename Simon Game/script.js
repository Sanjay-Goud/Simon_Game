let gameSeq=[];
let userSeq=[];
let gameStarted=false;
let level=0;
let btns=["purple","blue","orange","green"];
let h2=document.querySelector("h2");

let highScore=0;


document.addEventListener("keypress",()=>{
    if(gameStarted==false){
        gameStarted=true;
        levelUp();
    }
});
function blink(btn){
    btn.classList.add("white");
    setTimeout(()=>{
        btn.classList.remove("white");
    },250);
}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randomIdx=Math.floor(Math.random()*4);
    let randomColor=btns[randomIdx];
    let randomBtn=document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    blink(randomBtn);
}

function btnPress(){
    blink(this);
    userColor=this.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);

}

function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            highScore=Math.max(highScore,level);
            setTimeout(levelUp,1000);
        }
    }
    else{
        highScore=Math.max(highScore,level);
        let body=document.querySelector("body");
        body.classList.add("red");
        setTimeout(()=>{
            body.classList.remove("red")
        },300);
        h2.innerHTML=`Game Over! Your score was ${level}.<br> Press any key to restart the game.<br>High Score is ${highScore}`;
        reset();
    }
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    gameStarted=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
