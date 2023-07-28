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

    let collectionName = null
    let collectionSlug = null
    for (const tagsid in result.tags) {
      if(result.tags[tagsid].word.includes('collection')) {
        switch (result.tags[tagsid].word) {
          case "collection:cassandre":
            collectionName = "Cassandre"
            collectionSlug = "cassandre"
            break;
          case "collection:evolia":
            collectionName = "Evolia"
            collectionSlug = "evolia"
            break;
          case "collection:hampton":
            collectionName = "Hampton"
            collectionSlug = "hampton"
            break;
          case "collection:jaya":
            collectionName = "Jaya"
            collectionSlug = "jaya"
            break;
          case "collection:kreypiak":
            collectionName = "Kreypiak"
            collectionSlug = "kreypiak"
            break;
          case "collection:kuta":
            collectionName = "Kuta"
            collectionSlug = "kuta"
            break;
          case "collection:mikha":
            collectionName = "Mikha"
            collectionSlug = "mikha"
            break;
          case "collection:minimalis":
            collectionName = "Minimalis"
            collectionSlug = "minimalis"
            break;
          case "collection:oasis":
            collectionName = "Oasis"
            collectionSlug = "oasis"
            break;
          case "collection:olanda":
            collectionName = "Olanda"
            collectionSlug = "olanda"
            break;
          case "collection:sherry":
            collectionName = "Sherry"
            collectionSlug = "sherry"
            break;
          case "collection:slats":
            collectionName = "Slats"
            collectionSlug = "slats"
            break;
          case "collection:ubud":
            collectionName = "Ubud"
            collectionSlug = "ubud"
            break;
          case "collection:coiffeuse":
            collectionName = "Coiffeuse"
            collectionSlug = "coiffeuse"
            break;
        
          default:
            break;
        }
      }
    }
    let imagesString = ''
    let websiteName = ''
    for (const field of result.customfields) {
      if (field.code === 'websitepic') {
        imagesString = field.formatted_value
      }
      if (field.code === 'websitename') {
        websiteName = field.formatted_value
      }
    }
    console.log(result.customfields);
    const product = {
      id:  result.id,
      name: websiteName,
      categorySlug:  slug,
      slug:  result.slug,
      collectionName,
      collectionSlug,
      images: imagesString.split(',')
    } 
    
    return NextResponse.json(product)
  
  } catch (error) {
    console.log("error:", error);
  }
}