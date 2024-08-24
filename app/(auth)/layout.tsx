

const AuthLayout = ({
    children
}: { children: React.ReactNode }) => {
    return (
        <div className='flex justify-center items-center h-screen mt-4'>
            {children}
        </div>
    )
}

export default AuthLayout;