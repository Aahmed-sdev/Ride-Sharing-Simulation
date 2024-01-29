import { IGridInterfaceProps } from "../../interfaces/mapInterface";

const GridCell : React.FC<IGridInterfaceProps> = (prop: IGridInterfaceProps) : JSX.Element =>{
    return (
        <rect x={prop.x} y={prop.y} width={prop.width} height={prop.height} fill={prop.fill}></rect>
    )
}

export default GridCell;