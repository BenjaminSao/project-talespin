export default function Container({ children, className }) {
  return (
    <>
      <section className="section p-6 md:p-12">{children}</section>
    </>
  );
}
