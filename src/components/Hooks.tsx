import axios from "axios";
import { useEffect, useState } from "react";

export interface IRes{
    created:string,
    gender:string,
    id:number,
    image:string,
    name:string,
    species:string,
    status:string,
    type:string,
    url:string
}

export interface IInf{
    count:number,
    next:string,
    pages:number,
    prev:null
}


export const useCustomProduct = (loadMore: boolean) =>{
    const [pod,setPod] = useState<IRes[]>([]);
    const [params,setParams] = useState({ count: 0, next: "https://rickandmortyapi.com/api/character", pages: 0, prev: "" })

    useEffect(()=>{
        if(loadMore)
            getData();
    },[loadMore]);

    const getData = () => {
        axios.get(params.next)
        .then( response => {
            setPod([ ...pod, ...response.data.results ]);
            setParams(response.data.info);       
        });
    }

    return pod;

}