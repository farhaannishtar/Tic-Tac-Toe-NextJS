import clientPromise from '../../lib/mongodb';

export default async function handler(request, response) {
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db("tic-tac-tito");
    const collection = db.collection("boards");
    const results = await collection
      .find({})
      .limit(1)
      .toArray();

    response.status(200).json(results);
  } catch (e) {
    console.error(e);
    response.status(500).json(e);
  }
}