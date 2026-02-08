import React, { useState } from 'react'
import { CreditCard, Shield, Lock, CheckCircle, AlertCircle } from 'lucide-react'

function PaymentForm({ amount = 0, onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})

  const paymentMethods = [
    { id: 'credit', name: 'Credit Card', icon: '💳' },
    { id: 'debit', name: 'Debit Card', icon: '🏦' },
    { id: 'upi', name: 'UPI', icon: '📱' },
    { id: 'netbanking', name: 'Net Banking', icon: '🌐' },
    { id: 'wallet', name: 'Wallet', icon: '👛' }
  ]

  const upiApps = [
    { id: 'googlepay', name: 'Google Pay', color: 'bg-gradient-to-r from-blue-400 to-purple-500' },
    { id: 'phonepay', name: 'PhonePe', color: 'bg-gradient-to-r from-purple-500 to-blue-600' },
    { id: 'paytm', name: 'Paytm', color: 'bg-gradient-to-r from-blue-500 to-blue-700' },
    { id: 'amazonpay', name: 'Amazon Pay', color: 'bg-gradient-to-r from-yellow-400 to-orange-500' }
  ]

  const validateCard = () => {
    const newErrors = {}

    if (!cardDetails.number.trim()) {
      newErrors.number = 'Card number is required'
    } else if (!/^\d{16}$/.test(cardDetails.number.replace(/\s/g, ''))) {
      newErrors.number = 'Enter a valid 16-digit card number'
    }

    if (!cardDetails.name.trim()) {
      newErrors.name = 'Card holder name is required'
    }

    if (!cardDetails.expiry.trim()) {
      newErrors.expiry = 'Expiry date is required'
    } else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
      newErrors.expiry = 'Format: MM/YY'
    }

    if (!cardDetails.cvv.trim()) {
      newErrors.cvv = 'CVV is required'
    } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
      newErrors.cvv = 'Enter a valid CVV'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 16) value = value.slice(0, 16)
    
    // Add spaces every 4 digits
    value = value.replace(/(\d{4})/g, '$1 ').trim()
    
    setCardDetails(prev => ({
      ...prev,
      number: value
    }))
    
    if (errors.number) {
      setErrors(prev => ({ ...prev, number: '' }))
    }
  }

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 4) value = value.slice(0, 4)
    
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2)
    }
    
    setCardDetails(prev => ({
      ...prev,
      expiry: value
    }))
    
    if (errors.expiry) {
      setErrors(prev => ({ ...prev, expiry: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (paymentMethod === 'credit' || paymentMethod === 'debit') {
      if (!validateCard()) return
    }

    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      onPaymentSuccess?.({
        method: paymentMethod,
        amount,
        transactionId: `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString()
      })
    }, 2000)
  }

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'credit':
      case 'debit':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-8 h-8" />
                  <div>
                    <div className="text-xl font-bold">Card Payment</div>
                    <div className="text-gray-300 text-sm">
                      {paymentMethod === 'credit' ? 'Credit Card' : 'Debit Card'}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-10 h-6 bg-blue-500 rounded"></div>
                  <div className="w-10 h-6 bg-red-500 rounded"></div>
                  <div className="w-10 h-6 bg-yellow-500 rounded"></div>
                  <div className="w-10 h-6 bg-blue-700 rounded"></div>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardDetails.number}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 ${
                      errors.number ? 'border-red-500' : 'border-gray-700'
                    }`}
                  />
                  {errors.number && (
                    <p className="text-red-400 text-sm mt-1">{errors.number}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="JOHN DOE"
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-700'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 ${
                        errors.expiry ? 'border-red-500' : 'border-gray-700'
                      }`}
                    />
                    {errors.expiry && (
                      <p className="text-red-400 text-sm mt-1">{errors.expiry}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      CVV
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }))}
                        placeholder="123"
                        maxLength="4"
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 ${
                          errors.cvv ? 'border-red-500' : 'border-gray-700'
                        }`}
                      />
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                    {errors.cvv && (
                      <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Save Card Option */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
              <input
                type="checkbox"
                id="saveCard"
                className="w-5 h-5 text-bms-red rounded"
              />
              <label htmlFor="saveCard" className="text-gray-700">
                Save this card for faster payments
              </label>
            </div>
          </div>
        )

      case 'upi':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">UPI Payment</div>
                  <div className="text-gray-600">Scan QR code or select UPI app</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {upiApps.map((app) => (
                  <button
                    key={app.id}
                    className={`${app.color} text-white p-4 rounded-xl flex flex-col items-center justify-center hover:opacity-90 transition-opacity`}
                  >
                    <div className="text-lg font-bold mb-1">{app.name}</div>
                    <div className="text-sm opacity-90">Tap to Pay</div>
                  </button>
                ))}
              </div>

              {/* UPI ID Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter UPI ID
                </label>
                <input
                  type="text"
                  placeholder="username@upi"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* QR Code */}
              <div className="text-center">
                <div className="inline-block p-4 bg-white rounded-2xl shadow-lg">
                  <div className="w-48 h-48 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">📱</div>
                      <div className="font-bold">Scan to Pay</div>
                      <div className="text-sm mt-2">₹{amount}</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Scan this QR code with any UPI app
                </p>
              </div>
            </div>
          </div>
        )

      case 'netbanking':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">Net Banking</div>
                  <div className="text-gray-600">Select your bank</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank',
                  'Kotak Bank', 'Yes Bank', 'PNB', 'BOB', 'Canara Bank'
                ].map((bank) => (
                  <button
                    key={bank}
                    className="p-4 bg-white border rounded-xl hover:border-blue-500 hover:shadow-md transition-all text-left"
                  >
                    <div className="font-medium text-gray-800">{bank}</div>
                    <div className="text-xs text-gray-500">Secure Login</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 'wallet':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <CreditCard className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">Wallet Payment</div>
                  <div className="text-gray-600">Select your digital wallet</div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Paytm Wallet', balance: '₹1,245', color: 'bg-blue-500' },
                  { name: 'MobiKwik', balance: '₹890', color: 'bg-purple-500' },
                  { name: 'FreeCharge', balance: '₹560', color: 'bg-red-500' },
                  { name: 'Amazon Pay', balance: '₹2,100', color: 'bg-yellow-500' }
                ].map((wallet) => (
                  <button
                    key={wallet.name}
                    className="w-full p-4 bg-white rounded-xl border hover:border-yellow-500 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${wallet.color} rounded-lg flex items-center justify-center`}>
                        <span className="text-white font-bold">{wallet.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">{wallet.name}</div>
                        <div className="text-sm text-gray-500">Balance: {wallet.balance}</div>
                      </div>
                    </div>
                    <div className="text-bms-red font-bold">Pay</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-100 rounded-lg">
            <CreditCard className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Payment</h3>
            <p className="text-gray-600">Choose your preferred payment method</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-3xl font-bold text-bms-red">₹{amount}</div>
          <div className="text-sm text-gray-500">Amount to pay</div>
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <div className="flex space-x-2 overflow-x-auto pb-4">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={`
                flex items-center space-x-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all
                ${paymentMethod === method.id
                  ? 'bg-bms-red text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <span className="text-lg">{method.icon}</span>
              <span className="font-medium">{method.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Form */}
      {renderPaymentForm()}

      {/* Security Info */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Secure Payment</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                Your payment is secured with 256-bit SSL encryption
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                We do not store your card details
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                Verified by Visa / Mastercard SecureCode
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Important Notes</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Your tickets will be confirmed only after successful payment</li>
              <li>• In case of payment failure, amount will be refunded within 3-5 working days</li>
              <li>• Service charges are non-refundable</li>
              <li>• Keep your transaction ID for future reference</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isProcessing}
        className={`
          w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
          flex items-center justify-center space-x-3
          ${isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'
          }
        `}
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <Lock className="w-6 h-6" />
            <span>Pay Securely ₹{amount}</span>
          </>
        )}
      </button>
    </div>
  )
}

export default PaymentForm