export interface IAdjacentList {
    [key : string]: number[][]
}

/*
    In the provided JavaScript code, the threshold represents the maximum distance allowed for two points to be considered connected.
    This threshold value is a parameter you can adjust based on the specific requirements of your application.

    For example, if you set threshold to 2.0, it means that two points will be considered connected
    (an edge will be added in the adjacency list) if the Euclidean distance between them is less than 2.0 units.
    You should adjust this value depending on the scale of your 2D coordinates and how far apart points should be to be considered connected.
*/
const createAdjacencyList = (points : number[][], threshold : number) : IAdjacentList =>{
    
    var adjacencyList : IAdjacentList = {}; // {'longX:latY' : [[x,y],[x,y],....]}
    for(let i = 0; i < points.length; i++){
        for(let j = 0; j < points.length; j++){
            let key : string = `${points[i][0]}:${points[i][1]}`;
            if(!adjacencyList[key]){
                adjacencyList[key] = [];
            }
            if(i != j){
                let distance : number = calculateDistance(points[i], points[j]);
                if(distance > threshold ){
                    adjacencyList[key].push(points[j]);
                }
            }
        }
    }

    return adjacencyList;
    
}

function calculateDistance(point1 : number[], point2 : number[]) : number {
    // Assuming Euclidean distance for simplicity
    return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2));
}



// Find Shortest Path 

  /************************************** */
  function shortestPath(adjacencyList : IAdjacentList , start : string , end : string) {
    // To-Do Function body
    return null;
}

export {createAdjacencyList, shortestPath };