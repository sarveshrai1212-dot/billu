
// RazorpayLogo component for Razorpay branding
const RazorpayLogo = ({ style }: { style?: React.CSSProperties }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 14, height: 14, padding: 0, overflow: 'visible' }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/attached_assets/razorpay-icon.png" alt="Razorpay Logo" style={{ height: 100, maxWidth: 'none', display: 'inline', verticalAlign: 'middle', ...style }} />
  </div>
);

export default RazorpayLogo;
