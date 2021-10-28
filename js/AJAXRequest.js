export default async function AJAXRequest({url, body, method, token}) {
    if (!token) {
        const request = await fetch(url, {
            method,
            body,
        });
        return await request.json();
    } 
    if (method.toUpperCase() === "DELETE")  {
        await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
        });
        return;
    }
    
    const request = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
        },
        body,
    });
    return await request.json();
}