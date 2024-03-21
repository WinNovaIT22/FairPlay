import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/utils/db";
import { NextResponse } from "next/server";

const firebaseConfig = {
    apiKey: "AIzaSyAkTGGUknV1cQLr1z6VIksQrxvgxnX1Mmo",
    authDomain: "fairplay-3092c.firebaseapp.com",
    projectId: "fairplay-3092c",
    storageBucket: "fairplay-3092c.appspot.com",
    messagingSenderId: "701904820301",
    appId: "1:701904820301:web:970b181d1712f9106ca404",
    measurementId: "G-8EM8BRP5G0"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function POST(req) {
    try {
        const form = await req.formData();
        const id = parseInt(form.get('id'), 10);
        const imageFile = form.get('image');

        // Upload image to Firebase Storage
        const imageRef = ref(storage, `inspected/${id}`);
        await uploadBytes(imageRef, imageFile);

        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(imageRef);

        // Find the existing vehicle record
        const existingVehicle = await db.userVehicles.findFirst({
            where: {
                id: id,
            }
        });

        // If the vehicle record exists, update the inspectedImage field
        if (existingVehicle) {
            const updatedVehicle = await db.userVehicles.update({
                where: { id: existingVehicle.id },
                data: { inspectedImage: imageUrl, inspected: true }
            });
            return NextResponse.json({ user: updatedVehicle, message: "User vehicle updated with image URL" }, { status: 200 });
        } else {
            return NextResponse.error(new Error("Vehicle not found"), { status: 404 });
        }
    } catch(error) {
        console.error("Error processing request:", error); // Log error for debugging
        return NextResponse.error(new Error("Failed to update user vehicles"), { status: 500 });
    }
}