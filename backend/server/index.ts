import express,{Request,Response} from "express"
import axios from "axios"
import cors from "cors"


const app = express()
const port = 4000

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(express.json())

app.listen(port,()=>{
    console.log(`Server running on PORT ${port}`)
})

const getData = async (request:Request,response:Response):Promise<Response<any,Record<string,any>>> =>{
  
    const keyword = request.query.keyword as string
    console.log(keyword)
    const options = {
        method: 'GET',
        url: 'https://amazon23.p.rapidapi.com/product-search',
        params: {
          query: keyword,
          country: 'US'
        },
        headers: {
            'X-RapidAPI-Key': 'fbe4b60daemshac908183db51fb3p165f90jsne55ffa98cd37',
    'X-RapidAPI-Host': 'amazon23.p.rapidapi.com'
        }
      };
      

      try {
          const res = await axios.request(options);
            const data = res.data
         
            if(!data){
               return response.json({message:"error ! there is no data"})
               }
          return response.json(data)
      } catch (error) {
          console.error(error);
          return response.status(500).json({message:"network error"})
      }
}

app.get("/api/getUser",getData)

