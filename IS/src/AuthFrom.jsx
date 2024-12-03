import { useState } from "react";

function AuthForm() {
  // Step 1: Initialize state for form data and mode
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isRegister, setIsRegister] = useState(false); // toggle for login/register

  // Step 2: Update form data when inputs change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Step 4: Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      // Handle registration logic
      console.log("Registering user:", formData);
      // Add registration API call here
    } else {
      // Handle login logic
      console.log("Logging in user:", {
        email: formData.email,
        password: formData.password,
      });
      // Add login API call here
    }
  };

  // Toggle between Login and Register mode
  const toggleMode = () => {
    setIsRegister(!isRegister);
    // Reset form data when switching modes
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="max-w-sm mx-auto p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">
        {isRegister ? "Register" : "Login"}
      </h2>

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div>
            <label className="block">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mb-2"
            />
          </div>
        )}

        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mb-2"
          />
        </div>

        <div>
          <label className="block">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mb-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded mt-2"
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      <button onClick={toggleMode} className="w-full text-blue-500 mt-4">
        {isRegister
          ? "Already have an account? Login"
          : "Don’t have an account? Register"}
      </button>
    </div>
  );
}

export default AuthForm;
