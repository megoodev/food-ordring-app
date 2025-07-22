import { Routes } from "@/app/constants/enums";
import BasteHeading from "../mainHeading";


const Contact = async () => {

  return (
    <section className='section-gap' id={Routes.CONTACT}>
      <div className='container text-center'>
        <BasteHeading

          title={"DON'T HESITATE"} description={'Contact US'} />
        <div className='mt-8'>
          <a className='text-4xl underline text-gray-400' href='tel:+2012121212'>
            +2012121212
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;