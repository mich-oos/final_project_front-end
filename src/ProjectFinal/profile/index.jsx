import React, { useState, useEffect } from 'react';


const API_BASE_URL = 'http://localhost:5000';

async function handleRequest(endpoint, method = 'GET', data = null) {
  const url = `${API_BASE_URL}/${endpoint}`;
  
  const config = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data && method !== 'GET') {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} - Gagal ${method} data.`);
    }

    if (response.status === 204 || method === 'DELETE') {
      return null; 
    }

    return await response.json();

  } catch (error) {
    console.error(`Gagal berkomunikasi dengan API pada ${endpoint}:`, error);
    throw error;
  }
}


const getUserProfile = async (id = 1) => {
  return handleRequest(`users/${id}`, 'GET');
};


const updateProfile = async (id, updatedData) => {

    const validData = {
        name: updatedData.name,
        email: updatedData.email,
        phone: updatedData.phone,
        address: updatedData.address,
    };
    return handleRequest(`users/${id}`, 'PUT', validData);
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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('detail');
  const [modal, setModal] = useState(null);

  
  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserProfile(1); 
      
      
      const fullUserData = {
          ...data,
          ordersCount: data.ordersCount || 7, 
          memberSince: data.memberSince || "Jan 2023" 
      };

      setUser(fullUserData);
    } catch (err) {
      setError("Gagal memuat profil. Pastikan JSON Server berjalan di port 5000.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);
  


  const handleEditProfile = () => {
    
      setModal({
          message: "Simulasi: Formulir edit profil akan dimuat di sini. Data yang tersedia di db.json dapat diubah.",
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
            <h3 className="text-2xl font-bold border-b pb-2 text-[#D99255]">Detail Akun</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#F6F6F6] p-4 rounded-xl shadow-inner"><strong className="text-gray-500">Nama:</strong> <p className="font-semibold">{user.name}</p></div>
              <div className="bg-[#F6F6F6] p-4 rounded-xl shadow-inner"><strong className="text-gray-500">Email:</strong> <p className="font-semibold">{user.email}</p></div>
              <div className="bg-[#F6F6F6] p-4 rounded-xl shadow-inner"><strong className="text-gray-500">Telepon:</strong> <p className="font-semibold">{user.phone}</p></div>
              <div className="bg-[#F6F6F6] p-4 rounded-xl shadow-inner md:col-span-2"><strong className="text-gray-500">Alamat Utama:</strong> <p className="font-semibold">{user.address}</p></div>
            </div>
            <button 
                onClick={handleEditProfile} 
                className="mt-4 bg-[#D99255] text-white py-2 px-6 rounded-xl hover:bg-[#C0814C] transition duration-300 shadow-md shadow-[#D99255]/50 active:scale-[0.99]"
            >
                Edit Profil
            </button>
          </div>
        );
      case 'orders':
        return (
          <div className="p-6">
            <h3 className="text-2xl font-bold border-b pb-2 text-[#D99255]">Riwayat Pesanan ({user.ordersCount} Pesanan)</h3>
            <p className="text-gray-600 mt-4 p-4 bg-gray-50 rounded-lg border">
                Anda memiliki **{user.ordersCount}** pesanan dalam riwayat Anda. Silakan lihat detail setiap pesanan di bawah ini (simulasi).
            </p>
            {/* Daftar Pesanan Simulasi */}
            <div className="space-y-4 mt-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <p className="font-bold text-gray-800">INV-20250101-001</p>
                    <p className="text-sm text-gray-500">Tanggal: 01 Jan 2025 | Total: Rp 500.000</p>
                    <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">Selesai</span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <p className="font-bold text-gray-800">INV-20250315-002</p>
                    <p className="text-sm text-gray-500">Tanggal: 15 Mar 2025 | Total: Rp 320.000</p>
                    <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">Dikirim</span>
                </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-bold border-b pb-2 text-[#D99255]">Pengaturan Akun</h3>
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
                    <input type="checkbox" defaultChecked className="form-checkbox h-5 w-5 text-[#D99255] rounded" />
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border">
                    <span>Notifikasi Promo</span>
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-[#D99255] rounded" />
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
      <div className="profile-container max-w-6xl mx-auto p-8 bg-[#EDDFB7] min-h-screen font-inter">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 border-b-2 pb-2 border-gray-400">Area Profil Saya</h1>

        <div className="grid md:grid-cols-4 gap-10">
          
          {/* Kolom Kiri: Sidebar Profil & Navigasi */}
          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit border border-gray-200">
            <div className="flex flex-col items-center mb-6 border-b pb-4 border-gray-300">
              {/* Avatar: memastikan inisial tidak kosong */}
              <div className="w-24 h-24 rounded-full bg-[#D99255]/10 flex items-center justify-center text-4xl font-bold text-[#D99255] mb-3 border-4 border-[#D99255]">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-gray-500">Anggota sejak {user.memberSince}</p>
            </div>

            <nav className="flex flex-col space-y-2">
              {[
                { id: 'detail', name: 'Detail Akun' },
                { id: 'orders', name: 'Riwayat Pesanan' },
                { id: 'settings', name: 'Pengaturan' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-left py-3 px-4 rounded-xl transition duration-200 text-lg ${
                    activeTab === item.id 
                      ? 'bg-[#D99255] text-white font-semibold shadow-md shadow-[#D99255]/40' 
                      : 'text-gray-700 hover:bg-[#D99255]/10 hover:text-[#D99255]'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              {/* Button Logout terhubung ke fungsi */}
              <button 
                onClick={handleLogout} // Terhubung ke fungsi logout
                className="text-left py-3 px-4 text-[#FF0202] hover:bg-[#FF0202]/10 rounded-xl border-t mt-4 text-lg font-semibold transition duration-200"
              >
                Keluar (Logout)
              </button>
            </nav>
          </div>

          {/* Kolom Kanan: Konten Tab */}
          <div className="md:col-span-3 bg-white rounded-xl shadow-lg border border-gray-200">
            <TabContent tab={activeTab} />
          </div>
        </div>
      </div>
      {/* Tampilkan Modal jika state modal terisi */}
      {modal && <CustomModal {...modal} />}
    </> 
  );
};

export default ProfilePage;