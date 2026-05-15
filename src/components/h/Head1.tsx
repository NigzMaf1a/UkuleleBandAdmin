
//Props interface
interface Head1Props{
    text: string | number;
}

export default function Head1({text}:Head1Props) {
  return (
    <h2 className="mb-2 text-center">
        {text}
    </h2>
  );
}