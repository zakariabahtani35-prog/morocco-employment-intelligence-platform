import React, { useState } from 'react';
import { X, CheckCircle, Tag, Wallet, CreditCard, QrCode } from 'lucide-react';
import { TICKETS_DATA } from '../data/mockData';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTicketId?: string;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  initialTicketId = 'general',
}) => {
  const [selectedTicketId, setSelectedTicketId] = useState(initialTicketId);
  const [promoCode, setPromoCode] = useState('SIMPLON20');
  const [appliedDiscount, setAppliedDiscount] = useState(0.2); // 20% by default
  const [discountMsg, setDiscountMsg] = useState('20% academic access discount via SIMPLON20');
  const [quantity, setQuantity] = useState(1);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'usdc' | 'sol' | 'card'>('card');
  const [isPurchased, setIsPurchased] = useState(false);

  if (!isOpen) return null;

  const selectedTicket = TICKETS_DATA.find((t) => t.id === selectedTicketId) || TICKETS_DATA[0];
  const unitPrice = selectedTicket.price * (1 - appliedDiscount);
  const totalPrice = Math.round(unitPrice * quantity);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SIMPLON20') {
      setAppliedDiscount(0.2);
      setDiscountMsg('20% academic discount applied!');
    } else if (promoCode.trim().toUpperCase() === 'MEIP2026') {
      setAppliedDiscount(0.3);
      setDiscountMsg('30% VIP Data Analyst access discount applied!');
    } else {
      setAppliedDiscount(0);
      setDiscountMsg('Invalid promo code');
    }
  };

  const handleCompletePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    setIsPurchased(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div role="dialog" aria-modal="true" aria-label="Ticket Registration" className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-2xl text-[#1A202C] my-8 p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#F4F5F7] hover:bg-gray-200 p-2 rounded-xl text-gray-600 hover:text-[#3B388E] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isPurchased ? (
          <div className="space-y-6">
            <div className="space-y-1 border-b border-[#E2E8F0] pb-4">
              <span className="font-sans-body text-xs uppercase text-[#E6004D] font-bold">
                MEIP DATASET & DASHBOARD ACCESS
              </span>
              <h2 className="font-space font-bold text-2xl sm:text-3xl text-[#3B388E]">
                Register for MEIP Analytics Pass
              </h2>
            </div>

            {/* Ticket Tier Selection */}
            <div className="space-y-3">
              <label className="font-sans-body text-xs uppercase text-gray-500 font-bold block">
                Select Access Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TICKETS_DATA.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTicketId(t.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedTicketId === t.id
                        ? 'bg-[#FCE4E8] border-[#E6004D] text-[#3B388E] shadow-xs'
                        : 'bg-[#F4F5F7] border-[#E2E8F0] hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-space font-bold text-sm text-[#3B388E]">{t.name}</span>
                      <span className="font-sans-body text-xs font-bold text-[#E6004D]">${t.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Promo Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F4F5F7] p-4 rounded-xl border border-[#E2E8F0]">
              <div className="space-y-1">
                <label className="font-sans-body text-xs text-gray-500 uppercase font-semibold">Licenses</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-white border border-[#E2E8F0] rounded-lg w-8 h-8 font-sans-body text-lg hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="font-sans-body font-bold text-sm px-3">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-white border border-[#E2E8F0] rounded-lg w-8 h-8 font-sans-body text-lg hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-sans-body text-xs text-gray-500 uppercase font-semibold">Promo Code</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="SIMPLON20"
                    className="bg-white border border-[#E2E8F0] rounded-lg px-3 py-1.5 font-sans-body text-xs uppercase w-full text-[#1A202C] focus:outline-none focus:border-[#E6004D]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="bg-[#E6004D] text-white hover:bg-[#C00F2F] font-sans-body font-bold text-xs uppercase px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {discountMsg && (
                  <span className={`font-sans-body text-[11px] font-medium block mt-1 ${appliedDiscount > 0 ? 'text-[#E6004D]' : 'text-red-500'}`}>
                    {discountMsg}
                  </span>
                )}
              </div>
            </div>

            {/* Attendee Info Form */}
            <form onSubmit={handleCompletePurchase} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-sans-body text-xs text-gray-500 uppercase font-semibold">Full Name *</label>
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Zakaria Bahtani"
                    className="bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-sm text-[#1A202C] w-full focus:outline-none focus:border-[#E6004D]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-sans-body text-xs text-gray-500 uppercase font-semibold">Email Address *</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@zakariabahtani.dev"
                    className="bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-sm text-[#1A202C] w-full focus:outline-none focus:border-[#E6004D]"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="font-sans-body text-xs text-gray-500 uppercase font-semibold">Payment Option</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 text-xs font-sans-body rounded-xl uppercase font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'card' ? 'bg-[#E6004D] border-[#E6004D] text-white' : 'bg-[#F4F5F7] border-[#E2E8F0] text-gray-600'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>CREDIT CARD</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('usdc')}
                    className={`p-2.5 text-xs font-sans-body rounded-xl uppercase font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'usdc' ? 'bg-[#3B388E] border-[#3B388E] text-white' : 'bg-[#F4F5F7] border-[#E2E8F0] text-gray-600'
                    }`}
                  >
                    <Wallet className="w-3.5 h-3.5" />
                    <span>BANK TRANSFER</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('sol')}
                    className={`p-2.5 text-xs font-sans-body rounded-xl uppercase font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'sol' ? 'bg-[#3B388E] border-[#3B388E] text-white' : 'bg-[#F4F5F7] border-[#E2E8F0] text-gray-600'
                    }`}
                  >
                    <Wallet className="w-3.5 h-3.5" />
                    <span>CAMPUS CODE</span>
                  </button>
                </div>
              </div>

              {/* Price Summary & Submit */}
              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <span className="font-sans-body text-xs text-gray-500 uppercase block font-semibold">Total Amount</span>
                  <span className="font-space font-bold text-3xl text-[#3B388E]">${totalPrice}</span>
                </div>

                <button
                  type="submit"
                  className="bg-[#E6004D] hover:bg-[#C00F2F] text-white font-sans-body font-bold text-sm uppercase px-8 py-3 rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  Confirm & Access
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Success QR State */
          <div className="text-center py-8 space-y-6 animate-in fade-in">
            <div className="w-16 h-16 bg-[#FCE4E8] text-[#E6004D] rounded-full flex items-center justify-center mx-auto border border-[#E6004D]/30">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-space font-bold text-2xl text-[#3B388E]">Access Granted!</h3>
              <p className="font-sans-body text-gray-600 text-sm max-w-md mx-auto">
                Thank you, <span className="text-[#3B388E] font-semibold">{fullName}</span>. Your MEIP Interactive Dashboard & Data Warehouse license key is active. Details sent to <span className="text-[#E6004D] font-bold">{email}</span>.
              </p>
            </div>

            {/* QR Mock */}
            <div className="bg-[#F4F5F7] p-6 w-48 h-48 mx-auto flex flex-col items-center justify-center text-[#3B388E] border-2 border-[#E2E8F0] rounded-2xl">
              <QrCode className="w-32 h-32 text-[#3B388E]" />
              <span className="font-sans-body text-[10px] font-bold uppercase mt-2">MEIP-2026-KEY-998</span>
            </div>

            <button
              onClick={onClose}
              className="bg-[#3B388E] hover:bg-[#2e2b72] text-white font-sans-body font-bold text-xs uppercase px-6 py-2.5 rounded-xl border border-[#E2E8F0] cursor-pointer shadow-xs"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
