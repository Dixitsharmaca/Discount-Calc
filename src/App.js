import React, { useState, useEffect } from 'react';
import './app.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [finalPrice, setFinalPrice] = useState('');

  const calculateDiscount = () => {
    const originalPriceFloat = parseFloat(originalPrice);
    const discountPercentageFloat = parseFloat(discountPercentage);

    if (isNaN(originalPriceFloat) || isNaN(discountPercentageFloat)) {
      toast.error('Please Enter Valid Numbers.', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (originalPriceFloat < 0 || discountPercentageFloat < 0) {
      toast.error('Please Input Non-Negative Numbers', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (discountPercentageFloat > 100) {
      toast.error('Discount Percentage cannot be greater than 100%', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (originalPriceFloat < discountPercentageFloat) {
      toast.error('Discount cannot be greater than Original Price', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const discountAmount = (originalPriceFloat * discountPercentageFloat) / 100;
    const finalPriceFloat = originalPriceFloat - discountAmount;

    setFinalPrice(finalPriceFloat.toFixed(2));
  };

  useEffect(() => {
    if (originalPrice === '' && discountPercentage === '') {
      // Clear the final price when both fields are empty
      setFinalPrice('');
    }
  }, [originalPrice, discountPercentage]);

  const clearResults = () => {
    setOriginalPrice('');
    setDiscountPercentage('');
    setFinalPrice('');
  };

  return (
    <div className="AppContainer">
      <ToastContainer />
      <h1 className="Title">Discount Calculator</h1>
      <div className="CalculatorContainer">
        <div className="InputContainer">
          <label>Original Price:</label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
        </div>
        <div className="InputContainer">
          <label>Discount Percentage:</label>
          <input
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
          />
        </div>
        {finalPrice !== '' && (
          <p className="Result">
            Final Price after Discount: ${finalPrice}
          </p>
        )}
        {(originalPrice !== '' || discountPercentage !== '') && (
          <>
            <button className="CalculateButton" onClick={clearResults}>
              Clear
            </button>
            <div style={{ marginBottom: '20px' }}></div>
          </>
        )}
        <button className="CalculateButton" onClick={calculateDiscount}>
          Calculate
        </button>
      </div>
    </div>
  );
}

export default App;
