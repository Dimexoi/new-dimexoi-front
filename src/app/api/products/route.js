import { NextResponse } from 'next/server'
const Sellsy = require("node-sellsy").default
 
export async function POST(req) {
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
      search: {
        tags: "website",
        categoryid: req.body? body.categoryId : ''
      },
      pagination: {
        nbperpage: "20"
      }
    };

    const data = await sellsy.api({
      method: "Catalogue.getList",
      params: params,
    });

    const {result} = data.response
    const products = []

    for (const product in result) {
      products.push({
        id:  result[product].id,
        name: result[product].tradename,
        category:  result[product].categoryName,
        slug:  result[product].slug,
        images: result[product].customfields[2].textval.split(',')
      })
    }
   
    return NextResponse.json({ products })
  
  } catch (error) {
    console.log("error:", error);
  }
}