import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

// Save a game result
export const saveGameResult = async (
  userId,
  username,
  score,
  totalQuestions,
  coins
) => {
  try {
    const gameResult = {
      userId,
      username,
      score,
      totalQuestions,
      coins,
      timestamp: new Date(),
      percentage: Math.round((score / totalQuestions) * 100),
    };

    const docRef = await addDoc(collection(db, "gameResults"), gameResult);
    console.log("Game saved with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving game:", error);
    throw error;
  }
};

// Get user's game history
export const getUserHistory = async (userId) => {
  try {
    const q = query(
      collection(db, "gameResults"),
      where("userId", "==", userId),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    const querySnapshot = await getDocs(q);
    const history = [];
    querySnapshot.forEach((doc) => {
      history.push({ id: doc.id, ...doc.data() });
    });

    return history;
  } catch (error) {
    console.error("Error getting history:", error);
    throw error;
  }
};

// Get leaderboard (top 10 scores)
export const getLeaderboard = async () => {
  try {
    const q = query(
      collection(db, "gameResults"),
      orderBy("score", "desc"),
      limit(10)
    );

    const querySnapshot = await getDocs(q);
    const leaderboard = [];
    querySnapshot.forEach((doc) => {
      leaderboard.push({ id: doc.id, ...doc.data() });
    });

    return leaderboard;
  } catch (error) {
    console.error("Error getting leaderboard:", error);
    throw error;
  }
};
