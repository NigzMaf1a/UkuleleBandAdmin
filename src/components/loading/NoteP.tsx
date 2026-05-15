export default function LoadP({text}: {text: string | number}) {
  return (
    <div className="card p-4 shadow-sm">
      <p className="text-center text-muted">{text}</p>
    </div>
  );
}
