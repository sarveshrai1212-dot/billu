import React from "react";

const PayPalLogo = ({ style }: { style?: React.CSSProperties }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 14, height: 14, padding: 0, overflow: 'visible' }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/attached_assets/PayPal-Logo.wine.png" alt="PayPal Logo" style={{ height: 70, maxWidth: 'none', ...style }} />
  </div>
);

export default PayPalLogo;
