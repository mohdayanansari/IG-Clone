import { useEffect, useState } from "react";
import faker from "faker";
import Story from "./Story";
import { useSession } from "next-auth/react";


function Stories() {
    const [suggestions, setSuggestions] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        const suggestions = [...Array(20)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i
        })) ;

        setSuggestions(suggestions);
    }, [])

    return (
        <div className="flex p-6 mt-8 space-x-2 overflow-x-scroll bg-white border border-gray-200 rounded-sm scrollbar-thin scrollbar-thumb-black">

        {session &&(
            <Story img={session?.user?.image} 
                username={session?.user?.username}
            />
        )}


        {suggestions.map(profile => (
            <Story key={profile.id} img={profile.avatar} username={profile.username} />
        ))}
            {/* Stories */}
        </div>
    )
}

export default Stories
