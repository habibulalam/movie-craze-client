import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

const Signup = () => {

    const { createUser, updateUser, setUser, handleSigninWithGoogle } = useContext(AuthContext);

    const navigateToHome = useNavigate();

    const [errorMsg, setErrorMsg] = useState("");
    const [successfulMsg, setSuccessfulMsg] = useState("");
    const [isShowPass, setIsShowPass] = useState(false)

    // Handle Google singup
    const googleLoginFromLoginRoute = () => {
        handleSigninWithGoogle()
            .then(result => {
                console.log(result.user);

                // Show toast
                toast.success('Signup Successful', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                setTimeout(() => {
                    navigateToHome('/')
                }, 1000);
            })
            .catch(error => console.log(error))
    }

    const handleSignupFormSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessfulMsg("")

        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photoUrl.value;
        const password = e.target.password.value;

        // Password validation
        if (password.length < 6) {
            setErrorMsg("Password must be at least 6 characters long.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setErrorMsg("Password must contain at least one uppercase letter.");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setErrorMsg("Password must contain at least one lowercase letter.");
            return;
        }

        console.log(name, email, photo, password);

        // create user with email and pass
        createUser(email, password)
            .then(result => {
                const currentlyCreatingUser = result.user;
                updateUser(name, photo)
                    .then(() => {
                        // Force reload the user object from firebase
                        currentlyCreatingUser.reload().then(() => {
                            console.log("Name and photo added successfully while creating user");
                            // Optionally updating state here manually:
                            setUser({
                                ...currentlyCreatingUser,
                                displayName: name,
                                photoURL: photo,
                            });

                            setSuccessfulMsg("User Created Successfully");
                            // Show toast
                            toast.success('Signup Successful', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            });
                        });
                    })
                    .catch(err => {
                        console.log("Error occurred while adding name and photo", err);
                    });
                setTimeout(() => {
                    navigateToHome('/')
                }, 1000);
            })
            .catch(err => {
                console.log("Error occurred while creating new user", err);
                setErrorMsg(err.message);
                // Show error toast
                toast.error('Signup failed. Try again', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            });

    }

    return (
        <div>
            <div className="w-full max-w-md p-4 mx-auto mt-5 rounded-md shadow sm:p-8 bg-white text-custom-blue border border-custom-blue">
                <h2 className="mb-3 text-3xl font-semibold text-center">Sign Up</h2>

                {/* Form start */}
                <form onSubmit={handleSignupFormSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium">Name</label>
                            <input type="name" name="name" id="Name" placeholder="Enter your name" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-black focus:border-default-400 placeholder:text-gray-400" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium">Email address</label>
                            <input type="email" name="email" id="email" placeholder="your@mail.com" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-black focus:border-default-400 placeholder:text-gray-400" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="photoUrl" className="block text-sm font-medium">Photo (Url)</label>
                            <input type="photoUrl" name="photoUrl" id="photoUrl" placeholder="Enter your photo url" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-black focus:border-default-400 placeholder:text-gray-400" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">Password</label>
                            <div className="relative">
                                <input type={isShowPass ? 'text' : 'password'} name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-black focus:border-default-400 placeholder:text-gray-400" required />
                                <div onClick={() => setIsShowPass(!isShowPass)} className="absolute right-3 top-2 hover:cursor-pointer">
                                    {
                                        isShowPass ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>
                                    }
                                </div>
                            </div>
                        </div>
                        {/* error msg */}
                        <div>
                            {
                                errorMsg && <p className="text-red-600 text-sm pl-2 text-center">{errorMsg}</p>
                            }
                        </div>
                        {/* Successful msg */}
                        <div>
                            {
                                successfulMsg && <p className="text-custom-orange text-sm pl-2 text-center">{successfulMsg}</p>
                            }
                        </div>
                    </div>
                    <button type="submit" className="btn w-full px-8 py-5 mt-8 mb-4 text-base font-semibold rounded-md border border-custom-blue bg-custom-blue text-white hover:scale-[1.03] duration-200 transition">Sign in</button>
                </form>

                <div className="flex items-center w-full my-4">
                    <hr className="w-full text-gray-400" />
                    <p className="px-3 text-gray-400">OR</p>
                    <hr className="w-full text-gray-400" />
                </div>

                {/* Google SignUp */}
                <div className="my-6 space-y-4">
                    <button
                        onClick={googleLoginFromLoginRoute}
                        aria-label="Login with Google"
                        className="group hover:cursor-pointer active:scale-95 transition-all duration-300 flex items-center justify-center w-full p-4 space-x-4 border-2 rounded-4xl focus:ring-2 focus:ring-offset-1 focus:ring-default-400 bg-white text-custom-blue hover:bg-custom-orange hover:text-white">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="size-7">
                            <path className="fill-[#FFC107] group-hover:fill-white" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                            <path className="fill-[#FF3D00] group-hover:fill-white" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                            <path className="fill-[#4CAF50] group-hover:fill-white" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                            <path className="fill-[#1976D2] group-hover:fill-white" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                        </svg>

                        <p className="group-hover:text-white">Signup with Google</p>
                    </button>
                    <p className="text-sm text-center text-gray-400">Already have an account?
                        <Link to={'/login'} href="#" rel="noopener noreferrer" className="focus:underline hover:underline text-gray-500"> Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;