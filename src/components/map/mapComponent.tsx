import React, { useEffect, useState, FC } from "react";
import { IGridInterfaceProps } from "../../interfaces/mapInterface";
import GridCell from '../map/gridCell'
import path from "path";


const gridSize : number = 5000;
const squareSize : number = 5;
const gridCount : number = gridSize / squareSize;

const MapComponent = ()=>{

    const [path, setPath] = useState({});

    useEffect(()=>{
        const pathData : object = require("../../utils/path.json");
        console.log(pathData);
        setPath(pathData);
    },[path])
    if(path){
        return (
            <svg width={gridSize} height={gridSize}>{constructPathOptimized(gridCount, gridCount, path)}</svg>
        )
    }
    return <div>`Path load failed`</div>
    
}

const constructPath = (rowCount : number, colCount : number, path : any) : JSX.Element[] => {
    const mapObj : JSX.Element[] = [];
    for(let x = 0; x < rowCount; x += 1){
        for(let y = 0; y < colCount; y +=1){
            let _x:number =  x * squareSize;
            let _y :number =  y * squareSize;
            let _fill : string = path[`${_x}:${_y}`] ? "white" : "#adb5bd";
            const prop : IGridInterfaceProps = {
                x : _x,
                y : _y,
                height : squareSize,
                width : squareSize,
                fill : _fill
            };
            mapObj.push(
                <rect {...prop} key={`${prop.x}:${prop.y}`}></rect>
            )
        }
    }
    return mapObj;
}

const constructPathOptimized = (rowCount : number, colCount : number, path : any) : JSX.Element[] =>{
    const pathObj : JSX.Element[] = [];
    const latLong : string[] = Object.keys(path);
    for(let i = 0; i < latLong.length; i++){
        let lat = latLong[i].split(':')[0];
        let long = latLong[i].split(':')[1];
        let _x :number =  parseInt(lat);
        let _y :number =  parseInt(long);
        const prop : IGridInterfaceProps = {
            x : _x,
            y : _y,
            height : squareSize,
            width : squareSize,
            fill : "#adb5bd"
        };
        pathObj.push(
            <rect {...prop} key={`${prop.x}:${prop.y}`}></rect>
        )
    }

    return pathObj;
}

export default MapComponent;