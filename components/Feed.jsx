import { useSession } from "next-auth/react";
import MiniProfile from "./MiniProfile";
import Post from "./Posts";
import Stories from "./Stories";
import Sugestions from "./Sugestions";

function Feed() {
const { data: session } = useSession();


  return (
    <main className={`grid grid-cols-1 mx-auto md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl max-auto" ${!session && "!grid-cols-1 !max-w-3xl mx-auto" }`}>
      <section className="col-span-2">
        {/* Stories */}
        <Stories />
        {/* Posts */}
        <Post />
      </section>

      {/* ----------------------------- */}

    {session && (

      <section className="hidden xl:inline-grid md:col-span-1">
        <div className="fixed top-20">
          {/* MiniProfile */}
          <MiniProfile />
          {/* Sugestions */}
          <Sugestions />
        </div>
      </section>
    )}

    </main>
  );
}

export default Feed;
