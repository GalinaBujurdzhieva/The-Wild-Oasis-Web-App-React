"use server"

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth"
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateProfile(formData){
    const session = await auth();
    if(!session) throw new Error("You must be logged in");

    const [nationality, countryFlag] = formData.get("nationality").split('%');
    const nationalID = formData.get("nationalID");
    const nationalIDRegex = /^[a-zA-Z0-9]{6,10}$/;
    if (!nationalIDRegex.test(nationalID)) throw new Error ("Please provide a valid national ID");
    const updateData = {nationality, countryFlag, nationalID};

    const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId)
    .select()
    .single();

  if (error) throw new Error('Guest could not be updated');
  revalidatePath("/account/profile")
}

export async function createReservation(bookingData, formData){
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    numGuests: Number(formData.get("numGuests")),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
    observations: formData.get("observations"),
    guestId: session.user.guestId
  }

  const { error } = await supabase
    .from('bookings')
    .insert([newBooking])

  if (error) throw new Error('Booking could not be created');
  
  revalidatePath(`/cabins/${newBooking.cabinId}`);
  redirect("/cabins/thankYou")
}

export async function deleteReservation(bookingId){
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const bookings = await getBookings(session.user.guestId);
  const bookingsIds = bookings.map(booking => booking.id);
  if(!bookingsIds.includes(bookingId)) throw new Error("You are not allowed to delete this reservation");

  const {error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) throw new Error('Booking could not be deleted');
  
  revalidatePath("/account/reservations")
}

export async function updateReservation(formData){
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const bookingId = Number(formData.get("bookingId"));
  const bookings = await getBookings(session.user.guestId);
  
  const bookingsIds = bookings.map(booking => booking.id);
  console.log(bookingId);
  console.log(bookingsIds);
  if (!bookingsIds.includes(bookingId)) throw new Error("You are not allowed to update this reservation");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000)
  }

  const { error } = await supabase
  .from('bookings')
  .update(updateData)
  .eq('id', bookingId)
  .select()
  .single();
  if (error) throw new Error('Booking could not be updated');

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations")
}


export async function SignInAction() {
   await signIn('google', {redirectTo: "/account"})
}

export async function SignOutAction(){
    await signOut({redirectTo: "/"})
}