import { createContext, useContext, ReactNode } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';

interface FirebaseContextType {
  addStory: (file: File, userId: string) => Promise<string>;
  addPost: (caption: string, file: File, userId: string) => Promise<string>;
  addShortVideo: (caption: string, file: File, userId: string) => Promise<string>;
  sendMessage: (text: string, senderId: string, receiverId: string) => Promise<void>;
  subscribeToStories: (callback: (stories: any[]) => void) => () => void;
  subscribeToPosts: (callback: (posts: any[]) => void) => () => void;
  subscribeToMessages: (userId: string, callback: (messages: any[]) => void) => () => void;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const addStory = async (file: File, userId: string) => {
    const storageRef = ref(storage, `stories/${userId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    
    const storyRef = await addDoc(collection(db, 'stories'), {
      userId,
      imageUrl: url,
      timestamp: serverTimestamp(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
    });
    
    return storyRef.id;
  };

  const addPost = async (caption: string, file: File, userId: string) => {
    const storageRef = ref(storage, `posts/${userId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    
    const postRef = await addDoc(collection(db, 'posts'), {
      userId,
      caption,
      imageUrl: url,
      timestamp: serverTimestamp(),
      likes: 0,
      comments: []
    });
    
    return postRef.id;
  };

  const addShortVideo = async (caption: string, file: File, userId: string) => {
    const storageRef = ref(storage, `shorts/${userId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    
    const shortRef = await addDoc(collection(db, 'shorts'), {
      userId,
      caption,
      videoUrl: url,
      timestamp: serverTimestamp(),
      likes: 0,
      comments: []
    });
    
    return shortRef.id;
  };

  const sendMessage = async (text: string, senderId: string, receiverId: string) => {
    await addDoc(collection(db, 'messages'), {
      text,
      senderId,
      receiverId,
      timestamp: serverTimestamp(),
      read: false
    });
  };

  const subscribeToStories = (callback: (stories: any[]) => void) => {
    const q = query(
      collection(db, 'stories'),
      orderBy('timestamp', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const stories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(stories);
    });
  };

  const subscribeToPosts = (callback: (posts: any[]) => void) => {
    const q = query(
      collection(db, 'posts'),
      orderBy('timestamp', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(posts);
    });
  };

  const subscribeToMessages = (userId: string, callback: (messages: any[]) => void) => {
    const q = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(messages);
    });
  };

  const value = {
    addStory,
    addPost,
    addShortVideo,
    sendMessage,
    subscribeToStories,
    subscribeToPosts,
    subscribeToMessages
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};