import { NextResponse } from 'next/server'
const Sellsy = require("node-sellsy").default
 
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

    console.log(body);

    const params = {
      type: "item",
      id : body.productId
    };

    const data = await sellsy.api({
      method: "Catalogue.getOne",
      params: params,
    });

    console.log(data.response.categories);
    const result = data.response

    const product = {
      id:  result.id,
      name: result.tradename,
      category:  result.categories.slug,
      slug:  result.slug,
      images: result.customfields[2].formatted_value.split(',')
    } 
    
    return NextResponse.json(product)
  
  } catch (error) {
    console.log("error:", error);
  }
}