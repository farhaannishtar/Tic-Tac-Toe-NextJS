import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb'

export default async function handler(request, response) {
  try {
    console.log("~~~~~~~~~~~~~Inside updateTurn.js~~~~~~~~~~~~~~~~")
    console.log("request.body: ", request.body);
    let  { XTurn } = request.body;
    console.log("XTurn: ", XTurn);
    console.log("type of XTurn", typeof XTurn);

    const mongoClient = await clientPromise;
    const db = mongoClient.db("tic-tac-tito");
    const collection = db.collection("boards");
    const results = await collection
    .updateOne({
      "_id": ObjectId("63684fe77fafe69e4e486ce4"),
    },
    [
      { "$set": { "XTurn": { "$not": "$XTurn" } } }
    ]        
    )
    response.status(200).json(results);
  } catch (e) {
    console.error(e);
    response.status(500).json(e);
  }
}

