import React from 'react';

const TermsAndConditions = () => {


    const termsAndConditions = [
        {
          title: "Introduction",
          content: `
            Welcome to our carpooling and bike-sharing service. By accessing or using our service, you agree to be bound by these Terms and Conditions. Please read them carefully before using our service.
          `,
        },
        {
          title: "Services Provided",
          content: `
            We provide a platform for users to share rides and bikes. Users can book rides or bikes through our mobile application and website.
          `,
        },
        {
          title: "User Responsibilities",
          content: `
            Users are responsible for maintaining the confidentiality of their account information. You agree to notify us immediately of any unauthorized use of your account. 
          `,
        },
        {
          title: "Payment Terms",
          content: `
            All rides are charged based on the distance traveled. We charge a 0% commission on rides. Payments can be made via credit/debit cards and digital wallets.
          `,
        },
        {
          title: "Cancellation Policy",
          content: `
            Users can cancel their ride or bike booking through the app. Cancellation charges may apply based on the time of cancellation.
          `,
        },
        {
          title: "Safety Measures",
          content: `
            We prioritize safety by verifying drivers and implementing features such as real-time ride tracking and an emergency contact option.
          `,
        },
        {
          title: "Limitation of Liability",
          content: `
            Our liability is limited to the maximum extent permitted by law. We are not liable for any indirect, incidental, or consequential damages.
          `,
        },
        {
          title: "Governing Law",
          content: `
            These Terms and Conditions are governed by the laws of [Your Country/State]. Any disputes arising under these Terms will be subject to the exclusive jurisdiction of the courts of [Your Country/State].
          `,
        },
        {
          title: "Changes to Terms",
          content: `
            We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Your continued use of the service after changes constitutes acceptance of the new Terms.
          `,
        },
        {
          title: "Contact Information",
          content: `
            If you have any questions about these Terms and Conditions, please contact us at [Your Contact Email/Phone Number].
          `,
        },
      ];
      
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      {termsAndConditions.map((item, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
          <p className="text-gray-700">{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default TermsAndConditions;
