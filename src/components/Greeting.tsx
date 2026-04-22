export function Greeting({ firstName }: { firstName: string }) {
  return (
    <>
      Welcome,
      <br />
      <span className="italic text-[var(--accent)]">{firstName}.</span>
    </>
  );
}
