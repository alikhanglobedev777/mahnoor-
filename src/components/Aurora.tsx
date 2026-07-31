export default function Aurora() {
  return (
    <div className="aurora">
      <div
        className="aurora-blob"
        style={{
          width: '50vw',
          height: '50vw',
          top: '-10%',
          left: '-10%',
          background: 'radial-gradient(circle, #ff9bb3, transparent 70%)',
          animationDelay: '0s',
        }}
      />
      <div
        className="aurora-blob"
        style={{
          width: '45vw',
          height: '45vw',
          top: '30%',
          right: '-10%',
          background: 'radial-gradient(circle, #b8a4d9, transparent 70%)',
          animationDelay: '5s',
        }}
      />
      <div
        className="aurora-blob"
        style={{
          width: '40vw',
          height: '40vw',
          bottom: '-10%',
          left: '20%',
          background: 'radial-gradient(circle, #e0a96d, transparent 70%)',
          animationDelay: '10s',
        }}
      />
      <div
        className="aurora-blob"
        style={{
          width: '35vw',
          height: '35vw',
          top: '50%',
          left: '30%',
          background: 'radial-gradient(circle, #e6d7f5, transparent 70%)',
          animationDelay: '7s',
        }}
      />
    </div>
  );
}
