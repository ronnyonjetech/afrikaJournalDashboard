import React, { useState, useEffect } from 'react';

// Step 1: User Information
const Step1: React.FC<{ formData: any; setFormData: (data: any) => void }> = ({ formData, setFormData }) => {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold">Step 1: User Information</h2>
      <input
        type="text"
        placeholder="First Name"
        value={formData.firstName || ''}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formData.lastName || ''}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        className="p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

// Step 2: Address Information
const Step2: React.FC<{ formData: any; setFormData: (data: any) => void }> = ({ formData, setFormData }) => {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold">Step 2: Address Information</h2>
      <input
        type="text"
        placeholder="Street Address"
        value={formData.address || ''}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        placeholder="City"
        value={formData.city || ''}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        className="p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

// Step 3: Payment Information
const Step3: React.FC<{ formData: any; setFormData: (data: any) => void }> = ({ formData, setFormData }) => {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold">Step 3: Payment Information</h2>
      <input
        type="text"
        placeholder="Card Number"
        value={formData.cardNumber || ''}
        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        placeholder="Expiration Date"
        value={formData.expirationDate || ''}
        onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
        className="p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

const StepperWithContent: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<any>(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : {};
  });

  const steps = ['User Info', 'Address Info', 'Payment Info'];

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Multi-Step Form</h1>
      
      {/* Display current step */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{steps[step]}</h2>
      </div>

      {/* Render the current step */}
      {step === 0 && <Step1 formData={formData} setFormData={setFormData} />}
      {step === 1 && <Step2 formData={formData} setFormData={setFormData} />}
      {step === 2 && <Step3 formData={formData} setFormData={setFormData} />}

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={step === 0}
          className="px-4 py-2 bg-gray-300 rounded-md text-white disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={step === steps.length - 1}
          className="px-4 py-2 bg-blue-500 rounded-md text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepperWithContent;





