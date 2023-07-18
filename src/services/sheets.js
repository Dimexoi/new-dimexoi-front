const { GoogleSpreadsheet } = require("google-spreadsheet");
// credentials you have generated when creating the service account. TIP: DO NOT check this into your Git repo and it to your .gitignore file
const creds = require("../../cred.json");

// Create a document object using the ID of the spreadsheet - obtained from its URL.
const doc = new GoogleSpreadsheet("10zFcpqs44OBnmBI1NjhSB552iCwfF5rE4aQaX7U6zKo");

export async function getCategoryList() {
  try {
    // google sheets
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[1]; // or use doc.sheetsById[id] -- get first sheet in the document

    const rows = await sheet.getRows(); // return the rows from the 1st sheet
    const allCategories = rows.map((row) => {
      // return the data for each video (or whatever each row is in your sheet)
      return {
        name: row['Catégories de meuble'],
        imageLink: row['Images catégories'].replace('file/d/', 'uc?export=view&id=').replace('/view?usp=sharing', ''),
      };
    });
    // this returns the categories data
    return allCategories;
  } catch (error) {
    //   log any errors to the console
    console.log(error);
  }
}

export async function getProductList() {
  try {
    // google sheets
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[4]; // or use doc.sheetsById[id] -- get first sheet in the document

    const rows = await sheet.getRows(); // return the rows from the 1st sheet
    const allCategories = rows.map((row) => {
      // return the data for each video (or whatever each row is in your sheet)
      return {
        name: row['Nom'] == undefined ? null : row['Nom'],
        categoryName: row['Relation catégorie'],
        subCategoryName: row['Relation sous-catégorie'],
        attribute: row['Attribut produit'],
        dimensions: row['Dimensions'],
        images: [
          row['Image produit 1'].replace('file/d/', 'uc?export=view&id=').replace(row['Image produit 1'][row['Image produit 1'].length - 2] == 'g' ? '/view?usp=sharingg': '/view?usp=sharing', ''),
          row['Image produit 2'].replace('file/d/', 'uc?export=view&id=').replace(row['Image produit 2'][row['Image produit 2'].length - 2] == 'g' ? '/view?usp=sharingg': '/view?usp=sharing', ''),
          row['Image produit 3'].replace('file/d/', 'uc?export=view&id=').replace(row['Image produit 3'][row['Image produit 3'].length - 2] == 'g' ? '/view?usp=sharingg': '/view?usp=sharing', ''),
          row['Image produit 4'].replace('file/d/', 'uc?export=view&id=').replace(row['Image produit 4'][row['Image produit 4'].length - 2] == 'g' ? '/view?usp=sharingg': '/view?usp=sharing', ''),
        ],
        available: row['Stock'] == undefined ? null : row['Stock'],
        description : row['Description produit'],
        also: row['Existe aussi'] == undefined ? null : row['Existe aussi']
      };
    });
    // this returns the categories data
    return allCategories;
  } catch (error) {
    //   log any errors to the console
    console.log(error);
  }
}

export async function getSomeSdbProducts() {
  try {
    // google sheets
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[4]; // or use doc.sheetsById[id] -- get first sheet in the document

    const rows = await sheet.getRows(); // return the rows from the 1st sheet
    const allProducts = rows.map((row) => {
      // return the data for each video (or whatever each row is in your sheet)
      return {
        name: row['Nom'] == undefined ? null : row['Nom'],
        categoryName: row['Relation catégorie'],
        subCategoryName: row['Relation sous-catégorie'],
        attribute: row['Attribut produit'],
        dimensions: row['Dimensions'],
        images: [
          row['Image produit 1'].replace('file/d/', 'uc?export=view&id=').replace(row['Image produit 1'][row['Image produit 1'].length - 2] == 'g' ? '/view?usp=sharingg': '/view?usp=sharing', ''),
          row['Image produit 2'].replace('file/d/', 'uc?export=view&id=').replace(row['Image produit 2'][row['Image produit 2'].length - 2] == 'g' ? '/view?usp=sharingg': '/view?usp=sharing', ''),
          row['Image produit 3'].replace('file/d/', 'uc?export=view&id=').replace(row['Image produit 3'][row['Image produit 3'].length - 2] == 'g' ? '/view?usp=sharingg': '/view?usp=sharing', ''),
          row['Image produit 4'].replace('file/d/', 'uc?export=view&id=').replace(row['Image produit 4'][row['Image produit 4'].length - 2] == 'g' ? '/view?usp=sharingg': '/view?usp=sharing', ''),
        ],
        available: row['Stock'] == undefined ? null : row['Stock'],
        description : row['Description produit'],
        also: row['Existe aussi'] == undefined ? null : row['Existe aussi']
      };
    });
    // this returns the categories data
    const sdbProducts = allProducts.filter(product => product.categoryName === 'Salle de bains');
  
    const shortedSdbProducts = sdbProducts.slice(0, 4);
    return shortedSdbProducts;
  } catch (error) {
    //   log any errors to the console
    console.log(error);
  }
}

export async function getAllCollections() {
  try {
    // google sheets
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[5]; // or use doc.sheetsById[id] -- get first sheet in the document

    const rows = await sheet.getRows(); // return the rows from the 1st sheet
    const allCollections = rows.map((row) => {
      // return the data for each video (or whatever each row is in your sheet)
      return {
        name: row['Collection'],
        image: row['Image'].replace('file/d/', 'uc?export=view&id=').replace(row['Image'][row['Image'].length - 2] == 'g' ? '/view?usp=sharingg': '/view?usp=sharing', ''),
      };
    });
    // this returns the categories data


    return allCollections;
  } catch (error) {
    //   log any errors to the console
    console.log(error);
  }
}