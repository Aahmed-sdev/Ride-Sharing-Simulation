const body = document.getElementById('main')
const gridSize = 500;
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', gridSize);
svg.setAttribute('height', gridSize);
svg.setAttribute('style', 'border:solid 0.5px lightgray;');

const squareSize = 5;
const gridCount = gridSize / squareSize ; // No of squares in each direction

const points = {}
const currentPos = {"x":-1, "y":-1}
const gridCollection = {}
var paths = {}
var trackFill = [] // stack to keep activity track

var streetData = {'type':'Street', 'obstruction':false, 'color':'white'}

if(localStorage.getItem("path")){
   paths = JSON.parse(localStorage.getItem("path"));
}

for( let x = 0; x < gridCount; x += 1){
    for(let y = 0; y < gridCount; y +=1){
        const rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        points[`${x}:${y}`] = rect
        rect.setAttribute('width', squareSize);
        rect.setAttribute('height', squareSize);
        rect.setAttribute('x', x * squareSize);
        rect.setAttribute('y', y * squareSize);

        if(paths[`${x * squareSize}:${y * squareSize}`]){
            rect.setAttribute('fill','white');
        }else {
            rect.setAttribute('fill','#adb5bd');
        }
        gridCollection[`${x * squareSize}:${y * squareSize}`] = rect;

        // record cordinates
        rect.addEventListener('mousedown', (e)=>{
            console.log(`${x * squareSize}:${y * squareSize}`,e.ctrlKey)
            if(e.ctrlKey){
                currentPos.x = x * squareSize
                currentPos.y = y * squareSize
                rect.setAttribute('fill','white');
                trackFill.push(`${x * squareSize}:${y * squareSize}`)
                paths[`${x * squareSize}:${y * squareSize}`] = JSON.parse(JSON.stringify(streetData));
                localStorage.setItem("path", JSON.stringify(paths))
            }else if(e.altKey){
                // stop the continious fill
                currentPos.x =-1
                currentPos.y = -1
            }
        })
        svg.appendChild(rect)
    }
}

body.appendChild(svg)

// Helper event to draw the map using arrow
document.addEventListener('keydown', keydown_ivent);
document.addEventListener('keyup', keyup_ivent);

function keydown_ivent(e){
    //alert()
    console.log(e.code)
    if(currentPos && e.code 
        && ['ArrowDown', 'ArrowRight', 'ArrowLeft', 'ArrowUp'].includes(e.code)  ){
        switch (e.code) {
            case 'ArrowDown':
                fillGrid(0,-1)
                break;
            case 'ArrowUp':
                fillGrid(0,1)
                break;
            case 'ArrowRight':
                fillGrid(1,0)
                break;
            case 'ArrowLeft':
                fillGrid(-1,0)
                break;
        
            default:
                break;
        }
    }else if( e.key == 'z' && e.ctrlKey){
        if(trackFill.length <= 0){
            return;
        }
        let lastGrid = trackFill.pop();
        gridCollection[lastGrid].setAttribute("fill", "#adb5bd");
        gridCollection[lastGrid].removeAttribute("stroke");
        delete paths[lastGrid]
        localStorage.setItem("path", JSON.stringify(paths))

        if(trackFill.length > 0){
            currentPos.x = trackFill[trackFill.length - 1].split(":")[0]
            currentPos.y = trackFill[trackFill.length - 1].split(":")[1]
        }else{
            currentPos.x = -1
            currentPos.y = -1
        }
        
    }
}

var keyup_ivent = (e)=>{

}

var fillGrid = (_x, _y)=>{
    let limitX = [0, gridSize - squareSize];
    let limitY = [0, gridSize - squareSize];

    let newPosX = parseInt(currentPos.x) + parseInt(_x) * squareSize;
    let newPosY = parseInt(currentPos.y) - parseInt(_y) * squareSize;
    if( newPosX >= limitX[0] && newPosX <= limitX[1]
        && newPosY >= limitY[0] && newPosY <= limitY[1] ){

            gridCollection[`${currentPos.x}:${currentPos.y}`].removeAttribute("stroke");
            currentPos.x = newPosX;
            currentPos.y = newPosY;

            //console.log(currentPos)
            let gridEle =gridCollection[`${currentPos.x}:${currentPos.y}`]
            if(!(paths[`${newPosX}:${newPosY}`] == 'path') && gridEle.getAttribute('fill') != "white"){
                gridEle.setAttribute('fill','white');
                paths[`${newPosX}:${newPosY}`] = JSON.parse(JSON.stringify(streetData));
                trackFill.push(`${newPosX}:${newPosY}`);
                console.log(JSON.stringify(Object.keys(paths)))
                localStorage.setItem("path", JSON.stringify(paths))
            }
            
            gridEle.setAttribute("stroke", "#b3e9c7");
            
        }
    
}




