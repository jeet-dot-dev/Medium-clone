import Form from "../Components/Form";
import Quote from "../Components/Quote";

const Signup = () => {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white">
      <div className="lg:col-span-6 order-2 lg:order-1">
        <Form />
      </div>
      <div className=" hidden lg:block lg:col-span-6 bg-[#f4f5f7] order-1 lg:order-2">
        <Quote />
      </div>
    </div>
  );
};

export default Signup;
