import { SignIn } from "@clerk/nextjs";



const Page = ({ searchParams }: {
  searchParams: { redirectUrl?: string }
}) => {
    return <SignIn forceRedirectUrl={searchParams.redirectUrl || '/'} />;
}

export default Page