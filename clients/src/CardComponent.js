import React, {useEffect, useState} from "react"
import axios from "axios"
import RecipeReviewCard from "./Card";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';



function CardComponent() {
    const [ data, setData ] = useState([])
    const [ search, setSearchData] = useState('')
    async function fetchData(){
        const response = await axios.get(`https://picsum.photos/v2/list?page=2&limit=20`)
        setData(response.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const onHandleChange = ()=>{
        console.log(`Author`, search)
        const findData = data.filter(item => item.author.includes(search))
        setData(findData)
    }
    return (
        <div>
            <input type="text" placeholder="Search" onChange={(e)=> setSearchData(e.target.value)} value={search}/>
            <button onClick={onHandleChange}>Search</button>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {
                        data.map((item, index)=> (
                            <Grid item xs={4} key={index}>
                                <RecipeReviewCard image={item["download_url"]} auther={item["author"]}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>

        </div>
    );
}

export default CardComponent;
