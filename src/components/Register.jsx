import React from "react";

const Register = () => {
  return (
    <div className="py-12 px-4 md:px-12 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Ready to Start Your Journey?</h2>
      <p className="text-center mb-8 text-gray-700">Join our community and discover a new path to wellness.</p>

      {/* User Registration Form */}
      <div className="bg-gray-50 p-6 rounded-lg mb-12 shadow">
        <h3 className="text-xl font-semibold mb-4">User Registration</h3>
        <form className="flex flex-col space-y-4">
          <input type="text" placeholder="Full Name *" className="p-2 border rounded" />
          <input type="text" placeholder="Age Range *" className="p-2 border rounded" />
          <div className="flex space-x-4">
            <label><input type="checkbox" /> Male</label>
            <label><input type="checkbox" /> Female</label>
          </div>
          <input type="text" placeholder="Contact Number *" className="p-2 border rounded" />
          <input type="email" placeholder="Email ID" className="p-2 border rounded" />
          <input type="text" placeholder="City / Area *" className="p-2 border rounded" />
          <button type="submit" className="bg-green-700 text-white p-2 rounded">Submit</button>
        </form>
      </div>

      {/* Trainer Registration Form */}
      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Trainer Registration</h3>
        <form className="flex flex-col space-y-4">
          <input type="text" placeholder="Full Name *" className="p-2 border rounded" />
          <input type="text" placeholder="Contact Number *" className="p-2 border rounded" />
          <input type="email" placeholder="Email *" className="p-2 border rounded" />
          <input type="text" placeholder="Address" className="p-2 border rounded" />
          <input type="text" placeholder="Specialization *" className="p-2 border rounded" />
          <input type="text" placeholder="Years of Experience / Certifications *" className="p-2 border rounded" />
          <input type="text" placeholder="Availability / Preferred Time Slots *" className="p-2 border rounded" />
          <textarea placeholder="Short Bio" className="p-2 border rounded"></textarea>
          <button type="submit" className="bg-green-700 text-white p-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
