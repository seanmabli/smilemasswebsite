import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(collection(db, "testimonials"));
      setTestimonials(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  testimonials.sort(function (first, second) {
    return first.index - second.index;
  });

  return (
    <div className="page">
      <h1>Testimonials</h1>
      <br />
      {testimonials.map((testimonial) => {
        return (
          <>
            <br />
            <p>{testimonial.content.replaceAll("\\n", "\n")}</p>
            <br />
          </>
        );
      })}
    </div>
  );
}
