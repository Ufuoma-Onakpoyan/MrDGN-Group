/**
 * Full-screen rebrand notice. Shown when VITE_REBRAND_MODE is true.
 * No router, no app code — site is inaccessible.
 */
const REBRAND_MESSAGE =
  typeof import.meta.env.VITE_REBRAND_MESSAGE === 'string' &&
  import.meta.env.VITE_REBRAND_MESSAGE.trim() !== ''
    ? import.meta.env.VITE_REBRAND_MESSAGE.trim()
    : "We're rebranding. Please check back soon.";

const RebrandScreen = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        minHeight: '100dvh',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2147483647,
      }}
      role="status"
      aria-live="polite"
    >
      <p
        style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: 'clamp(1rem, 4vw, 1.5rem)',
          fontWeight: 400,
          textAlign: 'center',
          maxWidth: '90%',
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {REBRAND_MESSAGE}
      </p>
    </div>
  );
};

export default RebrandScreen;
