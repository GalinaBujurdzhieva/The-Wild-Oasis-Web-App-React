import { auth } from "../_lib/auth"

export const metadata = {
    title: "Guest area"
}

export default async function Page(){
    const session = await auth();
    return(
        <h1>Welcome, {session.user.name.split(" ").at(0)}</h1>
    )
}