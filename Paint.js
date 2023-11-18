let canvas=document.getElementById("canvas")
let ctx=canvas.getContext("2d")
let startdrawing=false;
let range=document.getElementById("range")
let red=document.getElementById("red")
let green=document.getElementById("green")
let black=document.getElementById("black")
let blue=document.getElementById("blue")
let range_width=range.offsetWidth
let brush=document.getElementById("brush")
let eraser=document.getElementById("reaser")
let newtable=document.getElementById("clear")
let prevmouseX
let prevmouseY
let save_image=document.getElementById("save")
let selected="brush"
let rectangel=document.getElementById("rectangle")

let square=document.getElementById("square")
let checkbox=document.getElementById("checkbox")

save_image.addEventListener("click",function(){
    /*let my_image=canvas.toDataURL("image/png")
    let newTab = window.open('about:blank','image from canvas')
    newTab.document.write(`<img src=${my_image} targer= _blank alt=from canvas/>`)
    newTab.alert("right click and save as an image to save your drawing")*/
    let link=document.createElement("a")
    link.download=`${Date.now()}.jpg`
    link.href=canvas.toDataURL()
    link.click()
})
newtable.addEventListener("click",function(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
})

eraser.addEventListener("click",function(){
    ctx.strokeStyle= "white"
})

brush.addEventListener("click",function(){
    selected="brush"
    ctx.strokeStyle="black"
})
green.addEventListener("click",function(){
    ctx.strokeStyle = "green";
})
red.addEventListener("click",function(){
    ctx.strokeStyle="red"
})
black.addEventListener("click",()=>{
    ctx.strokeStyle="black"
})
blue.addEventListener("click",()=>{
    ctx.strokeStyle="blue"
})

function brushing(){
    return (range.value*100)/range_width;
}

window.addEventListener("load",function(){
    canvas.width=canvas.offsetWidth
    canvas.height=canvas.offsetHeight
    range.value=2
})
rectangel.addEventListener("click",function(){
    selected="triangle"
})
square.addEventListener("click",function(){
    selected="square"
})

function draw_triangel(e){
    ctx.beginPath()
    ctx.moveTo(prevmouseX,prevmouseY)
    ctx.lineTo(e.offsetX,e.offsetY)
    ctx.lineTo(prevmouseX*2-e.offsetX,e.offsetY)
    ctx.closePath()
    ctx.stroke()
    if(checkbox.checked==true){
        ctx.fill()
    }else{
        ctx.stroke()
    }
}
function draw_square(e){
    ctx.beginPath()
    ctx.strokeRect(e.offsetX,e.offsetY,prevmouseX-e.offsetX,prevmouseY-e.offsetY)
    if(checkbox.checked==true){
        ctx.fill()
    }else{
        ctx.stroke()
    }
}

const draw=(e)=>{
    if(startdrawing==true){
        if(selected=="brush"){

            ctx.lineTo(e.offsetX,e.offsetY)
            ctx.stroke()
            prevmouseX=e.offsetX
            prevmouseY=e.offsetY
        }
        else if(selected=="triangle"){
            draw_triangel(e)
            
        }else if(selected=="square"){
            draw_square(e)
        }
    }
    
}
canvas.addEventListener("mousedown",function(){
    startdrawing=true;
    ctx.beginPath()
    ctx.lineWidth=brushing()
})
canvas.addEventListener("mousemove",draw)
canvas.addEventListener("mouseup",function(){
    startdrawing=false;
})