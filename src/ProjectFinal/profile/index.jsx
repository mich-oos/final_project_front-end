import React, { useState, useEffect } from 'react';

const updateProfile = async (id, updatedData) => {
    console.warn("Fungsi updateProfile tidak diimplementasikan penuh. Tambahkan logika fetch PUT.");
    return { success: true, message: "Simulasi update berhasil" };
};

const CustomModal = ({ message, onConfirm, onCancel, showConfirm = false }) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl transform transition-all scale-100">
            <p className="text-lg font-semibold text-gray-800 mb-6">{message}</p>
            <div className="flex justify-end space-x-3">
                {showConfirm && onCancel && (
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150"
                    >
                        Batal
                    </button>
                )}
                {showConfirm && onConfirm && (
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-150 shadow-md"
                    >
                        Ya, Lanjutkan
                    </button>
                )}
                {!showConfirm && (
                    <button
                        onClick={onCancel || onConfirm} 
                        className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-150 shadow-md"
                    >
                        OK
                    </button>
                )}
            </div>
        </div>
    </div>
);


const ProfilePage = () => {
  const [user, setUser] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('detail'); 
  const [modal, setModal] = useState(null);

  
  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/users`); 
      
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      const fullUserData = {
          ...data,
          memberSince: data.memberSince || "Jan 2023" 
      };

      setUser(fullUserData);
      
    } catch (err) {
      setError("Gagal memuat profil. Pastikan JSON Server berjalan di port 5000.");
      console.error("Gagal mengambil data profil:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);
  

  const handleEditProfile = () => {
    
      setModal({
          message: "Simulasi: Formulir edit profil akan dimuat di sini.",
          onCancel: () => setModal(null)
      });
  };

  const handleLogout = () => {
      setModal({
          message: "Apakah Anda yakin ingin keluar dari akun Anda?",
          showConfirm: true,
          onConfirm: () => {
              setModal(null);
              setTimeout(() => {
                  setModal({ message: "Anda berhasil keluar. Sampai jumpa lagi!", onCancel: () => setModal(null) });
              }, 300);
          },
          onCancel: () => setModal(null)
      });
  };
  

    const TabContent = ({ tab }) => {
    if (!user) return null;
    switch (tab) {
      case 'detail':
        return (
          <div className="space-y-4 p-6">
            <h3 className="text-2xl font-bold border-b pb-2" style={{ color: '#D99255' }}>Detail Akun</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#F6F6F6] p-4 rounded-xl shadow-inner"><strong className="text-gray-500">Nama:</strong> <p className="font-semibold">{user.name}</p></div>
              <div className="bg-[#F6F6F6] p-4 rounded-xl shadow-inner"><strong className="text-gray-500">Email:</strong> <p className="font-semibold">{user.email}</p></div>
              <div className="bg-[#F6F6F6] p-4 rounded-xl shadow-inner"><strong className="text-gray-500">Telepon:</strong> <p className="font-semibold">{user.phone}</p></div>
              <div className="bg-[#F6F6F6] p-4 rounded-xl shadow-inner md:col-span-2"><strong className="text-gray-500">Alamat Utama:</strong> <p className="font-semibold">{user.address}</p></div>
            </div>
            <button 
                onClick={handleEditProfile} 
                className="mt-4 text-white py-2 px-6 rounded-xl transition duration-300 shadow-md active:scale-[0.99]"
                style={{ backgroundColor: '#D99255' }}
            >
                Edit Profil
            </button>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-bold border-b pb-2" style={{ color: '#D99255' }}>Pengaturan Akun</h3>
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg border">
                <p className="font-semibold text-gray-700">Keamanan:</p>
                <button 
                    onClick={() => setModal({ message: "Simulasi: Membuka halaman ubah kata sandi.", onCancel: () => setModal(null) })}
                    className="w-full text-left py-2 px-4 rounded-lg bg-white border hover:bg-gray-100 transition"
                >
                    Ubah Kata Sandi
                </button>
                <p className="font-semibold text-gray-700 pt-3">Notifikasi:</p>
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border">
                    <span>Notifikasi Email</span>
                    <input type="checkbox" defaultChecked className="form-checkbox h-5 w-5 rounded" style={{ color: '#D99255' }} /> 
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border">
                    <span>Notifikasi Promo</span>
                    <input type="checkbox" className="form-checkbox h-5 w-5 rounded" style={{ color: '#D99255' }} />
                </div>
            </div>
          </div>
        );
      default: 
        return null;
    }
  };
  if (loading) return <div className="text-center p-10 font-inter text-gray-700">Memuat data profil...</div>;
  if (error) return <div className="text-center p-10 text-red-600 bg-red-100 rounded-lg max-w-xl mx-auto mt-10 shadow-lg font-inter">{error}</div>;


   return (   
    <> 
      <div className="profile-container max-w-6xl mx-auto p-8 font-inter">       
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 border-b-2 pb-2 border-gray-400">Area Profil Saya</h1>
        <div className="grid md:grid-cols-4 gap-10">
          
          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit border border-gray-200">
            <div className="flex flex-col items-center mb-6 border-b pb-4 border-gray-300">
              <div className="w-24 h-24 rounded-full bg-transparent flex items-center justify-center text-4xl font-bold mb-3 border-4" style={{ borderColor: '#D99255', color: '#D99255', backgroundColor: 'rgba(217, 146, 85, 0.1)' }}>
                  {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-gray-500">Anggota sejak {user.memberSince}</p>
            </div>

            <nav className="flex flex-col space-y-2">
              {[
                { id: 'detail', name: 'Detail Akun' },
                { id: 'settings', name: 'Pengaturan' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-left py-3 px-4 rounded-xl transition duration-200 text-lg ${
                    activeTab === item.id 
                      ? 'text-white font-semibold shadow-md' 
                      : 'text-gray-700 hover:text-[#D99255]'
                  }`}
                  style={{ 
                      backgroundColor: activeTab === item.id ? '#D99255' : 'transparent',
                      color: activeTab !== item.id ? '#4B5563' : 'white' 
                  }}
                >
                  {item.name}
                </button>
              ))}
              <button 
                onClick={handleLogout} 
                className="text-left py-3 px-4 text-[#FF0202] hover:bg-transparent rounded-xl border-t mt-4 text-lg font-semibold transition duration-200"
                style={{ color: '#FF0202', borderColor: '#FF0202' }} 
              >
                Keluar (Logout)
              </button>
            </nav>
          </div>

          <div className="md:col-span-3 bg-white rounded-xl shadow-lg border border-gray-200">
            <TabContent tab={activeTab} />
          </div>
        </div>
      </div>
      {modal && <CustomModal {...modal} />}
    </> 
  );
};

export default ProfilePage;