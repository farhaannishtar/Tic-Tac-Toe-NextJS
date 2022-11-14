import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb'

export default async function handler(request, response) {
  try {

    console.log("request.body: ", request.body);
    let  { xTurn } = request.body;
    console.log("xTurn: ", xTurn);
    console.log("type of xTurn", typeof xTurn);

    const mongoClient = await clientPromise;
    const db = mongoClient.db("tic-tac-tito");
    const collection = db.collection("boards");
    const results = await collection
    .updateOne({
      "_id": ObjectId("63684fe77fafe69e4e486ce4"),
    },
    [
      { "$set": { "xTurn": { "$not": "$xTurn" } } }
    ]        
    )
    response.status(200).json(results);
  } catch (e) {
    console.error(e);
    response.status(500).json(e);
  }
}

