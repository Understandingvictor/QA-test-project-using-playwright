const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL;




export default async function callBackEnd(socketId) {
    console.log("backend called from front end")
    try {
        const res = await fetch(`${backEndUrl}/triggerE2E`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            socketId
          }),
        });
        if (!res.ok) {
            console.log("not working")
        }
        console.log("working");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message, "is the error message");
    }
}