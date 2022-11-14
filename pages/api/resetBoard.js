import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb'

export default async function handler(request, response) {
  try {
    let  { boardValueObj } = request.body;
    let keyArr = [], valueArr = [];
    for (let key in boardValueObj) {
      keyArr.push('values.' + key.toString() + '.value')
      valueArr.push(boardValueObj[key])
    }
    const mongoClient = await clientPromise;
    const db = mongoClient.db("tic-tac-tito");
    const collection = db.collection("boards");
    const results = await collection
      .updateOne({
        "_id": ObjectId("63684fe77fafe69e4e486ce4"),
      },
      { $set: 
        { 
          [keyArr[0]]: valueArr[0],
          [keyArr[1]]: valueArr[1],
          [keyArr[2]]: valueArr[2],
          [keyArr[3]]: valueArr[3],
          [keyArr[4]]: valueArr[4],
          [keyArr[5]]: valueArr[5],
          [keyArr[6]]: valueArr[6],
          [keyArr[7]]: valueArr[7],
          [keyArr[8]]: valueArr[8] 
        } 
      })
    response.status(200).json(results);
  } catch (e) {
    console.error(e);
    response.status(500).json(e);
  }
}