import { NextResponse } from 'next/server'
const Sellsy = require("node-sellsy").default
 
export async function POST() {
  try {
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
      
    }

    const data = await sellsy.api({
      method: "Catalogue.getCategories",
      params: params,
    });

    const {response} = data
    
    return NextResponse.json({ response })
  
  } catch (error) {
    console.log("error:", error);
  }
}