import { useState, useEffect } from "react";
import axios from "axios";

const RestAPI = () => {
  const [profile, setProfile] = useState([]);
  const [education, setEducation] = useState([]);
  const [contacts, setContacts] = useState({});
  const [funfact, setFunfact] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/profile").then((res) => setProfile(res.data));
    axios.get("http://localhost:3000/education").then((res) => setEducation(res.data));
    axios.get("http://localhost:3000/contacts").then((res) => setContacts(res.data));
    axios.get("http://localhost:3000/funfact").then((res) => setFunfact(res.data));
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-8">
        BIODATA
      </h1>

      {/* Profile */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Profil Saya</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profile.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition"
            >

              <div className="flex justify-center mb-3">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>

              <h3 className="text-lg font-semibold text-center">{user.name}</h3>
              <ul className="text-sm mt-3 space-y-1">
                <li><strong>Umur:</strong> {user.age}</li>
                <li><strong>Tempat, Tanggal Lahir:</strong> {user.birthplace}, {user.birthdate}</li>
                <li><strong>Alamat:</strong> {user.address}</li>
                <li><strong>Jenis Kelamin:</strong> {user.gender}</li>
                <li><strong>Hobby:</strong> {user.hobby}</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Pendidikan</h2>
        {education.map((edu) => (
          <div
            key={edu.id}
            className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-3"
          >
            {edu.picture && (
              <div className="flex justify-center mb-3">
                <img
                  src={edu.picture}
                  alt="Education"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}

            <p><strong>Universitas:</strong> {edu.university}</p>
            <p><strong>Jurusan:</strong> {edu.major}</p>
            <p><strong>NIM:</strong> {edu.NIM}</p>
          </div>
        ))}
      </section>

      {/* Contacts */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Kontak</h2>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p><strong>Email:</strong> {contacts.email}</p>
          <p><strong>Telepon:</strong> {contacts.phone}</p>
        </div>
      </section>

      {/* Fun Fact */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fun Fact Tentang Saya</h2>
        <ul className="list-disc list-inside bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          {funfact.map((fact) => (
            <li key={fact.id}>{fact.text}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default RestAPI;