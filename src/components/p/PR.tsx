interface Props{
    text: string | number;
}

export default function PC({text}:Props) {
  return (
    <p className='fs-5 mb-4 text-end'>
        {text}
    </p>
  );
}