var board;
var score=0;
var col=4;
var row=4;
window.onload=function(){
    setgame();
}
function setgame(){
     board=[
         [0,0,0,0],
         [0,0,0,0],
         [0,0,0,0],
         [0,0,0,0]
     ]
    
    for(let r=0;r<row;r++){
        for(let c=0;c<col;c++){
            let tile=document.createElement("div");
            tile.id=r.toString()+"-"+c.toString();
            
            let num=board[r][c];
            updatetile(tile,num);
            document.getElementById("board").append(tile);
        }
    }
    settwo();
    settwo();
}
function updatetile(tile, num){
        tile.innerText = "";
        tile.classList.value="";
        tile.classList.add("tile");
        if(num>0){
            tile.innerText=num;
            if(num<=4096){
                
                tile.classList.add("x"+num.toString());
            }
            else{
                tile.classList.add("x8912");
            }
        }
    }
document.addEventListener('keyup',(e)=>{
    if(e.code == "ArrowLeft"){
        console.log("left");
        slideleft();
    }
    else if(e.code == "ArrowRight"){
        console.log("right");
        slideright();
    }
    else if(e.code == "ArrowUp"){
        console.log("Up");
        slideup();
    }
    else if(e.code == "ArrowDown"){
        console.log("Down");
        slidedown();
    }
    settwo();
    console.log(score);
    document.getElementById("score").innerHTML=score;
});
function filterzero(ro){
    return ro.filter(num => num != 0); //create new array of all nums != 0
}
function slide(ro){
    
    ro=filterzero(ro);  
    for(let i=0;i<ro.length-1;i++){
        
        if(ro[i] == ro[i+1]){
           
            ro[i]*=2;
            
            ro[i+1]=0;
            score+=ro[i];
        }
    }
    
    ro=filterzero(ro);
    while(ro.length<col){
        ro.push(0);
    }
    return ro;
}
function slideleft(){
    
    for(let r=0;r<row;r++){
        let ro=board[r];
        
        ro=slide(ro);
        board[r]=ro;   

        
        for(let c=0;c<col;c++){
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c]
            
            updatetile(tile,num);
        }
    }
    
}
function slideright(){
    for(let r=0;r<row;r++){
        let ro=board[r];
        ro.reverse();
        ro=slide(ro);
        board[r]=ro.reverse();   

        for(let c=0;c<col;c++){
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c]
            
            updatetile(tile,num);
        }
    }
}
function settwo(){
    if (!hasEmptyTile(board)){
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * row);
        let c = Math.floor(Math.random() * col);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}
function hasEmptyTile(){
    let count = 0;
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}
function slideup(){
    for(let c=0;c<col;c++){
        let co=[board[0][c],board[1][c],board[2][c],board[3][c]];
        //console.log(co);
        co=slide(co);
        //console.log(co);
        for(let r=0;r<row;r++){
            board[r][c]=co[r];
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c]
            
            updatetile(tile,num);
        }
    }
}
function slidedown(){
    for(let c=0;c<col;c++){
        let co=[board[3][c],board[2][c],board[1][c],board[0][c]];
        
        co=slide(co);
        co.reverse();
        
        for(let r=0;r<row;r++){
            board[r][c]=co[r];
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c]
            
            updatetile(tile,num);
        }
    }
}