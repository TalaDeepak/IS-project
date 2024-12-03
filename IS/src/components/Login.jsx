function Inp({ ourLable, ourPlaceholder }) {
  return (
    <>
      <label className=" text-white mb-3 font-semibold" htmlFor={ourLable}>
        {ourLable}
      </label>
      <input
        id={ourLable}
        className=" text-white border-[1px] bg-[#1d2532] outline-none focus:border-blue-400 focus:border-[3px] border-solid	border-slate-500 w-96  rounded-md h-10 px-2 mb-7"
        type="email"
        placeholder={ourPlaceholder}
      />
    </>
  );
}

function Login() {
  return (
    <div className=" flex flex-col w-screen h-screen items-center justify-center bg-[#111828] p-20">
      <p className=" text-3xl mb-5 font-semibold text-white">Login Form</p>
      <form>
        <div className=" flex items-start justify-center flex-col">
          <Inp ourLable={"Email"} ourPlaceholder={"Enter your email"} />
          <Inp ourLable={"Password"} ourPlaceholder={"Enter your password"} />
          <button className=" w-full p-2 text-white bg-blue-600 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
