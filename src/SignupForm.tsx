import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
const SignupSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name must not be empty" })
    .max(50, { message: "First name must be less than 51 characters" }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name must not be empty" })
    .max(50, { message: "Last name must be less than 51 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(5, { message: "Must be 5 or more characters long" }),
});

type SignupSchemaType = z.infer<typeof SignupSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
  });
  return (
    <div className='lg:flex lg:w-full lg:h-screen flex justify-center'>
      <img
        src='https://i.imghippo.com/files/V0NM41715404482.jpg'
        alt='ds'
        className='lg:block hidden'
      />
      <form
        onSubmit={handleSubmit((data) =>
          alert(`
            Name:    ${data.firstName} ${data.lastName}
            Email:   ${data.email}
            Password:  ${data.password}
          `)
        )}
        className='flex flex-col md:space-y-2 p-4 space-y-4  justify-center h-screen lg:w-full md:w-3/4 '
      >
        <h1 className='text-4xl text-gray-950  text-center tracking-wide antialiased font-bold'>
          Welcome
        </h1>
        <h1 className='text-lg font-normal text-center text-gray-700 tracking-widest'>
          Start exploring our{" "}
          <span className='text-green-400 font-medium'>blog</span> posts
        </h1>
        <div className='grid grid-cols-2 space-x-2'>
          <div className='flex flex-col'>
            <h1 className='font-medium text-gray-700 text-xl text-left'>
              First Name
            </h1>
            <input
              type='text'
              placeholder='John'
              {...register("firstName")}
              className='w-full rounded-md border-2 p-2'
            />
            {errors.firstName && (
              <span className='text-red-600 text-sm font-normal'>
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className='flex flex-col'>
            <h1 className='font-medium text-gray-700 text-xl text-left'>
              Last Name
            </h1>
            <input
              type='text'
              placeholder='Doe'
              {...register("lastName")}
              className='w-full rounded-md border-2 p-2'
            />
            {errors.lastName && (
              <span className='text-red-600 text-sm font-normal'>
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>
        <h1 className='font-medium text-gray-700 text-xl text-left'>Email</h1>
        <input
          type='email'
          placeholder='johndoe@gmail.com'
          {...register("email")}
          className='w-full rounded-md border-2 p-2'
        />
        {errors.email && (
          <span className='text-red-600 text-sm font-normal'>
            {errors.email.message}
          </span>
        )}
        <h1 className='font-medium text-gray-700 text-xl text-left'>
          Password
        </h1>

        <input
          type='password'
          placeholder='Password'
          {...register("password")}
          className='w-full rounded-md border-2 p-2'
        />
        {errors.password && (
          <span className='text-red-600 text-sm font-normal'>
            {errors.password.message}
          </span>
        )}
        <button
          disabled={
            !!(
              errors.password ||
              errors.email ||
              errors.firstName ||
              errors.lastName
            )
          }
          className='bg-green-400 p-2 hover:bg-green-500 font-medium text-xl rounded-md text-white'
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
