import { getProviders, signIn as SigninIntoProviders} from "next-auth/react";
import Header from "../../components/Header";

function signIn({ providers }) {
    
   
  return (
    <>
    <Header/>
    <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 text-center px-14">
    <img src="https://links.papareact.com/ocw" alt="" className="w-80" />
    <p>This is just simple Insta Clone</p>
      <div className="mt-40">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button className="p-3 text-white bg-blue-500 rounded-lg " onClick={() => SigninIntoProviders(provider.id, { callbackUrl: '/' })}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
    

    
  </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
        providers
    },
  };
}

export default signIn;
