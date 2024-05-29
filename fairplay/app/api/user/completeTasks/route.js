import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/utils/db";
import { NextResponse } from "next/server";

const firebaseConfig = {
  apiKey: "AIzaSyAkTGGUknV1z6VIksQrxvgxnX1Mmo",
  authDomain: "fairplay-3092c.firebaseapp.com",
  projectId: "fairplay-3092c",
  storageBucket: "fairplay-3092c.appspot.com",
  messagingSenderId: "701904820301",
  appId: "1:701904820301:web:970b181d1712f9106ca404",
  measurementId: "G-8EM8BRP5G0",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function POST(req) {
  try {
    const form = await req.formData();
    const id = parseInt(form.get("id"), 10);
    const textInput = form.get("text") || null;
    const imageFile = form.get("image");

    let imageUrl = null;

    if (imageFile) {
      const imageRef = ref(storage, `tasks/${id}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const updatedTask = await db.userTasks.update({
      where: { id: id },
      data: {
        textInput: textInput,
        imageFile: imageUrl,
        completed: true,
        admintext: null,
      },
    });

    return NextResponse.json(
      {
        task: updatedTask,
        message: "Task completed successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error completing task:", error);
    return NextResponse.json(
      { message: "Failed to complete task" },
      { status: 500 }
    );
  }
}
