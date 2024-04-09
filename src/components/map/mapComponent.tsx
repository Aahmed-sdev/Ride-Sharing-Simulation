import React, { useEffect, useState, FC } from "react";
import { IGridInterfaceProps } from "../../interfaces/mapInterface";
import GridCell from '../map/gridCell'
import CarComponent from "./CarComponent";

import { createAdjacencyList, shortestPath, IAdjacentList } from "../../utils/generatePath";


const gridSize : number = 5000;
const squareSize : number = 5;
const gridCount : number = gridSize / squareSize;

//Test
var adjacentList = {};
//

interface IPath {
    updatedTime : string,
    path : number[][]
}

const Component = ()=>{

    const [path, setPath] = useState({} as IPath);

    useEffect(()=>{
        const pathData : IPath = require("../../utils/path.json");
        //console.log("Path Data",pathData);
        setPath(pathData);
    },[path])

    if(path){
        return (
        <>
            <svg width={gridSize/squareSize} height={gridSize/squareSize}>
                {path['path'] && constructPath(path['path'])}
                <CarComponent x ={120} y ={90} width ={25} height={25} rotation={90} />
            </svg>
        </>
            
        )
    }
    return <div>`Path load failed`</div>
    
}

const constructPath = (path : number[][] ) : JSX.Element[] =>{
    const pathElements : JSX.Element[] = [];

    for(let i = 0; i < path.length; i++){
        let lat = path[i][0];
        let long = path[i][1];

        const prop : IGridInterfaceProps = {
            x : lat,
            y : long,
            height : squareSize,
            width : squareSize,
            fill : "#adb5bd"
        };
        pathElements.push(
            <GridCell {...prop} key={`${prop.x}:${prop.y}`}></GridCell>
        )
    }
    return pathElements;
}

const MapComponent = React.memo(Component);

export default MapComponent;