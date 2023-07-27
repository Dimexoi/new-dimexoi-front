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
      type: "item",
      search: {
        tags: "website",
        categoryid: "77162"
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
    const fetchedProducts = []

    for (const product in result) {
      let collectionName = null
      let collectionSlug = null
      for (const tagsid in result[product].tags) {
        if(result[product].tags[tagsid].word.includes('collection')) {
          switch (result[product].tags[tagsid].word) {
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
      fetchedProducts.push({
        id:  result[product].id,
        name: result[product].tradename,
        category:  result[product].categoryName,
        slug:  result[product].slug,
        collectionName,
        collectionSlug,
        images: result[product].customfields[2].textval.split(',')
      })
    }

    
    let start = 0;
    let last = - 1;
    type RandomIndexes = number[]
    const randomIndexes: RandomIndexes = [];

    while (start < 4) {
    const random = Math.floor(Math.random() * (fetchedProducts.length - 0) + 0);
    if (random !== last && !randomIndexes.find(enteredIndex => enteredIndex === random)) {
        last = random;
        randomIndexes.push(random);
        start++;
    } 
    }

    const products = [];

    for (const index in randomIndexes) {
      products.push(fetchedProducts[randomIndexes[index]])
    }
    
    
    return NextResponse.json({ products })
  
  } catch (error) {
    console.log("error:", error);
  }
}