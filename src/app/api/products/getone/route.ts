import { NextResponse } from 'next/server'
const Sellsy = require("node-sellsy").default

type CatObj = {
  id: string,
  name: string,
  description: string,
  parentid: string,
  logo: string,
  corpid: string,
  rank: string,
  slug: string
}

export async function POST(req: Request) {
  try {
    const body = await req.json() // res now contains body
    const sellsy = new Sellsy({
      creds: {
      consumerKey: process.env.NEXT_PUBLIC_CONSUMER_KEY,
      consumerSecret: process.env.NEXT_PUBLIC_CONSUMER_SECRET,
      userToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      userSecret: process.env.NEXT_PUBLIC_TOKEN_SECRET,
    },
    endPoint: 'https://apifeed.sellsy.com/0/'
    })

    const params = {
      type: "item",
      id : body
    };

    const data = await sellsy.api({
      method: "Catalogue.getOne",
      params: params,
    });

    const {slug} = Object.values(data.response.categories)[0] as CatObj
    
    const result = data.response

    const product = {
      id:  result.id,
      name: result.tradename,
      categorySlug:  slug,
      slug:  result.slug,
      images: result.customfields[2].formatted_value.split(',')
    } 
    
    return NextResponse.json(product)
  
  } catch (error) {
    console.log("error:", error);
  }
}