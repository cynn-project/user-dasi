export default function OrderSuccess({ onNavigate, orderData }) {
  const { orderNumber, orderDate, paymentMethod, total } = orderData || { orderNumber: "-", orderDate: "-", paymentMethod: "-", total: "-" };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-16 bg-gray-50">
      <div className="text-center w-full max-w-[480px]">
        <div className="w-[88px] h-[88px] rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.8" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="font-extrabold text-2xl text-gray-900 mb-2.5" style={{ fontFamily: "var(--font-display)" }}>
          Pembayaran Berhasil!
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Terima kasih telah berbelanja di DASI. Pesanan Anda sedang diproses..
        </p>

        <div className="bg-white rounded-2xl border border-gray-200 px-7 py-6 mb-7 shadow-sm text-left">
          <h3 className="text-sm font-bold text-gray-900 mb-5">Ringkasan Pesanan</h3>
          {[
            { label: "No. Pesanan", value: orderNumber },
            { label: "Tanggal", value: orderDate },
            { label: "Metode Pembayaran", value: paymentMethod },
          ].map((row, i) => (
            <div key={i} className="flex justify-between items-center mb-3.5">
              <span className="text-sm text-gray-500">{row.label}</span>
              <span className="text-sm text-gray-700 font-medium">{row.value}</span>
            </div>
          ))}
          <div className="border-t border-gray-100 my-4" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-900">Total Pembayaran</span>
            <span className="text-sm font-bold text-blue-600">{total}</span>
          </div>
        </div>

        <button onClick={() => onNavigate("home")}
          className="px-12 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-bold border-none cursor-pointer hover:bg-blue-700 transition-colors">
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}