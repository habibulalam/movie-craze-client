import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

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
                            <label htmlFor="name" className="block text-sm">Name</label>
                            <input type="name" name="name" id="Name" placeholder="Enter your name" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-custom-blue focus:border-default-400 placeholder:text-gray-400" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm">Email address</label>
                            <input type="email" name="email" id="email" placeholder="your@mail.com" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-custom-blue focus:border-default-400 placeholder:text-gray-400" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="photoUrl" className="block text-sm">Photo (Url)</label>
                            <input type="photoUrl" name="photoUrl" id="photoUrl" placeholder="Enter your photo url" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-custom-blue focus:border-default-400 placeholder:text-gray-400" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <div className="relative">
                                <input type={isShowPass ? 'text' : 'password'} name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-custom-blue focus:border-default-400 placeholder:text-gray-400" required />
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
                        aria-label="Signup with Google" className="hover:cursor-pointer active:scale-95 transition-all duration-300 flex items-center justify-center w-full p-4 space-x-4 border-2 rounded-4xl focus:ring-2 focus:ring-offset-1 focus:ring-default-400 bg-white text-custom-blue hover:bg-custom-orange hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                        <p>Sign Up with Google</p>
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